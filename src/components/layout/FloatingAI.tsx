import { Link, useRouterState } from "@tanstack/react-router";
import aiLogo from "@/assets/ai-logo.svg.asset.json";

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
      className="fixed left-1/2 z-40 w-full max-w-[390px] -translate-x-1/2 pointer-events-none"
      style={{ bottom: "var(--floating-ai-bottom)" }}
    >
      <div className="relative w-full">
        <span
          className="pointer-events-auto absolute right-7 h-[56px] w-[56px] rounded-full bg-brand text-brand-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <img src={aiLogo.url} alt="" className="h-7 w-7 brightness-0 invert" />
        </span>
      </div>
    </Link>
  );
}
