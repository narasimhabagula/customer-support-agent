import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  subtitle = "Memory-powered AI Customer Support",
  showSubtitle = true,
}: {
  className?: string;
  subtitle?: string;
  showSubtitle?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
        <Brain className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[15px] leading-tight font-semibold text-foreground">
          HelpMind AI
        </span>
        {showSubtitle ? (
          <span className="block truncate text-xs leading-tight text-muted-foreground">
            {subtitle}
          </span>
        ) : null}
      </span>
    </div>
  );
}
