import { useI18n } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { getVisibleCategories } from "@/data/modules";
import { CategoryCard } from "@/components/CategoryCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useBrand } from "@/lib/brand-context";

export const Route = createFileRoute("/_authenticated/category/")({
  component: CategoryPage,
});

function CategoryPage() {
  const { t } = useI18n();
  const { activeBrand } = useBrand();
  const visibleCategories = getVisibleCategories(activeBrand);
  return (
    <>
      <div className="px-[34px] pt-[28px]">
        <h1 className="font-serif text-[31px] font-medium leading-none">{t("pageCategory")}</h1>
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
