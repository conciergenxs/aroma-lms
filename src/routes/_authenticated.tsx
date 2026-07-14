import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { BrandProvider } from "@/lib/brand-context";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingAI } from "@/components/layout/FloatingAI";
import { useNavHistory, labelFromPath } from "@/lib/nav-history";

export const Route = createFileRoute("/_authenticated")({
  component: AuthLayout,
});

function AuthLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isChat = pathname.startsWith("/chat/");
  const setPrevious = useNavHistory((s) => s.setPrevious);
  const prevRef = useRef<string>(pathname);

  useEffect(() => {
    // when route changes, store previous (only if previous wasn't chat)
    const prev = prevRef.current;
    if (prev && !prev.startsWith("/chat/") && prev !== pathname) {
      setPrevious(prev, labelFromPath(prev));
    }
    prevRef.current = pathname;
  }, [pathname, setPrevious]);

  return (
    <BrandProvider>
    <div className="min-h-screen bg-cream">
      {!isChat && <TopHeader />}
      <main className="mobile-shell overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.8 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {!isChat && <FloatingAI />}
      {!isChat && <BottomNav />}
    </div>
    </BrandProvider>
  );
}
