import { useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Brain, ChevronDown } from "lucide-react";
import { Header } from "@/components/helpmind/Header";
import { SupportChat } from "@/components/helpmind/SupportChat";
import { MemoryPanel } from "@/components/helpmind/MemoryPanel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { ChatMessageItem, MemoryItem } from "@/lib/demo-data";
import { useCustomerName, clearCustomerName } from "@/lib/use-customer-name";
import { resolveCustomer } from "@/lib/customers";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Customer Support Chat — HelpMind AI" },
      {
        name: "description",
        content:
          "Chat with HelpMind's AI support agent and see the memories it recalls for each response.",
      },
      { property: "og:title", content: "Customer Support Chat — HelpMind AI" },
      {
        property: "og:description",
        content: "AI support chat with a live memory panel showing the context behind each reply.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChatPage,
});

type Recalled = { text: string; type: string | null; date: string | null };

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const typeLabel: Record<string, MemoryItem["category"]> = {
  world: "World Facts",
  experience: "Experience",
  observation: "Observations",
};

function toMemoryItems(list: Recalled[]): MemoryItem[] {
  return list.map((m, i) => ({
    id: `r-${i}`,
    index: String(i + 1).padStart(2, "0"),
    title: typeLabel[m.type ?? ""] ?? "Memory",
    text: m.text,
    category: typeLabel[m.type ?? ""] ?? "Observations",
    date: m.date ? new Date(m.date).toLocaleDateString(undefined, { dateStyle: "medium" }) : "—",
    source: "HindSight",
    lastUsed: "Now",
  }));
}

function ChatPage() {
  const { name } = useCustomerName();
  const navigate = useNavigate();
  const customer = resolveCustomer(name);
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const conversationId = useRef<string>(newId());
  const abortRef = useRef<AbortController | null>(null);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const id = newId();
    const userMsg: ChatMessageItem = { id: `u-${id}`, role: "customer", text: trimmed };
    const aiId = `a-${id}`;
    const history = [...messages.filter((m) => !m.error && m.text), userMsg];
    setMessages((prev) => [...prev, userMsg, { id: aiId, role: "ai", text: "", pending: true }]);
    setNotice(null);
    setBusy(true);

    const update = (patch: Partial<ChatMessageItem>) =>
      setMessages((prev) => prev.map((m) => (m.id === aiId ? { ...m, ...patch } : m)));

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          customerName: name,
          conversationId: conversationId.current,
          messages: history.slice(-40).map((m) => ({ role: m.role, text: m.text ?? "" })),
        }),
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Something went wrong." }));
        update({ pending: false, error: true, text: err.error ?? "Something went wrong." });
        return;
      }
      let recalled: Recalled[] = [];
      try {
        recalled = JSON.parse(decodeURIComponent(res.headers.get("X-HelpMind-Memories") ?? "[]"));
      } catch {
        /* ignore */
      }
      setMemories(toMemoryItems(recalled));
      if (recalled.length) {
        update({
          memoryUsed: {
            label: "Memory used",
            detail: `${recalled.length} relevant memor${recalled.length === 1 ? "y" : "ies"}`,
          },
        });
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        update({ text: acc });
      }
      update({
        pending: false,
        ...(acc.trim() ? {} : { error: true, text: "No response was generated. Please try again." }),
      });
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      update({ pending: false, error: true, text: "Connection lost. Please try again." });
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const handleNewChat = () => {
    abortRef.current?.abort();
    conversationId.current = newId();
    setMessages([]);
    setMemories([]);
    setBusy(false);
    setNotice(
      `New conversation started for ${customer.name} (${customer.id}). Previous memories are still available to HelpMind.`,
    );
  };

  const handleSwitch = () => {
    abortRef.current?.abort();
    clearCustomerName();
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header customerName={name} onNewChat={handleNewChat} onSwitchCustomer={handleSwitch} />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-5 sm:px-6 lg:py-6">
        <div className="grid gap-5 lg:h-[calc(100vh-7.5rem)] lg:grid-cols-[68fr_32fr]">
          <div className="min-h-[70vh] lg:min-h-0">
            <SupportChat messages={messages} name={name} notice={notice} onSend={handleSend} />
          </div>

          <aside className="scroll-slim hidden lg:block lg:overflow-y-auto lg:pr-1">
            <MemoryPanel customerName={name} memories={memories} />
          </aside>

          <Collapsible className="lg:hidden">
            <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-xl border border-memory-border bg-card px-4 py-3 text-sm font-semibold text-foreground">
              <span className="flex items-center gap-2">
                <Brain className="size-4 text-memory" />
                AI Memory
              </span>
              <ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <MemoryPanel customerName={name} memories={memories} />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>
    </div>
  );
}
