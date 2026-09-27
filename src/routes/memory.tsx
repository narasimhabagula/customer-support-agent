import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/helpmind/PageShell";
import { MemoryCard } from "@/components/helpmind/MemoryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { memories } from "@/lib/demo-data";

export const Route = createFileRoute("/memory")({
  head: () => ({
    meta: [
      { title: "Customer Memory — HelpMind AI" },
      {
        name: "description",
        content:
          "Browse the facts, experiences and observations HelpMind remembers about each customer.",
      },
      { property: "og:title", content: "Customer Memory — HelpMind AI" },
      {
        property: "og:description",
        content: "Every memory HelpMind stores, with category, source and last used date.",
      },
    ],
  }),
  component: MemoryPage,
});

const tabs = ["All", "World Facts", "Experience", "Observations"] as const;

function MemoryPage() {
  return (
    <PageShell
      title="Customer Memory"
      description="Everything HelpMind remembers, with the source and the last time it was used."
    >
      <Tabs defaultValue="All">
        <TabsList className="flex-wrap">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => {
          const list = tab === "All" ? memories : memories.filter((m) => m.category === tab);
          return (
            <TabsContent key={tab} value={tab} className="mt-5">
              {list.length === 0 ? (
                <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                  No memories in this category yet.
                </p>
              ) : (
                <>
                  <div className="grid gap-3 md:grid-cols-2">
                    {list.map((memory) => (
                      <MemoryCard key={memory.id} memory={memory} />
                    ))}
                  </div>

                  <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full min-w-[640px] text-left text-sm">
                      <thead className="border-b border-border text-xs text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 font-medium">Memory</th>
                          <th className="px-4 py-3 font-medium">Category</th>
                          <th className="px-4 py-3 font-medium">Date</th>
                          <th className="px-4 py-3 font-medium">Source</th>
                          <th className="px-4 py-3 font-medium">Last Used</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((memory) => (
                          <tr key={memory.id} className="border-b border-border last:border-0">
                            <td className="max-w-[320px] px-4 py-3 text-foreground">
                              {memory.text}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{memory.category}</td>
                            <td className="px-4 py-3 text-muted-foreground">{memory.date}</td>
                            <td className="px-4 py-3 text-muted-foreground">{memory.source}</td>
                            <td className="px-4 py-3 text-muted-foreground">{memory.lastUsed}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </PageShell>
  );
}
