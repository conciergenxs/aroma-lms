import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { modules } from "@/data/modules";
import { KnowledgeLevelPage } from "@/components/KnowledgeLevelPage";

export const Route = createFileRoute("/_authenticated/knowledge/brand")({
  component: BrandKnowledgePage,
});

function BrandKnowledgePage() {
  const { t } = useI18n();
  const items = modules.filter((m) => m.level === "brand");
  return (
    <KnowledgeLevelPage
      title={`${t("aboutPrefix")} ${t("chipBrand")}`}
      subtitle={t("brandKnowledgeSubtitle")}
      items={items}
    />
  );
}
