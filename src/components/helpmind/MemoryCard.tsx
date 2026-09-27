import { CalendarDays, FileText } from "lucide-react";
import type { MemoryItem } from "@/lib/demo-data";

export function MemoryCard({ memory }: { memory: MemoryItem }) {
  return (
    <article className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-memory-border">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-memory-soft font-display text-[11px] font-semibold text-memory-foreground">
          {memory.index}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-foreground">{memory.title}</h4>
            <span className="rounded-md bg-memory-soft px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-memory-foreground uppercase">
              {memory.category}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{memory.text}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3" />
              {memory.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <FileText className="size-3" />
              {memory.source}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
