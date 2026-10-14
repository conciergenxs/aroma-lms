import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCategory, getModulesByCategory, type Module } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { NoSearchResults } from "@/components/NoSearchResults";
import { matchesLevel } from "@/components/LevelFilterChips";
import { LevelBanner } from "@/components/LevelBanner";
import { PrevNextPagination } from "@/components/PrevNextPagination";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useBrand } from "@/lib/brand-context";

export const Route = createFileRoute("/_authenticated/category/$categoryId")({
  loader: ({ params }) => {
    const cat = getCategory(params.categoryId);
    if (!cat) throw notFound();
    return {
      category: cat,
      items: getModulesByCategory(cat.id),
    };
  },
  component: CategoryDetailPage,
  notFoundComponent: () => <div className="p-8 text-center">Kategori tidak ditemukan</div>,
  errorComponent: () => <div className="p-8 text-center">Terjadi kesalahan</div>,
});

const PAGE_SIZE = 10;

function CategoryDetailPage() {
  const { t } = useI18n();
  const { category, items: allItems } = Route.useLoaderData();
  const { activeBrand } = useBrand();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSearch("");
    setPage(1);
  }, [category.id]);

  useEffect(() => setPage(1), [search]);

  // Category-level content is brand-neutral by design — deliberately NOT run through the
  // D&G brand-scoping filter below (preserves the existing behavior exactly: it's pulled
  // before that filter and shown to every brand's BA). It no longer shares this page with
  // the product grid: it's what the banner above the title opens.
  const categoryLevelItems = allItems.filter((m) => matchesLevel(m, "category"));

  // D&G's Skin Care and Makeup modules are scoped to their own brand — untouched quirk,
  // now applied only ahead of the product-level filter (equivalent to the old
  // `.filter(m => m.id !== categoryModule?.id)` exclusion, since brand-level items never
  // carry a real categoryId and can't appear in allItems here).
  const brandScopedProductItems = (
    activeBrand === "Dolce & Gabbana" && (category.id === "skin-care" || category.id === "makeup")
      ? allItems.filter((m) => m.brand === "Dolce & Gabbana")
      : allItems
  ).filter((m) => matchesLevel(m, "product"));

  const baseItems = brandScopedProductItems;
  const q = search.trim().toLowerCase();
  const filtered = q ? baseItems.filter((m) => m.title.toLowerCase().includes(q)) : baseItems;

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);
  const countLabelKey = "countModulesProduct" as const;

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <Link
          to="/category"
          className="inline-flex items-center text-sm text-brand font-semibold mb-4"
        >
          <ChevronLeft className="h-4 w-4" /> {t("backToCategory")}
        </Link>
        {categoryLevelItems.length > 0 && (
          <LevelBanner
            to="/knowledge/category/$categoryId"
            params={{ categoryId: category.id }}
            title={`${t("aboutPrefix")} ${category.name} ${t("chipCategory")}`}
            count={categoryLevelItems.length}
            image={categoryLevelItems[0].image}
          />
        )}

        <h1 className="font-serif text-[31px] font-medium leading-tight mt-6">
          {category.name} {t("productsSuffix")}
        </h1>

        {total > 0 && (
          <p className="text-[13px] text-foreground/60 mt-3">
            {total} {t(countLabelKey)}
          </p>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="mt-5 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-tan" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-card rounded-lg border border-[#dcc9bd] pl-11 pr-4 py-3 text-[12px] shadow-sm placeholder:text-tan/70 focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </form>

        {baseItems.length === 0 ? (
          <div className="mt-10 text-center text-foreground/60 text-sm">
            {t("noModulesInCategory")}
          </div>
        ) : total === 0 ? (
          <NoSearchResults query={search.trim()} pool={baseItems} onSuggestionSelect={setSearch} />
        ) : (
          <>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {pageItems.map((m: Module, i: number) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ModuleCard module={m} />
                </motion.div>
              ))}
            </div>
            <PrevNextPagination
              page={page}
              totalPages={pages}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(pages, p + 1))}
            />
          </>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
