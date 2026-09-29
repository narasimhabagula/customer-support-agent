import { resolveCustomer } from "@/lib/customers";
import { Mail, MapPin } from "lucide-react";
import { customer } from "@/lib/demo-data";

export function CustomerProfile({ name = customer.name }: { name?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft font-display text-sm font-semibold text-primary">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{resolveCustomer(name).id}</p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <dt className="sr-only">Location</dt>
          <dd>{customer.location}</dd>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="size-3.5 shrink-0" />
          <dt className="sr-only">Preferred communication</dt>
          <dd>Prefers {customer.preferredChannel} updates</dd>
        </div>
      </dl>

      <div className="mt-4">
        <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          Recent issues
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {customer.recentIssues.map((issue) => (
            <span
              key={issue}
              className="rounded-md border border-border bg-secondary px-2 py-1 text-[11px] text-secondary-foreground"
            >
              {issue}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
