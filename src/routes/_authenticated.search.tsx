import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ChevronLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { modules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { NoSearchResults } from "@/components/NoSearchResults";
import { SiteFooter } from "@/components/layout/SiteFooter";

const searchSchema = z.object({
  q: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/search")({
  validateSearch: searchSchema,
  component: SearchResultsPage,
});

function SearchResultsPage() {
  const { t } = useI18n();
  const { q } = Route.useSearch();
  const router = useRouter();
  const [query, setQuery] = useState(q ?? "");

  // Back to whatever page the search was started from. Opened directly (a shared link, a
  // bookmark) there is nothing to go back to, so fall back to Home rather than leaving the app.
  const goBack = () =>
    router.history.canGoBack() ? router.history.back() : router.navigate({ to: "/home" });

  // Keep the input in sync if the URL's `q` changes without this component
  // remounting — e.g. browser back/forward between two /search?q=... states.
  useEffect(() => {
    setQuery(q ?? "");
  }, [q]);

  const trimmed = query.trim().toLowerCase();
  // Searched across every level at once. Splitting these behind Brand/Category/Product tabs
  // meant a module could match and still look like "no results" until you guessed the tab.
  const results = trimmed
    ? modules.filter(
        (m) =>
          m.title.toLowerCase().includes(trimmed) ||
          m.brand.toLowerCase().includes(trimmed) ||
          m.category.toLowerCase().includes(trimmed),
      )
    : [];

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center text-sm text-brand font-semibold mb-4 underline-offset-4 hover:underline"
        >
          <ChevronLeft className="h-4 w-4" /> {t("back")}
        </button>

        <h1 className="font-serif text-[27px] font-medium leading-tight text-foreground">
          {t("searchResultsTitle")}
        </h1>

        <div className="mt-5 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-tan" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-card rounded-lg border border-[#dcc9bd] pl-11 pr-4 py-3 text-[12px] shadow-sm placeholder:text-tan/70 focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        {trimmed === "" ? (
          <p className="text-[15px] text-foreground/75 mt-6">{t("searchEmptyPrompt")}</p>
        ) : results.length === 0 ? (
          <NoSearchResults query={query} />
        ) : (
          <>
            <p className="text-[13px] text-foreground/60 mt-6">
              {results.length} {t("searchResultsFor")} "{query}"
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {results.map((m, i) => (
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
          </>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
