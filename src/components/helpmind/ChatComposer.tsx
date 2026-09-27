import { useState } from "react";
import { Mic, Paperclip, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ChatComposer({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
  };

  return (
    <div className="border-t border-border bg-card p-3 sm:p-4">
      <div className="rounded-xl border border-border bg-surface p-2 transition-colors focus-within:border-primary/40">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Describe your issue..."
          rows={2}
          className="min-h-[52px] resize-none border-0 bg-transparent p-2 text-sm shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center justify-between gap-2 px-1 pt-1">
          <div className="flex items-center gap-1">
            <Button type="button" variant="ghost" size="icon" aria-label="Attach file">
              <Paperclip className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" aria-label="Voice message">
              <Mic className="size-4" />
            </Button>
          </div>
          <Button type="button" onClick={submit} disabled={!value.trim()} className="gap-1.5">
            Send
            <SendHorizonal className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
