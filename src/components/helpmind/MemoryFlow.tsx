import { ArrowDown } from "lucide-react";

const steps = ["Customer message", "Recall relevant memories", "Personalized AI response"];

export function MemoryFlow() {
  return (
    <div className="rounded-xl border border-memory-border bg-memory-soft/60 p-4">
      <p className="text-[11px] font-semibold tracking-wide text-memory-foreground uppercase">
        How it works
      </p>
      <ol className="mt-3 space-y-1.5">
        {steps.map((step, i) => (
          <li key={step}>
            <div className="rounded-lg bg-card px-3 py-2 text-xs font-medium text-foreground">
              {step}
            </div>
            {i < steps.length - 1 ? (
              <div className="flex justify-center py-1 text-memory">
                <ArrowDown className="size-3.5" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
