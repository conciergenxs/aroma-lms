import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import type { Module } from "@/data/modules";
import { didYouMean } from "@/lib/did-you-mean";

/**
 * What a search shows when it finds nothing: the query, and — when the typed word is close
 * to something that really exists in `pool` — what it was probably reaching for. Tapping a
 * suggestion runs it as the new search.
 */
export function NoSearchResults({
  query,
  pool,
  onSuggestionSelect,
}: {
  query: string;
  /** The set being searched. Suggestions come from here, so they always return results. */
  pool: Module[];
  onSuggestionSelect: (keyword: string) => void;
}) {
  const { t } = useI18n();
  const suggestions = useMemo(() => didYouMean(query, pool), [query, pool]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 flex flex-col items-center text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tan/15">
        <SearchX className="h-7 w-7 text-tan" />
      </div>
      <h2 className="font-serif text-[20px] font-medium mt-4">{t("noResultsTitle")}</h2>
      <p className="text-[13px] text-foreground/60 mt-1.5 max-w-[300px]">
        {t("noResultsBody")} "{query}".
      </p>

      {suggestions.length > 0 && (
        <div className="mt-6">
          <p className="text-[13px] text-foreground/60">{t("didYouMean")}</p>
          <div className="mt-2.5 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSuggestionSelect(s)}
                className="rounded-full border border-brand/35 bg-card px-3.5 py-2 text-[13px] font-medium text-brand transition-colors hover:bg-brand hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
