import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { resolveCustomer } from "@/lib/customers";

const Body = z.object({
  customerName: z.string().min(1).max(80),
  conversationId: z.string().min(1).max(80),
  messages: z
    .array(z.object({ role: z.enum(["customer", "ai"]), text: z.string().max(8000) }))
    .min(1)
    .max(60),
});

type Recalled = { text: string; type: string | null; date: string | null };

function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing server configuration: ${name}`);
  return v;
}

function hsUrl(path: string) {
  const base = env("HINDSIGHT_BASE_URL").replace(/\/+$/, "");
  return `${base}/v1/default/banks/${encodeURIComponent(env("HINDSIGHT_BANK_ID"))}${path}`;
}

async function recall(customerId: string, query: string): Promise<Recalled[]> {
  const res = await fetch(hsUrl("/memories/recall"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env("HINDSIGHT_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      budget: "low",
      max_tokens: 1500,
      tags: [`customer:${customerId}`],
      tags_match: "all_strict", // only this customer's memories, never untagged/shared ones
    }),
  });
  if (!res.ok) {
    console.error("HindSight recall failed", res.status, await res.text());
    return [];
  }
  const data = (await res.json()) as {
    results?: { text: string; type?: string | null; mentioned_at?: string | null; occurred_start?: string | null; tags?: string[] | null }[];
  };
  return (data.results ?? [])
    .filter((r) => r.tags?.includes(`customer:${customerId}`))
    .slice(0, 8)
    .map((r) => ({ text: r.text, type: r.type ?? null, date: r.mentioned_at ?? r.occurred_start ?? null }));
}

async function retain(customerId: string, customerName: string, conversationId: string, userText: string, aiText: string) {
  const res = await fetch(hsUrl("/memories"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env("HINDSIGHT_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      async: true,
      items: [
        {
          content: `Customer ${customerName} (${customerId}): ${userText}\nHelpMind support agent: ${aiText}`,
          context: `customer support conversation with ${customerName} (${customerId})`,
          document_id: `${customerId}:${conversationId}:${Date.now()}`,
          timestamp: new Date().toISOString(),
          tags: [`customer:${customerId}`],
          metadata: { customer_id: customerId, conversation_id: conversationId },
        },
      ],
    }),
  });
  if (!res.ok) console.error("HindSight retain failed", res.status, await res.text());
}

function systemPrompt(customerName: string, customerId: string, memories: Recalled[]) {
  const mem = memories.length
    ? memories.map((m, i) => `${i + 1}. ${m.text}${m.date ? ` (${m.date.slice(0, 10)})` : ""}`).join("\n")
    : "No relevant memories found for this customer.";
  return `You are HelpMind, a friendly, professional AI customer support agent.
Current customer: ${customerName} (customer ID ${customerId}). Address them by first name.

Relevant long-term memory about THIS customer (from previous conversations):
${mem}

Guidelines:
- Reply naturally and concisely like a helpful human support agent. Match the length to the message: a greeting like "Hi" gets a short, warm reply (e.g. "Hi ${customerName.split(" ")[0]}! What can I do for you today?") — no lists.
- Use the memory above when it is relevant (order numbers, past issues, preferences). Never invent order numbers or facts that aren't in the memory or conversation.
- If you need details to resolve an issue, ask for only the one or two most important ones.
- Use Markdown sparingly (short lists or bold only when it helps). No email-style signatures.
- Never mention other customers.`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: z.infer<typeof Body>;
        try {
          body = Body.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
        const customer = resolveCustomer(body.customerName);
        const last = body.messages[body.messages.length - 1]!;
        if (last.role !== "customer") return Response.json({ error: "Last message must be from the customer" }, { status: 400 });

        let memories: Recalled[] = [];
        try {
          memories = await recall(customer.id, last.text);
        } catch (e) {
          console.error("HindSight recall error", e);
        }

        let gemini: Response;
        try {
          gemini = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse",
            {
              method: "POST",
              headers: { "Content-Type": "application/json", "x-goog-api-key": env("GEMINI_API_KEY") },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt(customer.name, customer.id, memories) }] },
                contents: body.messages.map((m) => ({
                  role: m.role === "customer" ? "user" : "model",
                  parts: [{ text: m.text }],
                })),
                generationConfig: { temperature: 0.6, thinkingConfig: { thinkingBudget: 0 } },
              }),
            },
          );
        } catch (e) {
          console.error("Gemini request error", e);
          return Response.json({ error: "Could not reach the AI service. Please try again." }, { status: 502 });
        }
        if (!gemini.ok || !gemini.body) {
          const detail = await gemini.text();
          console.error("Gemini error", gemini.status, detail);
          const msg =
            gemini.status === 429
              ? "The AI service is busy right now. Please wait a moment and try again."
              : gemini.status === 400 || gemini.status === 403
                ? "The AI service rejected the request. Please check the Gemini API key."
                : "The AI service had a problem. Please try again.";
          return Response.json({ error: msg }, { status: gemini.status === 429 ? 429 : 502 });
        }

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const reader = gemini.body.getReader();
        let full = "";

        const stream = new ReadableStream<Uint8Array>({
          async start(controller) {
            let buf = "";
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buf += decoder.decode(value, { stream: true });
                const lines = buf.split("\n");
                buf = lines.pop() ?? "";
                for (const line of lines) {
                  if (!line.startsWith("data:")) continue;
                  const json = line.slice(5).trim();
                  if (!json) continue;
                  try {
                    const chunk = JSON.parse(json);
                    const text: string = (chunk.candidates?.[0]?.content?.parts ?? [])
                      .map((p: { text?: string }) => p.text ?? "")
                      .join("");
                    if (text) {
                      full += text;
                      controller.enqueue(encoder.encode(text));
                    }
                  } catch {
                    /* ignore partial */
                  }
                }
              }
              controller.close();
            } catch (e) {
              controller.error(e);
              return;
            }
            if (full.trim()) {
              retain(customer.id, customer.name, body.conversationId, last.text, full).catch((e) =>
                console.error("HindSight retain error", e),
              );
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
            "X-HelpMind-Customer": customer.id,
            "X-HelpMind-Memories": encodeURIComponent(JSON.stringify(memories)),
          },
        });
      },
    },
  },
});
