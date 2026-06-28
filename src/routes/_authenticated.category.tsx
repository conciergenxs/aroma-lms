import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/modules";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/category")({
  component: CategoryPage,
});

function CategoryPage() {
  return (
    <div className="px-4 pt-4">
      <h1 className="font-serif text-3xl">Category</h1>
      <p className="text-sm text-foreground/70 mt-1">Browse modules based on product categories</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {categories.map((c) => (
          <Link
            to="/my-learning"
            key={c.id}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden block"
          >
            <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="font-serif text-2xl">{c.name}</div>
              <div className="text-xs opacity-90 mt-0.5">{c.count} Modules</div>
            </div>
          </Link>
        ))}
      </div>
      <SiteFooter />
    </div>
  );
}
