import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { modules, type Module } from "@/data/modules";
import { didYouMean } from "@/lib/did-you-mean";

const chipClass =
  "rounded-full border border-brand/35 bg-card px-3.5 py-2 text-[13px] font-medium text-brand transition-colors hover:bg-brand hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

/**
 * What a search shows when it finds nothing: the query, and what it was probably reaching for.
 *
 * Suggestions are drawn from `pool` first — the set this page searches — because those can be
 * applied right here and are certain to return something. A page that filters a narrow slice
 * (Progress searches only started modules) often has no near word in it, so rather than show
 * nothing we fall back to the whole catalogue and send those suggestions to the global search,
 * which can actually find them. Either way a suggestion always leads somewhere.
 */
export function NoSearchResults({
  query,
  pool,
  onSuggestionSelect,
}: {
  query: string;
  pool: Module[];
  onSuggestionSelect: (keyword: string) => void;
}) {
  const { t } = useI18n();

  const inScope = useMemo(() => didYouMean(query, pool), [query, pool]);
  const elsewhere = useMemo(
    () => (inScope.length > 0 ? [] : didYouMean(query, modules)),
    [query, inScope.length],
  );

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

      {inScope.length > 0 && (
        <div className="mt-6">
          <p className="text-[13px] text-foreground/60">{t("didYouMean")}</p>
          <div className="mt-2.5 flex flex-wrap justify-center gap-2">
            {inScope.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSuggestionSelect(s)}
                className={chipClass}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {elsewhere.length > 0 && (
        <div className="mt-6">
          <p className="text-[13px] text-foreground/60 max-w-[300px]">{t("didYouMeanElsewhere")}</p>
          <div className="mt-2.5 flex flex-wrap justify-center gap-2">
            {elsewhere.map((s) => (
              <Link key={s} to="/search" search={{ q: s }} className={chipClass}>
                {s}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
