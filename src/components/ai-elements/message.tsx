import * as React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export function Message({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex w-full", className)} {...props} />;
}

export function MessageContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm leading-relaxed", className)} {...props} />;
}

export function MessageResponse({ children, className }: { children: string; className?: string }) {
  return (
    <ReactMarkdown
      className={cn("prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-strong:font-semibold", className)}
      components={{
        p: ({ children }) => <p>{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}