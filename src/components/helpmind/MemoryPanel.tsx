import { Brain } from "lucide-react";
import type { MemoryItem } from "@/lib/demo-data";
import { MemoryCard } from "./MemoryCard";
import { MemoryFlow } from "./MemoryFlow";
import { CustomerProfile } from "./CustomerProfile";

export function MemoryPanel({
  customerName,
  memories = [],
}: {
  customerName: string;
  memories?: MemoryItem[];
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-xl border border-memory-border bg-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <Brain className="size-4 text-memory" />
              AI Memory
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Memories recalled for the latest reply
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-medium text-success">
            <span className="size-1.5 rounded-full bg-success" />
            Memory Active
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {memories.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-4 text-center text-xs text-muted-foreground">
            No memories recalled yet. Send a message and relevant memories will appear here.
          </p>
        ) : (
          memories.map((memory) => <MemoryCard key={memory.id} memory={memory} />)
        )}
      </div>

      <MemoryFlow />
      <CustomerProfile name={customerName} />
    </div>
  );
}
