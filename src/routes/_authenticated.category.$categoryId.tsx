import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { getCategory, getModulesByCategory } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/category/$categoryId")({
  loader: ({ params }) => {
    const cat = getCategory(params.categoryId);
    if (!cat) throw notFound();
    return { category: cat, items: getModulesByCategory(cat.id) };
  },
  component: CategoryDetailPage,
  notFoundComponent: () => <div className="p-8 text-center">Category not found</div>,
  errorComponent: () => <div className="p-8 text-center">Something went wrong</div>,
});

function CategoryDetailPage() {
  const { category, items } = Route.useLoaderData();
  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <Link to="/category" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> Back to Category
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">{category.name}</h1>
        <p className="text-[15px] text-foreground/75 mt-3">
          {items.length} module{items.length === 1 ? "" : "s"} in this category
        </p>

        {items.length === 0 ? (
          <div className="mt-10 text-center text-foreground/60 text-sm">
            No modules available yet in this category.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3">
            {items.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ModuleCard module={m} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
