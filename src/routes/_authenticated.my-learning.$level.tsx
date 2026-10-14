import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, PartyPopper, Search, SearchX } from "lucide-react";
import { modules, type Module } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { matchesLevel, type ModuleLevelFilter } from "@/components/LevelFilterChips";
import { PrevNextPagination } from "@/components/PrevNextPagination";
import { SiteFooter } from "@/components/layout/SiteFooter";

const LEVELS = ["brand", "category", "product"] as const;

export const Route = createFileRoute("/_authenticated/my-learning/$level")({
  loader: ({ params }) => {
    // Only the three real module levels are addressable here — anything else is a
    // typed/stale URL, not an empty list.
    if (!(LEVELS as readonly string[]).includes(params.level)) throw notFound();
    return { level: params.level as ModuleLevelFilter };
  },
  component: UnfinishedModulesPage,
  notFoundComponent: () => <div className="p-8 text-center">Level tidak ditemukan</div>,
  errorComponent: () => <div className="p-8 text-center">Terjadi kesalahan</div>,
});

const PAGE_SIZE = 10;

// A module counts as finished only once every card in it is done — the same test the
// Progress page's per-level tile uses for its completed count, so the tile's "6/18"
// and the length of this list always add back up to the level total.
const isFinished = (m: Module) => m.total > 0 && m.completed === m.total;

function UnfinishedModulesPage() {
  const { t } = useI18n();
  const { level } = Route.useLoaderData();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Navigating between levels reuses this component, so reset the view each time.
  useEffect(() => {
    setSearch("");
    setPage(1);
  }, [level]);

  useEffect(() => setPage(1), [search]);

  const levelItems = modules.filter((m) => matchesLevel(m, level));
  const finishedCount = levelItems.filter(isFinished).length;
  const pct =
    levelItems.length > 0 ? Math.round((finishedCount / levelItems.length) * 1000) / 10 : 0;

  const baseItems = levelItems.filter((m) => !isFinished(m));
  const q = search.trim().toLowerCase();
  const filtered = q ? baseItems.filter((m) => m.title.toLowerCase().includes(q)) : baseItems;

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  const levelLabel =
    level === "brand"
      ? t("chipBrand")
      : level === "category"
        ? t("chipCategory")
        : t("chipProduct");
  const subtitleKey =
    level === "brand"
      ? "unfinishedSubtitleBrand"
      : level === "category"
        ? "unfinishedSubtitleCategory"
        : "unfinishedSubtitleProduct";
  const countLabelKey =
    level === "brand"
      ? "countModulesBrand"
      : level === "category"
        ? "countModulesCategory"
        : "countModulesProduct";

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <Link
          to="/my-learning"
          className="inline-flex items-center text-sm text-brand font-semibold mb-4 hover:underline underline-offset-4"
        >
          <ChevronLeft className="h-4 w-4" /> {t("backToMyLearning")}
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">
          {t("unfinishedModules")}
        </h1>
        <p className="text-[15px] text-foreground/75 mt-4">{t(subtitleKey)}</p>

        <div className="mt-5 bg-card rounded-lg border border-border shadow-sm p-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[12px] font-semibold text-tan">{levelLabel}</span>
            <span className="text-[13px] font-medium text-foreground/70">
              {finishedCount}/{levelItems.length} {t("modulesCompleted")}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-2.5 rounded-full bg-rose-line overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full bg-brand"
              />
            </div>
            <span className="text-[16px] font-bold text-brand shrink-0">{pct}%</span>
          </div>
        </div>

        {baseItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 rounded-full bg-brand/10 flex items-center justify-center">
              <PartyPopper className="h-6 w-6 text-brand" />
            </div>
            <h2 className="font-serif text-[20px] font-medium mt-4">{t("levelAllDoneTitle")}</h2>
            <p className="text-[13px] text-foreground/60 mt-1.5 max-w-[290px]">
              {t("levelAllDoneDesc")}
            </p>
            <Link
              to="/modules"
              className="mt-6 inline-block bg-brand text-brand-foreground text-[13px] font-semibold tracking-[0.12em] px-6 py-3 rounded-full hover:brightness-110 active:scale-[0.98] transition-all"
            >
              {t("browseAllModules")}
            </Link>
          </motion.div>
        ) : (
          <>
            <form onSubmit={(e) => e.preventDefault()} className="mt-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-tan" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-card rounded-lg border border-[#dcc9bd] pl-11 pr-4 py-3 text-[12px] shadow-sm placeholder:text-tan/70 focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </form>

            {total === 0 ? (
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
          </>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
