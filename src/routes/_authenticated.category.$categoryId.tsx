import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { getCategory, getModulesByCategory, type Module } from "@/data/modules";
import { getGeneralKnowledgeByCategory } from "@/data/general-knowledge";
import { ModuleCard } from "@/components/ModuleCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useBrand } from "@/lib/brand-context";

const searchSchema = z.object({
  tab: z.enum(["skus", "general"]).optional(),
});

export const Route = createFileRoute("/_authenticated/category/$categoryId")({
  validateSearch: searchSchema,
  loader: ({ params }) => {
    const cat = getCategory(params.categoryId);
    if (!cat) throw notFound();
    return {
      category: cat,
      items: getModulesByCategory(cat.id),
      knowledge: getGeneralKnowledgeByCategory(cat.id),
    };
  },
  component: CategoryDetailPage,
  notFoundComponent: () => <div className="p-8 text-center">Kategori tidak ditemukan</div>,
  errorComponent: () => <div className="p-8 text-center">Terjadi kesalahan</div>,
});

function CategoryDetailPage() {
  const { t } = useI18n();
  const { category, items: allItems, knowledge } = Route.useLoaderData();
  const { tab } = Route.useSearch();
  const navigate = useNavigate();
  const { activeBrand } = useBrand();
  const activeTab = tab ?? "skus";
  // Dolce & Gabbana's Skin Care and Makeup modules are scoped to their own brand so this
  // new content doesn't leak into other brands' view of these categories.
  // Every other brand/category combination keeps its existing cross-brand listing.
  const items =
    activeBrand === "Dolce & Gabbana" && (category.id === "skin-care" || category.id === "makeup")
      ? allItems.filter((m) => m.brand === "Dolce & Gabbana")
      : allItems;

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

        <div className="mt-5 flex gap-2">
          {(["skus", "general"] as const).map((key) => (
            <button
              key={key}
              onClick={() => navigate({ to: ".", search: { tab: key } })}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                activeTab === key
                  ? "bg-brand text-white"
                  : "bg-card border border-border text-foreground/70 hover:border-brand/40"
              }`}
            >
              {key === "skus" ? t("skusTab") : t("generalKnowledgeTab")}
            </button>
          ))}
        </div>

        {activeTab === "skus" ? (
          <>
            <p className="text-[15px] text-foreground/75 mt-4">
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
        ) : (
          <>
            <p className="text-[15px] text-foreground/75 mt-4">
              {knowledge.length} {t("knowledgeInCategory")}
            </p>

            {knowledge.length === 0 ? (
              <div className="mt-10 text-center text-foreground/60 text-sm">
                {t("noKnowledgeInCategory")}
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {knowledge.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-xl border border-border p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                        <BookOpen className="h-4 w-4 text-brand" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-serif text-[16px] font-medium leading-tight">
                          {item.title}
                        </div>
                        <p className="text-[13px] text-foreground/70 mt-1.5 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
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
