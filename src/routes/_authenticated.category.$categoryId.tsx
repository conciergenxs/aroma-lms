import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCategory, getModulesByCategory, type Module } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import {
  LevelFilterChips,
  DEFAULT_LEVEL,
  type ModuleLevelFilter,
} from "@/components/LevelFilterChips";
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

function CategoryDetailPage() {
  const { t } = useI18n();
  const { category, items: allItems } = Route.useLoaderData();
  const { activeBrand } = useBrand();
  const [chip, setChip] = useState<ModuleLevelFilter>(DEFAULT_LEVEL);
  useEffect(() => setChip(DEFAULT_LEVEL), [category.id]);
  // The category-wide overview module (if any) is pulled from allItems before the D&G brand
  // filter below, and rendered unconditionally — it's brand-neutral content that belongs to
  // every brand's BA, even when the page is otherwise scoped to a single brand.
  const categoryModule = allItems.find((m) => m.level === "category");
  // Dolce & Gabbana's Skin Care and Makeup modules are scoped to their own brand so this
  // new content doesn't leak into other brands' view of these categories.
  // Every other brand/category combination keeps its existing cross-brand listing.
  const items = (
    activeBrand === "Dolce & Gabbana" && (category.id === "skin-care" || category.id === "makeup")
      ? allItems.filter((m) => m.brand === "Dolce & Gabbana")
      : allItems
  ).filter((m: Module) => m.id !== categoryModule?.id);

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <Link
          to="/category"
          className="inline-flex items-center text-sm text-brand font-semibold mb-4"
        >
          <ChevronLeft className="h-4 w-4" /> {t("backToCategory")}
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">{category.name}</h1>

        <div className="mt-5">
          <LevelFilterChips value={chip} onChange={setChip} includeBrand={false} />
        </div>

        {chip === "category" ? (
          categoryModule ? (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <ModuleCard module={categoryModule} />
            </div>
          ) : (
            <div className="mt-10 text-center text-foreground/60 text-sm">
              {t("noModulesForLevel")}
            </div>
          )
        ) : (
          <>
            <p className="text-[15px] text-foreground/75 mt-6">
              {items.length} {t("modulesInCategory")}
            </p>

            {items.length === 0 ? (
              <div className="mt-10 text-center text-foreground/60 text-sm">
                {t("noModulesInCategory")}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-3">
                {items.map((m: Module, i: number) => (
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
            )}
          </>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
