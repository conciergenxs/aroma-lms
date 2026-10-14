import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { modules, getVisibleCategories } from "@/data/modules";
import { CategoryCard } from "@/components/CategoryCard";
import { LevelBanner } from "@/components/LevelBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useBrand } from "@/lib/brand-context";

export const Route = createFileRoute("/_authenticated/modules/")({
  component: AllModulesPage,
});

function AllModulesPage() {
  const { t } = useI18n();
  const { activeBrand } = useBrand();
  // Brand-level content moved out of the old Brand/Category toggle and into its own banner
  // + page, leaving the category grid as this page's content. Unscoped, like the tab it
  // replaces — see the matching note on Home.
  const brandLevelModules = modules.filter((m) => m.level === "brand");
  const categories = getVisibleCategories(activeBrand);

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <Link to="/home" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("backToHome")}
        </Link>

        {brandLevelModules.length > 0 && (
          <LevelBanner
            to="/knowledge/brand"
            title={`${t("aboutPrefix")} ${t("chipBrand")}`}
            count={brandLevelModules.length}
            image={brandLevelModules[0].image}
          />
        )}

        <h1 className="font-serif text-[31px] font-medium leading-none mt-6">
          {t("allCategories")}
        </h1>
        <p className="text-[15px] text-foreground/75 mt-3">
          {categories.length} {t("countCategories")}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
          {categories.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} />
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
