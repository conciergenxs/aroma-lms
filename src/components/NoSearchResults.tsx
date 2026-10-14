import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import type { Module } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";

const RECOMMENDATION_COUNT = 4;

/**
 * What a search shows when it finds nothing: what happened, then a way back into the
 * catalogue. The recommendations are drawn from `pool` — whatever the page was searching
 * within — so they are always real and never point outside the current scope.
 */
export function NoSearchResults({ query, pool }: { query: string; pool: Module[] }) {
  const { t } = useI18n();

  // Something half-finished is the most useful thing to offer back; a fresh module is the
  // next best. Fully completed ones are the least useful, so they fall to the end.
  const recommendations = [
    ...pool.filter((m) => m.completed > 0 && m.completed < m.total),
    ...pool.filter((m) => m.completed === 0),
    ...pool.filter((m) => m.total > 0 && m.completed === m.total),
  ].slice(0, RECOMMENDATION_COUNT);

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
