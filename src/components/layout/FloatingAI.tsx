import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import aiLogo from "@/assets/ai-logo-new.svg.asset.json";

export function FloatingAI() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
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
          <span className="relative block h-[49px] w-[49px]">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-brand/30"
              animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative block h-[49px] w-[49px] rounded-full overflow-hidden shadow-[0_12px_32px_rgba(113,0,20,0.45)] ring-[3px] ring-white"
            >
              <img src={aiLogo.url} alt="" className="h-full w-full object-cover" />
            </motion.span>
          </span>
        </Link>
      </div>
    </div>
  );
}
