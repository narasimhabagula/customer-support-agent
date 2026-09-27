export function SuggestedPrompt({
  label,
  onSelect,
}: {
  label: string;
  onSelect: (label: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(label)}
      className="rounded-lg border border-border bg-card px-3 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary-soft hover:text-primary"
    >
      {label}
    </button>
  );
}
