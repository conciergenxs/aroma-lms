import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { modules, brands } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useRef } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/home")({
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();
  const railRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) =>
    railRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <>
      <div className="px-[14px] pt-[33px]">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-serif text-[27px] font-medium leading-tight text-foreground"
        >
          {t("goodMorning")}, Bella!
        </motion.h1>
        <p className="text-[15px] text-foreground/75 mt-2">{t("homeSubtitle")}</p>

        <div className="mt-5 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-tan" />
          <input
            type="search"
            placeholder={t("searchPlaceholder")}
            className="w-full bg-card rounded-lg border border-[#dcc9bd] pl-11 pr-4 py-3 text-[12px] shadow-sm placeholder:text-tan/70 focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="font-serif text-[20px] font-medium">{t("learningModules")}</h2>
          <Link to="/modules" className="text-xs font-bold tracking-widest text-brand underline-offset-4 underline">
            {t("seeAll")}
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {modules.slice(0, 6).map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>

        <motion.div whileTap={{ scale: 0.98 }}>
          <Link
            to="/modules"
            className="mt-7 block text-center bg-brand text-brand-foreground font-semibold tracking-[0.2em] text-sm py-[17px] rounded-full hover:brightness-110 transition-all"
          >
            {t("seeAllModules")}
          </Link>
        </motion.div>

        <div className="mt-[60px] flex items-center justify-between">
          <h2 className="font-serif text-[20px] font-medium">{t("otherBrands")}</h2>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} aria-label="Previous" className="h-8 w-8 rounded-full border border-brand/35 text-brand flex items-center justify-center bg-card hover:bg-brand hover:text-white transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scroll(1)} aria-label="Next" className="h-8 w-8 rounded-full border border-brand/35 text-brand flex items-center justify-center bg-card hover:bg-brand hover:text-white transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={railRef} className="mt-3 flex gap-3 overflow-x-auto scrollbar-none snap-x pb-2">
          {brands.map((b) => (
            <Link
              key={b.id}
              to="/modules"
              search={{ brand: b.name }}
              className="relative shrink-0 w-[235px] h-[206px] rounded-lg overflow-hidden snap-start"
            >
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full h-full"
              >
                <img src={b.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1024} height={640} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-black/80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                  <img src={b.logo} alt={b.name} className="max-h-[44px] w-auto max-w-[80%] object-contain" />
                  <div className="text-xs mt-3 text-tan tracking-wide">{b.count} {t("countModules")}</div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
