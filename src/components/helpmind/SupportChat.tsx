import { useEffect, useRef } from "react";
import { MessageSquareText } from "lucide-react";
import type { ChatMessageItem } from "@/lib/demo-data";
import { suggestedPrompts } from "@/lib/demo-data";
import { ChatMessage } from "./ChatMessage";
import { ChatComposer } from "./ChatComposer";
import { SuggestedPrompt } from "./SuggestedPrompt";

export function SupportChat({
  messages,
  name,
  notice,
  onSend,
}: {
  messages: ChatMessageItem[];
  name: string;
  notice?: string | null;
  onSend: (text: string) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <div className="border-b border-border px-4 py-4 sm:px-6">
        <h1 className="font-display text-base font-semibold text-foreground">Customer Support</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Ask anything and HelpMind will use relevant previous interactions.
        </p>
      </div>

      <div className="scroll-slim min-h-0 flex-1 space-y-5 overflow-y-auto bg-surface px-4 py-5 sm:px-6">
        {notice ? (
          <div className="rounded-xl border border-memory-border bg-memory-soft px-4 py-3 text-center text-xs text-memory-foreground">
            {notice}
          </div>
        ) : null}

        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-10 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <MessageSquareText className="size-5" />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold text-foreground">
              How can I help you?
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Start a conversation with HelpMind. Your previous interactions can be remembered for
              future conversations.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {suggestedPrompts.map((prompt) => (
                <SuggestedPrompt key={prompt} label={prompt} onSelect={onSend} />
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} name={name} />
          ))
        )}
        <div ref={endRef} />
      </div>

      <ChatComposer onSend={onSend} />
    </section>
  );
}
