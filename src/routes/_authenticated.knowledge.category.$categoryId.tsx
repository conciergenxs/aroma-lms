import { createFileRoute, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { getCategory, modules } from "@/data/modules";
import { KnowledgeLevelPage } from "@/components/KnowledgeLevelPage";

export const Route = createFileRoute("/_authenticated/knowledge/category/$categoryId")({
  loader: ({ params }) => {
    const cat = getCategory(params.categoryId);
    if (!cat) throw notFound();
    return { category: cat };
  },
  component: CategoryKnowledgePage,
  notFoundComponent: () => <div className="p-8 text-center">Kategori tidak ditemukan</div>,
  errorComponent: () => <div className="p-8 text-center">Terjadi kesalahan</div>,
});

function CategoryKnowledgePage() {
  const { t } = useI18n();
  const { category } = Route.useLoaderData();
  const items = modules.filter((m) => m.level === "category" && m.categoryId === category.id);
  return (
    <KnowledgeLevelPage
      title={`${t("aboutPrefix")} ${category.name} ${t("chipCategory")}`}
      subtitle={t("categoryKnowledgeSubtitle")}
      items={items}
    />
  );
}
