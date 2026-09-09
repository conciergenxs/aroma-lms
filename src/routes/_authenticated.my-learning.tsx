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
import { Info, Search, SearchX } from "lucide-react";

export const Route = createFileRoute("/_authenticated/my-learning")({
  component: MyLearningPage,
});

const PAGE_SIZE = 10;
const LEVELS = ["brand", "category", "product"] as const;

function MyLearningPage() {
  const { t } = useI18n();
  const [level, setLevel] = useState<ModuleLevelFilter>(DEFAULT_LEVEL);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showProgressInfo, setShowProgressInfo] = useState(false);

  useEffect(() => setPage(1), [level, search]);

  const totalCardsAll = modules.reduce((s, m) => s + m.total, 0);
  const completedCardsAll = modules.reduce((s, m) => s + m.completed, 0);
  const overallPct =
    totalCardsAll > 0 ? Math.round((completedCardsAll / totalCardsAll) * 1000) / 10 : 0;

  // "Started or completed" — the criterion the page's own subtitle already
  // promises. m.completed > 0 covers both in-progress and fully completed
  // modules; a fresh module always has completed === 0.
  const started = modules.filter((m) => m.completed > 0);

  const baseItems = started.filter((m) => matchesLevel(m, level));
  const q = search.trim().toLowerCase();
  const filtered = q ? baseItems.filter((m) => m.title.toLowerCase().includes(q)) : baseItems;
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);
  const countLabelKey =
    level === "brand"
      ? "countModulesBrand"
      : level === "category"
        ? "countModulesCategory"
        : "countModulesProduct";

  const levelLabel = (lvl: ModuleLevelFilter) =>
    lvl === "brand" ? t("chipBrand") : lvl === "category" ? t("chipCategory") : t("chipProduct");

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <h1 className="font-serif text-[31px] font-medium leading-none">{t("pageMyLearning")}</h1>
        <p className="text-[15px] text-foreground/75 mt-4">{t("myLearningSubtitle")}</p>

        <div className="mt-7 flex items-center justify-between gap-2">
          <h2 className="font-serif text-[20px] font-medium">{t("overallProgress")}</h2>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProgressInfo((s) => !s)}
              aria-label={t("overallProgressInfoLabel")}
              className="h-6 w-6 rounded-full border border-brand/35 text-brand flex items-center justify-center bg-card hover:bg-brand hover:text-white transition-colors shrink-0"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
            {showProgressInfo && (
              <div
                role="tooltip"
                className="absolute right-0 top-8 z-20 w-[220px] max-w-[calc(100vw-28px)] rounded-lg border border-border bg-card shadow-lg p-3 text-[12px] leading-snug text-foreground/80"
              >
                {t("overallProgressTooltip")}
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 bg-card rounded-lg border border-border shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2.5 rounded-full bg-rose-line overflow-hidden">
              <div
                className="h-full bg-brand transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <span className="text-[16px] font-bold text-brand shrink-0">{overallPct}%</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {LEVELS.map((lvl, i) => {
              const items = modules.filter((m) => matchesLevel(m, lvl));
              const completedCount = items.filter(
                (m) => m.total > 0 && m.completed === m.total,
              ).length;
              return (
                <div key={lvl} className={i > 0 ? "pl-2 border-l border-border" : ""}>
                  <div className="text-[10px] tracking-wider text-tan font-semibold uppercase">
                    {levelLabel(lvl)}
                  </div>
                  <div className="mt-2 text-[11px] text-foreground/60">
                    {completedCount}/{items.length} {t("modulesCompleted")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-7 border-t border-border" />

        <div className="mt-6">
          <LevelFilterChips value={level} onChange={setLevel} includeBrand />
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-tan" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-card rounded-lg border border-[#dcc9bd] pl-11 pr-4 py-3 text-[12px] shadow-sm placeholder:text-tan/70 focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </form>

        {baseItems.length === 0 ? (
          <p className="text-[15px] text-foreground/75 mt-4">{t("noModulesForLevel")}</p>
        ) : total === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 rounded-full bg-tan/15 flex items-center justify-center">
              <SearchX className="h-6 w-6 text-tan" />
            </div>
            <p className="text-[15px] text-foreground/80 font-medium mt-4">
              {t("noSearchResults")} "{search.trim()}"
            </p>
            <p className="text-[13px] text-foreground/55 mt-1.5">{t("noSearchResultsHint")}</p>
          </motion.div>
        ) : (
          <>
            <p className="text-[13px] text-foreground/60 mt-3">
              {t("showing")} {start + 1}–{Math.min(start + PAGE_SIZE, total)} {t("of")} {total}{" "}
              {t(countLabelKey)}
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
