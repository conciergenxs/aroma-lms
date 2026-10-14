import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ChevronLeft, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { modules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { NoSearchResults } from "@/components/NoSearchResults";
import { PrevNextPagination } from "@/components/PrevNextPagination";
import { SearchFilters } from "@/components/SearchFilters";
import { SearchMatchSection } from "@/components/SearchMatchSection";
import {
  searchModules,
  applyFilters,
  applySort,
  EMPTY_FILTERS,
  type FilterState,
} from "@/lib/search";
import { SiteFooter } from "@/components/layout/SiteFooter";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/_authenticated/search")({
  validateSearch: searchSchema,
  component: SearchResultsPage,
});

const PAGE_SIZE = 10;

function SearchResultsPage() {
  const { t } = useI18n();
  const { q } = Route.useSearch();
  const router = useRouter();
  const [query, setQuery] = useState(q ?? "");
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);

  // Keep the input in sync if the URL's `q` changes without this component
  // remounting — e.g. browser back/forward between two /search?q=... states.
  useEffect(() => setQuery(q ?? ""), [q]);
  useEffect(() => setPage(1), [query, filters]);

  // ...and push what is typed back into the URL, so a refresh or a shared link reopens the
  // search actually on screen instead of the one it started from. Replaced rather than
  // pushed: every keystroke in the history would make Back unusable. Debounced so typing
  // does not write a history entry per character.
  useEffect(() => {
    const typed = query.trim();
    if (typed === (q ?? "").trim()) return;
    const id = setTimeout(() => {
      router.navigate({
        to: "/search",
        search: typed ? { q: typed } : {},
        replace: true,
      });
    }, 350);
    return () => clearTimeout(id);
  }, [query, q, router]);

  const goBack = () =>
    router.history.canGoBack() ? router.history.back() : router.navigate({ to: "/home" });

  // Searched across every level and into each module's knowledge cards, so an ingredient
  // like "argan" finds the module that teaches it instead of coming back empty.
  const hits = useMemo(() => searchModules(query, modules), [query]);
  const shown = useMemo(
    () => applySort(applyFilters(hits, filters), filters.sort),
    [hits, filters],
  );

  const total = shown.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = shown.slice(start, start + PAGE_SIZE);
  const trimmed = query.trim();

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        {/* ── the search bar and its filters, kept in reach while the results scroll ── */}
        <div
          className="sticky z-20 -mx-[14px] bg-cream px-[14px] pb-2.5 pt-1 transition-[top] duration-300 ease-out motion-reduce:transition-none"
          style={{ top: "var(--sticky-offset, 0px)" }}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goBack}
              aria-label={t("back")}
              className="shrink-0 rounded-full p-1 text-brand transition-colors hover:bg-brand/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tan" />
              <input
                type="text"
                // Only when there is nothing to read yet. Arriving from Home with a query
                // already filled, autofocus would throw the keyboard over the results.
                autoFocus={!q}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-full border border-[#dcc9bd] bg-card py-3 pl-11 pr-10 text-[13px] shadow-sm placeholder:text-tan/70 focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={t("clearSearch")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-tan transition-colors hover:bg-tan/15 hover:text-brand"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {trimmed !== "" && hits.length > 0 && (
            <SearchFilters value={filters} onChange={setFilters} />
          )}
        </div>

        {trimmed === "" ? (
          <p className="mt-6 text-[15px] text-foreground/75">{t("searchEmptyPrompt")}</p>
        ) : hits.length === 0 ? (
          <NoSearchResults query={query} pool={modules} onSuggestionSelect={setQuery} />
        ) : (
          <>
            {/* ── the brand or category the query named ─────────────── */}
            {/* Fed the filtered list, not the raw hits: a card reading "11 Modul" above a
                list of 2 would contradict it, and it drops out by itself at zero. */}
            <SearchMatchSection query={query} hits={shown.map((h) => h.module)} />

            {/* ── the results themselves ────────────────────────────── */}
            {total === 0 ? (
              <div className="mt-10 flex flex-col items-center text-center">
                <p className="text-[15px] text-foreground/70 max-w-[300px]">
                  {t("noResultsForFilter")}
                </p>
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="mt-5 rounded-full border border-brand/40 px-5 py-3 text-[13px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white active:scale-[0.98]"
                >
                  {t("resetFilter")}
                </button>
              </div>
            ) : (
              <>
                <p className="mt-5 text-[13px] text-foreground/60">
                  {t("showing")} {start + 1}–{Math.min(start + PAGE_SIZE, total)} {t("of")} {total}{" "}
                  {t("searchResultsFor")} "{trimmed}"
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {pageItems.map((hit, i) => (
                    <motion.div
                      key={hit.module.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <ModuleCard module={hit.module} matchNote={hit.matchedIn ?? undefined} />
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
          </>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
