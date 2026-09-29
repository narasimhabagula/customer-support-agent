import ReactMarkdown from "react-markdown";
import { Brain, Sparkle } from "lucide-react";
import type { ChatMessageItem } from "@/lib/demo-data";

export function ChatMessage({ message }: { message: ChatMessageItem; name?: string }) {
  if (message.role === "customer") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground shadow-soft sm:max-w-[70%]">
          {message.text}
        </div>
      </div>
    );
  }

  const thinking = message.pending && !message.text;

  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
        <Sparkle className="size-4" />
      </span>
      <div className="min-w-0 flex-1 space-y-2">
        {message.memoryUsed ? (
          <div className="inline-flex flex-wrap items-center gap-2 rounded-lg border border-memory-border bg-memory-soft px-2.5 py-1.5">
            <Brain className="size-3.5 text-memory-foreground" />
            <span className="text-[11px] font-semibold text-memory-foreground">
              {message.memoryUsed.label}
            </span>
            <span className="text-[11px] text-memory-foreground/80">{message.memoryUsed.detail}</span>
          </div>
        ) : null}

        <div
          className={`inline-block max-w-full rounded-2xl rounded-tl-md border px-4 py-3 text-sm leading-relaxed shadow-soft ${
            message.error
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-border bg-card text-foreground"
          }`}
        >
          {thinking ? (
            <span className="flex items-center gap-1.5 py-1" aria-label="HelpMind is thinking">
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </span>
          ) : (
            <div className="space-y-2 [&_a]:text-primary [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
              <ReactMarkdown>{message.text ?? ""}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
