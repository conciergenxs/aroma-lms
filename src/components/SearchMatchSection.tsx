import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ChevronRight } from "lucide-react";
import { categories, type Module } from "@/data/modules";

/**
 * The band between the filters and the results, for when the query names a category rather
 * than a single module — Shopee's matching-store strip, in the shape this app needs. It is
 * a shortcut on top of the results, never instead of them: the modules themselves still
 * list below, which is the fix for a search that used to answer with a folder.
 *
 * Categories only, no brands: an account belongs to one brand, so surfacing another brand's
 * card would offer a shelf this BA does not work.
 */
export function SearchMatchSection({ query, hits }: { query: string; hits: Module[] }) {
  const { t } = useI18n();
  const q = query.trim().toLowerCase();
  if (q.length < 2) return null;

  const category = categories.find((c) => c.name.toLowerCase().includes(q));
  if (!category) return null;

  const related = hits.filter((m) => m.categoryId === category.id);
  if (related.length === 0) return null;

  return (
    <section className="mt-2 rounded-xl border border-border bg-card p-3.5 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={category.image}
          alt=""
          className="h-11 w-11 shrink-0 rounded-lg object-cover"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <div className="font-serif text-[17px] font-medium leading-tight">{category.name}</div>
          <div className="mt-0.5 text-[12px] text-foreground/60">
            {related.length} {t("countModules")}
          </div>
        </div>
        <Link
          to="/category/$categoryId"
          params={{ categoryId: category.id }}
          className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-brand px-3.5 py-2 text-[12px] font-semibold text-brand-foreground transition-all hover:brightness-110 active:scale-[0.97]"
        >
          {t("viewBrand")}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="-mx-3.5 mt-3 flex gap-2.5 overflow-x-auto scrollbar-none px-3.5 pb-0.5">
        {related.slice(0, 8).map((m) => (
          <Link
            key={m.id}
            to="/modules/$moduleId"
            params={{ moduleId: m.id }}
            className="w-[112px] shrink-0 overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
          >
            <img src={m.image} alt="" className="h-[104px] w-full object-cover" loading="lazy" />
            <div className="px-2 py-2">
              <span className="line-clamp-2 block h-[34px] overflow-hidden text-[12px] font-medium leading-[17px]">
                {m.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
