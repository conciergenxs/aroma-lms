import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import type { Module } from "@/data/modules";

export function ModuleCard({ module: m }: { module: Module }) {
  const { t } = useI18n();
  const pct = Math.round((m.completed / m.total) * 1000) / 10;
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      <Link
        to="/modules/$moduleId"
        params={{ moduleId: m.id }}
        className="block bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="px-2.5 pt-3">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-brand font-normal">{m.completed}/{m.total} {t("cardsCompleted")}</span>
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
            src={m.image}
            alt={m.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            width={1024}
            height={1024}
          />
        </div>
        <div className="px-2.5 py-3 min-h-[73px]">
          <div className="text-[10px] tracking-wider text-tan font-medium">{m.category}</div>
          <div className="font-serif text-[16px] font-medium leading-[1.1] mt-1 line-clamp-2">{m.title}</div>
        </div>
      </Link>
    </motion.div>
  );
}
