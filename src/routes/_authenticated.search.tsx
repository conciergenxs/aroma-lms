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
import { SearchFilters, EMPTY_FILTERS, type FilterState } from "@/components/SearchFilters";
import { SearchMatchSection } from "@/components/SearchMatchSection";
import { searchModules, applyFilters, applySort } from "@/lib/search";
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
        {/* ── the search bar itself ─────────────────────────────────── */}
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
              autoFocus
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

        {trimmed === "" ? (
          <p className="mt-6 text-[15px] text-foreground/75">{t("searchEmptyPrompt")}</p>
        ) : hits.length === 0 ? (
          <NoSearchResults query={query} pool={modules} onSuggestionSelect={setQuery} />
        ) : (
          <>
            {/* ── filters ───────────────────────────────────────────── */}
            <SearchFilters value={filters} onChange={setFilters} />

            {/* ── the brand or category the query named ─────────────── */}
            {/* Fed the filtered list, not the raw hits: a card reading "11 Modul" above a
                list of 2 would contradict it, and it drops out by itself at zero. */}
            <SearchMatchSection query={query} hits={shown.map((h) => h.module)} />

            {/* ── the results themselves ────────────────────────────── */}
            {total === 0 ? (
              <p className="mt-8 text-center text-[15px] text-foreground/70">
                {t("noResultsForFilter")}
              </p>
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
