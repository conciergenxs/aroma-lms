import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ChevronLeft, Search, SearchX } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { modules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
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
  const [query, setQuery] = useState(q ?? "");

  const trimmed = query.trim().toLowerCase();
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
        <Link to="/home" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("backToHome")}
        </Link>

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
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 rounded-full bg-tan/15 flex items-center justify-center">
              <SearchX className="h-6 w-6 text-tan" />
            </div>
            <p className="text-[15px] text-foreground/80 font-medium mt-4">
              {t("noSearchResults")} "{query}"
            </p>
            <p className="text-[13px] text-foreground/55 mt-1.5">{t("noSearchResultsHint")}</p>
          </motion.div>
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
