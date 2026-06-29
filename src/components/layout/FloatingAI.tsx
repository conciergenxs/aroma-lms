import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import aiLogo from "@/assets/ai-logo-new.svg.asset.json";

export function FloatingAI() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // If we're inside a module page, link chat to that module session. Otherwise generic.
  const moduleMatch = pathname.match(/\/modules\/([^/]+)/);
  const target = moduleMatch ? moduleMatch[1] : "general";

  return (
    <div
      className="fixed left-1/2 z-40 w-full max-w-[390px] -translate-x-1/2 pointer-events-none"
      style={{ bottom: "var(--floating-ai-bottom)" }}
    >
      <div className="relative w-full">
        <Link
          to="/chat/$assistantId"
          params={{ assistantId: target }}
          aria-label="Chat with AI assistant"
          className="pointer-events-auto absolute right-5 block"
        >
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="block h-[58px] w-[58px] rounded-full overflow-hidden shadow-[0_8px_24px_rgba(113,0,20,0.35)] ring-2 ring-white/70"
          >
            <img src={aiLogo.url} alt="" className="h-full w-full object-cover" />
          </motion.span>
        </Link>
      </div>
    </div>
  );
}
