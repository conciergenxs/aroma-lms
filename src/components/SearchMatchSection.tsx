import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ChevronRight } from "lucide-react";
import { brands, categories, getBrandLevelModule, type Module } from "@/data/modules";

/**
 * The band between the filters and the results, for when the query names a brand or a
 * category rather than a module. Shopee puts the matching store here. It is a shortcut
 * on top of the results, never instead of them — the modules themselves still list below,
 * which is the fix for a search that used to answer with a folder.
 */
export function SearchMatchSection({ query, hits }: { query: string; hits: Module[] }) {
  const { t } = useI18n();
  const q = query.trim().toLowerCase();
  if (q.length < 2) return null;

  const brand = brands.find((b) => b.name.toLowerCase().includes(q));
  const category = brand ? null : categories.find((c) => c.name.toLowerCase().includes(q));
  if (!brand && !category) return null;

  const overview = brand ? getBrandLevelModule(brand.name) : null;
  const related = brand
    ? hits.filter((m) => m.brand === brand.name)
    : hits.filter((m) => m.categoryId === category!.id);
  if (related.length === 0) return null;

  return (
    <section className="mt-5 rounded-xl border border-border bg-card p-3.5 shadow-sm">
      <div className="flex items-center gap-3">
        {brand ? (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-ink">
            <img src={brand.logo} alt="" className="max-h-6 w-auto max-w-[80%] object-contain" />
          </div>
        ) : (
          <img
            src={category!.image}
            alt=""
            className="h-11 w-11 shrink-0 rounded-lg object-cover"
            loading="lazy"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="font-serif text-[17px] font-medium leading-tight">
            {brand ? brand.name : category!.name}
          </div>
          <div className="mt-0.5 text-[12px] text-foreground/60">
            {related.length} {t("countModules")}
          </div>
        </div>
        <Link
          to={brand ? "/modules/$moduleId" : "/category/$categoryId"}
          params={
            brand ? { moduleId: overview?.id ?? related[0].id } : { categoryId: category!.id }
          }
          className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-brand px-3.5 py-2 text-[12px] font-semibold text-brand-foreground transition-all hover:brightness-110 active:scale-[0.97]"
        >
          {t("viewBrand")}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-3 flex gap-2.5 overflow-x-auto scrollbar-none pb-0.5">
        {related.slice(0, 8).map((m) => (
          <Link
            key={m.id}
            to="/modules/$moduleId"
            params={{ moduleId: m.id }}
            className="w-[108px] shrink-0"
          >
            <img
              src={m.image}
              alt=""
              className="h-[108px] w-full rounded-lg object-cover transition-transform duration-300 hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="mt-1.5 line-clamp-2 text-[12px] font-medium leading-snug">
              {m.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
