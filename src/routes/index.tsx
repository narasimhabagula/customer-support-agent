import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storeCustomerName } from "@/lib/use-customer-name";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HelpMind AI — Support that remembers" },
      {
        name: "description",
        content:
          "HelpMind AI is memory-powered customer support that remembers previous interactions and personalizes every reply.",
      },
      { property: "og:title", content: "HelpMind AI — Support that remembers" },
      {
        property: "og:description",
        content:
          "Memory-powered AI customer support: recall past interactions and resolve issues faster.",
      },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const start = () => {
    storeCustomerName(name.trim() || "Priya Sharma");
    navigate({ to: "/chat" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-7 shadow-lift sm:p-9">
          <div className="flex flex-col items-center text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
              <Brain className="size-6" />
            </span>
            <h1 className="mt-5 font-display text-2xl font-semibold text-foreground">
              HelpMind AI
            </h1>
            <p className="mt-1.5 text-sm font-medium text-memory-foreground">
              Memory-powered AI Customer Support
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              HelpMind remembers your previous support interactions and uses that context to provide
              more personalized help.
            </p>
          </div>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              start();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                Enter your name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="h-11"
              />
            </div>
            <Button type="submit" className="h-11 w-full gap-2">
              Start Chat
              <ArrowRight className="size-4" />
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Your conversation is associated with your customer profile.
          </p>
        </div>
      </div>
    </div>
  );
}
