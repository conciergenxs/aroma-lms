import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { modules, getVisibleCategories } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { CategoryCard } from "@/components/CategoryCard";
import {
  LevelFilterChips,
  matchesLevel,
  type ModuleLevelFilter,
} from "@/components/LevelFilterChips";
import { PrevNextPagination } from "@/components/PrevNextPagination";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useBrand } from "@/lib/brand-context";

export const Route = createFileRoute("/_authenticated/modules/")({
  component: AllModulesPage,
});

const PAGE_SIZE = 10;

function AllModulesPage() {
  const { t } = useI18n();
  const { activeBrand } = useBrand();
  // Same 2-way Brand/Category chips as Home — no Product tab here either.
  const [level, setLevel] = useState<ModuleLevelFilter>("brand");
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever the active filter changes — otherwise switching
  // chips can strand the user on a page number that's out of range.
  useEffect(() => setPage(1), [level]);

  const gridItems = modules.filter((m) => matchesLevel(m, level));

  const total = gridItems.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const items = gridItems.slice(start, start + PAGE_SIZE);
  const countLabelKey = level === "brand" ? "countModulesBrand" : "countModulesCategory";

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <Link to="/home" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("backToHome")}
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">{t("allModules")}</h1>

        <div className="mt-5">
          <LevelFilterChips value={level} onChange={setLevel} includeBrand includeProduct={false} />
        </div>

        {level === "category" ? (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
            {getVisibleCategories(activeBrand).map((c, i) => (
              <CategoryCard key={c.id} category={c} index={i} />
            ))}
          </div>
        ) : (
          <>
            {total === 0 ? (
              <p className="text-[15px] text-foreground/75 mt-3">{t("noModulesForLevel")}</p>
            ) : (
              <p className="text-[15px] text-foreground/75 mt-3">
                {t("showing")} {start + 1}–{Math.min(start + PAGE_SIZE, total)} {t("of")} {total}{" "}
                {t(countLabelKey)}
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
          </>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
