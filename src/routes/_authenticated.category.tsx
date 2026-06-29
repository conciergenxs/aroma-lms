import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/modules";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/category")({
  component: CategoryPage,
});

function CategoryPage() {
  return (
    <>
      <div className="px-[34px] pt-[28px]">
        <h1 className="font-serif text-[31px] font-medium leading-none">Category</h1>
        <p className="text-[15px] text-foreground/75 mt-4">Browse modules based on product categories</p>
        <div className="mt-[34px] grid grid-cols-2 gap-x-4 gap-y-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/category/$categoryId"
                params={{ categoryId: c.id }}
                className="relative h-[256px] rounded-xl overflow-hidden block shadow-sm"
              >
                <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" width={768} height={1024} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-3 text-white">
                  <div className="font-serif text-[22px] font-medium leading-none">{c.name}</div>
                  <div className="text-[13px] opacity-90 mt-2">{c.count} Modules</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
