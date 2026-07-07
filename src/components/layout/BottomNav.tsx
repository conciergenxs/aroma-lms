import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, History, User } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();

  const items = [
    { to: "/home", label: t("navHome"), icon: Home },
    { to: "/category", label: t("navCategory"), icon: LayoutGrid },
    { to: "/my-learning", label: t("navMyLearning"), icon: History },
    { to: "/profile", label: t("navProfile"), icon: User },
  ] as const;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 w-full pointer-events-none"
      aria-label="Primary"
    >
      <div className="pointer-events-auto bg-ink text-white/90 shadow-[0_-8px_24px_rgba(0,0,0,0.24)] border-t-2 border-[color:var(--gold-soft)]/70 px-3 pt-4 pb-[18px] flex items-center justify-around">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={`relative flex w-[80px] flex-col items-center gap-1 px-1 py-0.5 text-[11px] font-medium whitespace-nowrap transition-colors ${
                active ? "text-gold" : "text-white/70 hover:text-white"
              }`}
            >
              <motion.div whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 400 }}>
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
              </motion.div>
              <span className="leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
