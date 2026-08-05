import { useI18n } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { modules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/my-learning")({
  component: MyLearningPage,
});

function MyLearningPage() {
  const { t } = useI18n();
  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <h1 className="font-serif text-[31px] font-medium leading-none">{t("pageMyLearning")}</h1>
        <p className="text-[15px] text-foreground/75 mt-4">{t("myLearningSubtitle")}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {modules.slice(0, 6).map((m, i) => (
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
      </div>
      <SiteFooter />
    </>
  );
}
