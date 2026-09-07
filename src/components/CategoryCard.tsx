import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

type CategoryItem = { id: string; name: string; count: number; image: string };

export function CategoryCard({
  category: c,
  index = 0,
}: {
  category: CategoryItem;
  index?: number;
}) {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        to="/category/$categoryId"
        params={{ categoryId: c.id }}
        className="relative h-[256px] rounded-xl overflow-hidden block shadow-sm"
      >
        <img
          src={c.image}
          alt={c.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
          width={768}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-3 text-white">
          <div className="font-serif text-[22px] font-medium leading-none">{c.name}</div>
          <div className="text-[13px] opacity-90 mt-2">
            {c.count} {t("countModules")}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
