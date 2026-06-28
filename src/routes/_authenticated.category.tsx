import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/modules";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/category")({
  component: CategoryPage,
});

function CategoryPage() {
  return (
    <div className="px-[34px] pt-[28px]">
      <h1 className="font-serif text-[31px] font-bold leading-none">Category</h1>
      <p className="text-[15px] text-foreground/75 mt-4">Browse modules based on product categories</p>
      <div className="mt-[34px] grid grid-cols-2 gap-x-4 gap-y-4">
        {categories.map((c) => (
          <Link
            to="/my-learning"
            key={c.id}
            className="relative h-[256px] rounded-xl overflow-hidden block"
          >
            <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={768} height={1024} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-3 text-white">
              <div className="font-serif text-[22px] font-bold leading-none">{c.name}</div>
              <div className="text-[13px] opacity-90 mt-2">{c.count} Modules</div>
            </div>
          </Link>
        ))}
      </div>
      <SiteFooter />
    </div>
  );
}
