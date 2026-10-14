import { Link, type LinkProps } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

type LevelBannerProps = {
  /** Reads as the destination's own name, e.g. "About Sisley" or "About Skin Care Category". */
  title: string;
  /** How many modules sit at that level — the same number the destination lists. */
  count: number;
  image: string;
} & Pick<LinkProps, "to" | "params">;

/**
 * Entry point to a whole knowledge level (the brand as a whole, or a category as a whole),
 * sitting above the title of the page whose content is one level further down. Replaces the
 * old Brand/Category segmented control: the level is somewhere you go, not a filter you toggle.
 */
export function LevelBanner({ title, count, image, to, params }: LevelBannerProps) {
  const { t } = useI18n();
  return (
    <motion.div
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <Link
        to={to}
        params={params}
        className="group relative block w-full aspect-video overflow-hidden rounded-xl shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={1024}
          height={576}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
          <div className="min-w-0">
            <div className="font-serif text-[20px] font-medium leading-tight">{title}</div>
            <div className="mt-1.5 text-[13px] opacity-90">
              {count} {t("countModules")}
            </div>
          </div>
          <ChevronRight className="mb-0.5 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
