import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { modules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { LevelModuleCard } from "@/components/LevelModuleCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { z } from "zod";

const searchSchema = z.object({
  brand: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/modules/")({
  validateSearch: searchSchema,
  component: AllModulesPage,
});

const PAGE_SIZE = 10;

function AllModulesPage() {
  const { t } = useI18n();
  const { brand } = Route.useSearch();
  const [page, setPage] = useState(1);

  const filtered = brand
    ? modules.filter((m) => m.brand.toLowerCase() === brand.toLowerCase())
    : modules;

  // The brand-wide overview module (if any) is pulled out into its own hero section below,
  // rather than sitting in the paginated SKU grid.
  const brandModule = brand ? filtered.find((m) => m.level === "brand") : undefined;
  const gridItems = brandModule ? filtered.filter((m) => m.id !== brandModule.id) : filtered;

  const total = gridItems.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const items = gridItems.slice(start, start + PAGE_SIZE);

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <Link to="/home" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("backToHome")}
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">
          {brand ? brand : t("allModules")}
        </h1>

        {brandModule && (
          <div className="mt-5">
            <h2 className="text-[11px] font-bold tracking-widest text-tan uppercase">
              {t("aboutThisBrand")}
            </h2>
            <p className="text-[13px] text-foreground/60 mt-1">{t("aboutThisBrandHint")}</p>
            <div className="mt-2.5">
              <LevelModuleCard module={brandModule} kind="brand" />
            </div>
          </div>
        )}

        {total === 0 ? (
          <p className="text-[15px] text-foreground/75 mt-3">{t("noModulesForBrand")}</p>
        ) : (
          <p className="text-[15px] text-foreground/75 mt-3">
            {t("showing")} {start + 1}–{Math.min(start + PAGE_SIZE, total)} {t("of")} {total} {t("countModules").toLowerCase()}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          {items.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <ModuleCard module={m} />
            </motion.div>
          ))}
        </div>

        {pages > 1 && (
          <>
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-9 w-9 rounded-full border border-brand/40 text-brand flex items-center justify-center disabled:opacity-30 hover:bg-brand hover:text-white transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: pages }).map((_, i) => {
                const p = i + 1;
                const active = p === page;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-9 w-9 rounded-full text-sm font-semibold transition-colors ${
                      active ? "bg-brand text-white" : "border border-brand/30 text-brand hover:bg-brand/10"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="h-9 w-9 rounded-full border border-brand/40 text-brand flex items-center justify-center rotate-180 disabled:opacity-30 hover:bg-brand hover:text-white transition-colors"
                aria-label="Next page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-foreground/60">
              {t("page")} {page} {t("of")} {pages} · {total} {t("countModules").toLowerCase()} {t("total")}
            </p>
          </>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
