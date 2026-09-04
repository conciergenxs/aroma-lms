import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import type { Module } from "@/data/modules";

// Featured, horizontal variant of ModuleCard for brand-level / category-level "overview"
// modules — visually distinct (tinted, horizontal) so it reads as featured content sitting
// above the regular SKU grid, without introducing a new visual language: it reuses the same
// bg-brand / rose-line progress bar / font-serif title / rounded-lg / shadow-sm tokens already
// used by ModuleCard.
export function LevelModuleCard({ module: m, kind }: { module: Module; kind: "category" | "brand" }) {
  const { t } = useI18n();
  const pct = Math.round((m.completed / m.total) * 1000) / 10;
  return (
    <Link
      to="/modules/$moduleId"
      params={{ moduleId: m.id }}
      className="flex items-center gap-3 bg-brand/5 border border-brand/25 rounded-lg p-3 shadow-sm hover:shadow-md hover:border-brand/40 transition-all"
    >
      <div className="h-[84px] w-[84px] shrink-0 rounded-md overflow-hidden bg-soft">
        <img src={m.image} alt={m.title} className="w-full h-full object-cover" loading="lazy" width={300} height={300} />
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-block text-[10px] font-bold tracking-widest text-brand">
          {kind === "category" ? t("categoryModuleBadge") : t("brandModuleBadge")}
        </span>
        <div className="font-serif text-[16px] font-medium leading-[1.15] mt-1 line-clamp-2">{m.title}</div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-rose-line overflow-hidden">
            <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[11px] font-semibold text-brand shrink-0">{pct}%</span>
        </div>
      </div>
    </Link>
  );
}
