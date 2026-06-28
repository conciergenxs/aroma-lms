import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function FloatingAI() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Find a module context from URL if present, else default
  const moduleMatch = pathname.match(/\/modules\/([^/]+)/);
  const target = moduleMatch ? moduleMatch[1] : "real-flawless-foundation";

  return (
    <Link
      to="/chat/$assistantId"
      params={{ assistantId: target }}
      aria-label="Chat with AI assistant"
      className="fixed left-1/2 z-40 -translate-x-1/2 pointer-events-none"
      style={{ bottom: "var(--floating-ai-bottom)" }}
    >
      <div className="relative w-full max-w-md mx-auto">
        <span
          className="pointer-events-auto absolute right-4 h-14 w-14 rounded-full bg-brand text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Sparkles className="h-6 w-6" fill="currentColor" />
        </span>
      </div>
    </Link>
  );
}
