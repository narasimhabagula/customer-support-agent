import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Brain, ChevronDown } from "lucide-react";
import { Header } from "@/components/helpmind/Header";
import { SupportChat } from "@/components/helpmind/SupportChat";
import { MemoryPanel } from "@/components/helpmind/MemoryPanel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { exampleConversation, type ChatMessageItem } from "@/lib/demo-data";
import { useCustomerName } from "@/lib/use-customer-name";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Customer Support Chat — HelpMind AI" },
      {
        name: "description",
        content:
          "Chat with HelpMind's AI support agent and see the memories it recalls for each response.",
      },
      { property: "og:title", content: "Customer Support Chat — HelpMind AI" },
      {
        property: "og:description",
        content: "AI support chat with a live memory panel showing the context behind each reply.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const { name } = useCustomerName();
  const [messages, setMessages] = useState<ChatMessageItem[]>(exampleConversation);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSend = (text: string) => {
    const id = `${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: `u-${id}`, role: "customer", text },
      {
        id: `a-${id}`,
        role: "ai",
        greeting: `Hi ${name.split(" ")[0]},`,
        intro:
          "Thanks for the details — I've noted this and matched it against your previous support history.",
        listTitle: "To move this forward, could you confirm:",
        list: ["Order date", "Shipping address", "Reference number or receipt"],
        outro: [
          "Once I have this information, I'll open a ticket with our logistics team and keep you updated.",
          "As you prefer to receive updates via email, I'll send you a status report within the next 24 hours.",
        ],
        signature: ["Best regards,", "HelpMind AI Customer Support"],
        memoryUsed: { label: "Memory used", detail: "Customer preference — Email updates" },
      },
    ]);
    setNotice(null);
  };

  const handleNewChat = () => {
    setMessages([]);
    setNotice(
      "New conversation started. Your previous memories are still available to HelpMind.",
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header customerName={name} onNewChat={handleNewChat} />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-5 sm:px-6 lg:py-6">
        <div className="grid gap-5 lg:h-[calc(100vh-7.5rem)] lg:grid-cols-[68fr_32fr]">
          <div className="min-h-[70vh] lg:min-h-0">
            <SupportChat messages={messages} name={name} notice={notice} onSend={handleSend} />
          </div>

          <aside className="scroll-slim hidden lg:block lg:overflow-y-auto lg:pr-1">
            <MemoryPanel customerName={name} />
          </aside>

          <Collapsible className="lg:hidden">
            <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-xl border border-memory-border bg-card px-4 py-3 text-sm font-semibold text-foreground">
              <span className="flex items-center gap-2">
                <Brain className="size-4 text-memory" />
                AI Memory
              </span>
              <ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <MemoryPanel customerName={name} />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>
    </div>
  );
}
