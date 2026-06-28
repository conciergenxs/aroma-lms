import * as React from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Conversation({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative min-h-0 flex-1 overflow-hidden", className)} {...props} />;
}

export function ConversationContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-full overflow-y-auto", className)} {...props} />;
}

export function ConversationScrollButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label="Scroll to latest message"
      className={cn("absolute bottom-3 left-1/2 hidden h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm", className)}
      {...props}
    >
      <ArrowDown className="h-4 w-4" />
    </button>
  );
}