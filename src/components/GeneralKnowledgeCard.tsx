import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import type { GeneralKnowledgeItem } from "@/data/general-knowledge";

export function GeneralKnowledgeCard({ item }: { item: GeneralKnowledgeItem }) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const pct = Math.round((item.completed / item.total) * 1000) / 10;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="block w-full text-left bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="px-2.5 pt-3">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-brand font-normal">
              {item.completed}/{item.total} {t("cardsCompleted")}
            </span>
            <span className="font-semibold text-brand">{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-rose-line overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-brand"
            />
          </div>
        </div>
        <div className="aspect-square m-2.5 mb-0 rounded-md bg-soft overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            width={1024}
            height={1024}
          />
        </div>
        <div className="px-2.5 py-3 min-h-[73px]">
          <div className="text-[10px] tracking-wider text-tan font-medium">{item.category}</div>
          <div className="font-serif text-[16px] font-medium leading-[1.1] mt-1 line-clamp-2">
            {item.title}
          </div>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-[12px] text-foreground/70 mt-2 leading-relaxed overflow-hidden"
              >
                {item.body}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.div>
  );
}
