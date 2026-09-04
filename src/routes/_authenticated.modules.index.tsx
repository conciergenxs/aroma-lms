import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { modules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import {
  LevelFilterChips,
  DEFAULT_LEVEL,
  matchesLevel,
  type ModuleLevelFilter,
} from "@/components/LevelFilterChips";
import { PrevNextPagination } from "@/components/PrevNextPagination";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { z } from "zod";

const searchSchema = z.object({
  brand: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/modules/")({
  validateSearch: searchSchema,
  component: AllModulesPage,
});

const PAGE_SIZE = 4;

function AllModulesPage() {
  const { t } = useI18n();
  const { brand } = Route.useSearch();
  const [level, setLevel] = useState<ModuleLevelFilter>(DEFAULT_LEVEL);
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever the active filter changes — otherwise switching
  // chips (or navigating to a different ?brand=) can strand the user on a page
  // number that's out of range for the new, smaller result set.
  useEffect(() => setPage(1), [level, brand]);

  // Brand scope composes with the level filter for Product and Brand chips
  // (each brand's own SKUs / its own single brand-level module). Category-level
  // modules are brand-agnostic by design, so a ?brand= scope is deliberately
  // ignored for the Category chip — every category-level module's brand field
  // is "PT Aroma Abadi", which never equals a real brand name, and the Category
  // chip would otherwise show a permanent, incorrect empty state on any
  // brand-scoped URL.
  const gridItems = modules.filter((m) => {
    if (!matchesLevel(m, level)) return false;
    if (!brand || level === "category") return true;
    return m.brand.toLowerCase() === brand.toLowerCase();
  });

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

        <div className="mt-5">
          <LevelFilterChips value={level} onChange={setLevel} includeBrand />
        </div>

        {total === 0 ? (
          <p className="text-[15px] text-foreground/75 mt-3">{t("noModulesForLevel")}</p>
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

        <PrevNextPagination
          page={page}
          totalPages={pages}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(pages, p + 1))}
        />
      </div>
      <SiteFooter />
    </>
  );
}
