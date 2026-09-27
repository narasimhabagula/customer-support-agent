import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/chat", label: "Support Chat" },
  { to: "/memory", label: "Memory" },
  { to: "/history", label: "History" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Header({
  customerName,
  onNewChat,
}: {
  customerName?: string;
  onNewChat?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[270px] p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="border-b border-border p-4">
              <Logo />
            </div>
            <nav className="flex flex-col gap-1 p-3">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-primary-soft text-primary" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/chat" className="shrink-0">
          <Logo subtitle="AI Customer Support Agent" />
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-primary-soft text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {customerName ? (
            <span className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground sm:inline-flex">
              Customer:{" "}
              <span className="text-foreground">{customerName}</span>
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1.5 text-xs font-medium text-success">
            <span className={cn("size-1.5 rounded-full bg-success")} />
            AI Online
          </span>
          {onNewChat ? (
            <Button size="sm" onClick={onNewChat} className="gap-1.5">
              <Plus className="size-4" />
              <span className="hidden sm:inline">New Chat</span>
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
