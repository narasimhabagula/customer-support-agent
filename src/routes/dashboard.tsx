import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { PageShell } from "@/components/helpmind/PageShell";
import { DashboardCard } from "@/components/helpmind/DashboardCard";
import { dashboardStats, memoryResolutions, recentActivity } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Support Dashboard — HelpMind AI" },
      {
        name: "description",
        content:
          "Overview of active conversations, customers helped and memory-assisted resolutions.",
      },
      { property: "og:title", content: "Support Dashboard — HelpMind AI" },
      {
        property: "og:description",
        content: "Track support volume and how often stored memory resolves customer issues.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <PageShell title="Dashboard" description="A quick read on support volume and memory impact.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <DashboardCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <h2 className="font-display text-sm font-semibold text-foreground">
            Recent Support Activity
          </h2>
          <ul className="mt-4 space-y-3">
            {recentActivity.map((item) => (
              <li
                key={item.customer + item.time}
                className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{item.customer}</p>
                  <p className="truncate text-xs text-muted-foreground">{item.issue}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span
                    className={
                      item.status === "Resolved"
                        ? "rounded-md bg-success-soft px-2 py-0.5 text-[11px] font-medium text-success"
                        : "rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-medium text-primary"
                    }
                  >
                    {item.status}
                  </span>
                  <p className="mt-1 text-[11px] text-muted-foreground">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-memory-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
            <Brain className="size-4 text-memory" />
            Memory-Powered Resolutions
          </h2>
          <ul className="mt-4 space-y-3">
            {memoryResolutions.map((item) => (
              <li
                key={item.customer}
                className="rounded-lg border border-border bg-surface p-3.5"
              >
                <p className="text-sm font-medium text-foreground">{item.customer}</p>
                <p className="mt-1 inline-flex rounded-md bg-memory-soft px-2 py-0.5 text-[11px] font-medium text-memory-foreground">
                  {item.memory}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{item.outcome}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
