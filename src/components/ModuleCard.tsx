import { Link } from "@tanstack/react-router";
import type { Module } from "@/data/modules";

export function ModuleCard({ module: m }: { module: Module }) {
  const pct = Math.round((m.completed / m.total) * 1000) / 10;
  return (
    <Link
      to="/modules/$moduleId"
      params={{ moduleId: m.id }}
      className="block bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="px-2.5 pt-3">
        <div className="flex items-center justify-between text-[11px] mb-1.5 font-semibold">
          <span className="text-brand">{m.completed}/{m.total} cards completed</span>
          <span className="font-semibold text-brand">{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-rose-line overflow-hidden">
          <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="aspect-square m-2.5 mb-0 rounded-md bg-soft overflow-hidden">
        <img src={m.image} alt={m.title} className="w-full h-full object-cover" loading="lazy" width={1024} height={1024} />
      </div>
      <div className="px-2.5 py-3 min-h-[73px]">
        <div className="text-[10px] tracking-wider text-tan font-medium">{m.category}</div>
        <div className="font-serif text-[18px] leading-[1.05] mt-1 line-clamp-2">{m.title}</div>
      </div>
    </Link>
  );
}
