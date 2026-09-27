import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { PageShell } from "@/components/helpmind/PageShell";
import { conversationHistory } from "@/lib/demo-data";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Conversation History — HelpMind AI" },
      {
        name: "description",
        content: "Past support conversations, their resolutions and the memories that helped.",
      },
      { property: "og:title", content: "Conversation History — HelpMind AI" },
      {
        property: "og:description",
        content: "Review resolved support conversations and the memory used in each one.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <PageShell
      title="Conversation History"
      description="Past support conversations and the memory that shaped each resolution."
    >
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Issue</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Resolution</th>
              <th className="px-4 py-3 font-medium">Memory Used</th>
            </tr>
          </thead>
          <tbody>
            {conversationHistory.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3.5 font-medium text-foreground">{row.customer}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{row.issue}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{row.date}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{row.resolution}</td>
                <td className="px-4 py-3.5">
                  {row.memoryUsed === "—" ? (
                    <span className="text-muted-foreground">—</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-memory-soft px-2 py-1 text-[11px] font-medium text-memory-foreground">
                      <Brain className="size-3" />
                      {row.memoryUsed}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
