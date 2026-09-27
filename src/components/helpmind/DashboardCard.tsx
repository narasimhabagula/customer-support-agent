import { cn } from "@/lib/utils";

export function DashboardCard({
  label,
  value,
  delta,
  tone = "primary",
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "primary" | "memory" | "success";
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-2 font-display text-2xl font-semibold",
          tone === "memory" && "text-memory-foreground",
          tone === "success" && "text-success",
          tone === "primary" && "text-foreground",
        )}
      >
        {value}
      </p>
      {delta ? <p className="mt-1 text-xs text-muted-foreground">{delta}</p> : null}
    </div>
  );
}
