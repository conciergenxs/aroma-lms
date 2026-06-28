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
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-3 pb-3 pointer-events-none"
      aria-label="Primary"
    >
      <div className="pointer-events-auto bg-ink text-white/80 rounded-2xl shadow-2xl px-2 py-3 flex items-center justify-around">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium transition-colors ${
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
