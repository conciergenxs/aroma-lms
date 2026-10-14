import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

/** What a search shows when it finds nothing: the query, and that nothing matched it. */
export function NoSearchResults({ query }: { query: string }) {
  const { t } = useI18n();
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
    </motion.div>
  );
}
