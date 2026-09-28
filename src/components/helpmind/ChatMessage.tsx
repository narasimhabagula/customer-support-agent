import { Brain, Sparkle } from "lucide-react";
import type { ChatMessageItem } from "@/lib/demo-data";

export function ChatMessage({ message, name }: { message: ChatMessageItem; name: string }) {
  if (message.role === "customer") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground shadow-soft sm:max-w-[70%]">
          {message.text}
        </div>
      </div>
    );
  }

  const firstName = name.split(" ")[0] ?? name;
  const greeting = message.greeting?.replace("Priya", firstName);

  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
        <Sparkle className="size-4" />
      </span>
      <div className="min-w-0 flex-1 space-y-3">
        {message.memoryUsed ? (
          <div className="inline-flex flex-wrap items-center gap-2 rounded-lg border border-memory-border bg-memory-soft px-2.5 py-1.5">
            <Brain className="size-3.5 text-memory-foreground" />
            <span className="text-[11px] font-semibold text-memory-foreground">
              {message.memoryUsed.label}
            </span>
            <span className="text-[11px] text-memory-foreground/80">
              {message.memoryUsed.detail}
            </span>
          </div>
        ) : null}

        <div className="rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3.5 text-sm leading-relaxed text-foreground shadow-soft">
          {message.text ? <p>{message.text}</p> : null}
          {greeting ? <p className="font-medium">{greeting}</p> : null}
          {message.intro ? <p className="mt-2 text-muted-foreground">{message.intro}</p> : null}
          {message.list ? (
            <div className="mt-3">
              {message.listTitle ? (
                <p className="text-[13px] font-medium text-foreground">{message.listTitle}</p>
              ) : null}
              <ol className="mt-2 space-y-1.5">
                {message.list.map((item, i) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="flex size-5 items-center justify-center rounded-md bg-secondary text-[11px] font-semibold text-secondary-foreground">
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          {message.outro?.map((line) => (
            <p key={line} className="mt-3 text-muted-foreground">
              {line}
            </p>
          ))}
          {message.signature ? (
            <div className="mt-4 border-t border-border pt-3 text-[13px] text-muted-foreground">
              {message.signature.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
