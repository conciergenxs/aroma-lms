import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, History, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/category", label: "Category", icon: LayoutGrid },
  { to: "/my-learning", label: "My Learning", icon: History },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[390px] pointer-events-none"
      aria-label="Primary"
    >
      <div className="pointer-events-auto bg-ink text-white/90 shadow-[0_-8px_24px_rgba(0,0,0,0.24)] px-5 pt-4 pb-3 flex items-center justify-around">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={`flex w-[72px] flex-col items-center gap-1 px-1 py-0.5 text-[12px] font-medium transition-colors ${
                active ? "text-gold" : "text-white/70 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
