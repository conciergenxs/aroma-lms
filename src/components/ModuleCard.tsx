import { Link } from "@tanstack/react-router";
import type { Module } from "@/data/modules";

export function ModuleCard({ module: m }: { module: Module }) {
  const pct = Math.round((m.completed / m.total) * 1000) / 10;
  return (
    <Link
      to="/modules/$moduleId"
      params={{ moduleId: m.id }}
      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="text-foreground/80">{m.completed}/{m.total} cards completed</span>
          <span className="font-semibold text-brand">{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-brand/15 overflow-hidden">
          <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="aspect-square mt-3 bg-cream/60">
        <img src={m.image} alt={m.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="px-3 py-3">
        <div className="text-[10px] tracking-widest text-foreground/60">{m.category}</div>
        <div className="font-serif text-[17px] leading-tight mt-1">{m.title}</div>
      </div>
    </Link>
  );
}
