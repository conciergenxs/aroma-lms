import { useRouter } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import type { Module } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Shared shell for the two knowledge-level destinations (a whole brand, a whole category).
 * The heading repeats the banner that was tapped to get here, so the name of the thing stays
 * the same from entry point to page.
 */
export function KnowledgeLevelPage({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: Module[];
}) {
  const { t } = useI18n();
  const router = useRouter();
  return (
    <>
      <div className="px-[14px] pt-[28px]">
        {/* The brand banner appears on both Home and All Modules, so a fixed "back to X"
            would be wrong half the time — go back to wherever the banner was tapped. */}
        <button
          type="button"
          onClick={() => router.history.back()}
          className="inline-flex items-center text-sm text-brand font-semibold mb-4 underline-offset-4 hover:underline"
        >
          <ChevronLeft className="h-4 w-4" /> {t("back")}
        </button>
        <h1 className="font-serif text-[31px] font-medium leading-tight">{title}</h1>
        <p className="text-[15px] text-foreground/75 mt-4">{subtitle}</p>

        {items.length === 0 ? (
          <p className="text-[15px] text-foreground/75 mt-6">{t("noKnowledgeModules")}</p>
        ) : (
          <>
            <p className="text-[13px] text-foreground/60 mt-5">
              {items.length} {t("countModules")}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {items.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
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
