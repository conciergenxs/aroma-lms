import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, dolceFragranceImage, modules } from "@/data/modules";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { motion } from "framer-motion";
import { useBrand } from "@/lib/brand-context";

export const Route = createFileRoute("/_authenticated/category/")({
  component: CategoryPage,
});

const DOLCE_CATEGORY_IDS = ["makeup", "skin-care", "fragrance"];

function CategoryPage() {
  const { t } = useI18n();
  const { activeBrand } = useBrand();
  // Dolce & Gabbana's category cards show the module count for their own brand,
  // read from the actual module data, rather than the global cross-brand count.
  const visibleCategories = activeBrand === "Dolce & Gabbana"
    ? categories
        .filter((c) => DOLCE_CATEGORY_IDS.includes(c.id))
        .map((c) => ({
          ...c,
          image: c.id === "fragrance" ? dolceFragranceImage : c.image,
          count: modules.filter((m) => m.categoryId === c.id && m.brand === "Dolce & Gabbana").length,
        }))
    : categories;
  return (
    <>
      <div className="px-[34px] pt-[28px]">
        <h1 className="font-serif text-[31px] font-medium leading-none">{t("pageCategory")}</h1>
        <p className="text-[15px] text-foreground/75 mt-4">{t("categorySubtitle")}</p>
        <div className="mt-[34px] grid grid-cols-2 gap-x-4 gap-y-4">
          {visibleCategories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/category/$categoryId"
                params={{ categoryId: c.id }}
                className="relative h-[256px] rounded-xl overflow-hidden block shadow-sm"
              >
                <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" width={768} height={1024} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-3 text-white">
                  <div className="font-serif text-[22px] font-medium leading-none">{c.name}</div>
                  <div className="text-[13px] opacity-90 mt-2">{c.count} {t("countModules")}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
