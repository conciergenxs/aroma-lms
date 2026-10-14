import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import type { Module } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";

const RECOMMENDATION_COUNT = 4;
// Enough of each to show the two different things you can search by, without a wall of chips.
const CATEGORY_SUGGESTIONS = 3;
const BRAND_SUGGESTIONS = 2;

// Category names are stored upper-case ("SKIN CARE") because that's how the module cards
// show them. As a tappable keyword they read better in title case; search matches
// case-insensitively, so the displayed string is also the one we search for.
const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase());

/**
 * What a search shows when it finds nothing: why it came up empty, what to try instead, and
 * a way back into the catalogue. The suggestions and recommendations are drawn from `pool` —
 * whatever the page was searching within — so they are always real and in scope.
 */
export function NoSearchResults({
  query,
  pool,
  onSuggestionSelect,
}: {
  query: string;
  /** The set being searched, before the query was applied. */
  pool: Module[];
  onSuggestionSelect: (keyword: string) => void;
}) {
  const { t } = useI18n();

  // Something half-finished is the most useful thing to offer back; a fresh module is the
  // next best. Fully completed ones are the least useful, so they fall to the end.
  const recommendations = [
    ...pool.filter((m) => m.completed > 0 && m.completed < m.total),
    ...pool.filter((m) => m.completed === 0),
    ...pool.filter((m) => m.total > 0 && m.completed === m.total),
  ].slice(0, RECOMMENDATION_COUNT);

  const categoryKeywords = [...new Set(pool.map((m) => m.category))]
    .map(titleCase)
    .slice(0, CATEGORY_SUGGESTIONS);
  const brandKeywords = [...new Set(pool.map((m) => m.brand))]
    // The house brand is on every level module and would match almost everything.
    .filter((b) => b !== "PT Aroma Abadi")
    .slice(0, BRAND_SUGGESTIONS);
  const suggestions = [...categoryKeywords, ...brandKeywords];

  const tips = [t("noResultsTip1"), t("noResultsTip2"), t("noResultsTip3")];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tan/15">
          <SearchX className="h-7 w-7 text-tan" />
        </div>
        <h2 className="font-serif text-[20px] font-medium mt-4">{t("noResultsTitle")}</h2>
        <p className="text-[13px] text-foreground/60 mt-1.5 max-w-[300px]">
          {t("noResultsBody")} "{query}".
        </p>
      </div>

      <ul className="mt-5 mx-auto max-w-[300px] space-y-1.5">
        {tips.map((tip) => (
          <li key={tip} className="flex gap-2 text-[13px] leading-snug text-foreground/60">
            <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-tan" />
            {tip}
          </li>
        ))}
      </ul>

      {suggestions.length > 0 && (
        <div className="mt-7">
          <h3 className="font-serif text-[17px] font-medium">{t("tryTheseKeywords")}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
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

      {recommendations.length > 0 && (
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="font-serif text-[20px] font-medium">{t("youMightLike")}</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {recommendations.map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
