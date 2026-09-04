import { useI18n } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/my-learning")({
  component: MyLearningPage,
});

const PAGE_SIZE = 4;
const LEVELS = ["brand", "category", "product"] as const;

function MyLearningPage() {
  const { t } = useI18n();
  const [level, setLevel] = useState<ModuleLevelFilter>(DEFAULT_LEVEL);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [level]);

  // "Started or completed" — the criterion the page's own subtitle already
  // promises. m.completed > 0 covers both in-progress and fully completed
  // modules; a fresh module always has completed === 0.
  const started = modules.filter((m) => m.completed > 0);

  const filtered = started.filter((m) => matchesLevel(m, level));
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  const levelLabel = (lvl: ModuleLevelFilter) =>
    lvl === "brand" ? t("chipBrand") : lvl === "category" ? t("chipCategory") : t("chipProduct");

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <h1 className="font-serif text-[31px] font-medium leading-none">{t("pageMyLearning")}</h1>
        <p className="text-[15px] text-foreground/75 mt-4">{t("myLearningSubtitle")}</p>

        <h2 className="mt-7 font-serif text-[20px] font-medium">{t("overallProgress")}</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {LEVELS.map((lvl) => {
            const items = modules.filter((m) => matchesLevel(m, lvl));
            const totalCards = items.reduce((s, m) => s + m.total, 0);
            const completedCards = items.reduce((s, m) => s + m.completed, 0);
            const pct = totalCards > 0 ? Math.round((completedCards / totalCards) * 1000) / 10 : 0;
            const startedCount = items.filter((m) => m.completed > 0).length;
            return (
              <div key={lvl} className="bg-card rounded-lg border border-border shadow-sm p-3">
                <div className="text-[10px] tracking-wider text-tan font-semibold uppercase">
                  {levelLabel(lvl)}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-rose-line overflow-hidden">
                    <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-brand shrink-0">{pct}%</span>
                </div>
                <div className="mt-2 text-[11px] text-foreground/60">
                  {startedCount}/{items.length} {t("modulesStarted")}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-7 border-t border-border" />

        <div className="mt-6">
          <LevelFilterChips value={level} onChange={setLevel} includeBrand />
        </div>

        {total === 0 ? (
          <p className="text-[15px] text-foreground/75 mt-4">{t("noModulesForLevel")}</p>
        ) : (
          <>
            <p className="text-[13px] text-foreground/60 mt-3">
              {t("showing")} {start + 1}–{Math.min(start + PAGE_SIZE, total)} {t("of")} {total}{" "}
              {t("countModules").toLowerCase()}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {pageItems.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ModuleCard module={m} />
                </motion.div>
              ))}
            </div>
          </>
        )}

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
