import { useI18n } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { modules, getVisibleCategories } from "@/data/modules";
import { CategoryCard } from "@/components/CategoryCard";
import { LevelBanner } from "@/components/LevelBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useBrand } from "@/lib/brand-context";

export const Route = createFileRoute("/_authenticated/category/")({
  component: CategoryPage,
});

function CategoryPage() {
  const { t } = useI18n();
  const { activeBrand } = useBrand();
  const visibleCategories = getVisibleCategories(activeBrand);
  // The level above the categories this page lists. Unscoped by brand, like the Brand tab
  // it originally replaced — the default brand has no brand-level module of its own.
  const brandLevelModules = modules.filter((m) => m.level === "brand");
  return (
    <>
      <div className="px-[14px] pt-[28px]">
        {brandLevelModules.length > 0 && (
          <LevelBanner
            to="/knowledge/brand"
            title={`${t("aboutPrefix")} ${t("chipBrand")}`}
            count={brandLevelModules.length}
            image={brandLevelModules[0].image}
          />
        )}

        <h1 className="font-serif text-[31px] font-medium leading-none mt-6">
          {t("pageCategory")}
        </h1>
        <p className="text-[15px] text-foreground/75 mt-4">{t("categorySubtitle")}</p>
        <div className="mt-[34px] grid grid-cols-2 gap-x-4 gap-y-4">
          {visibleCategories.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} />
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
