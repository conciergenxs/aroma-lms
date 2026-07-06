import { Link } from "@tanstack/react-router";
import { User, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import navLogo from "@/assets/navbar-logo.svg.asset.json";
import { useBrand, ALL_BRANDS, type BrandName } from "@/lib/brand-context";

function BrandSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { activeBrand, setActiveBrand } = useBrand();
  const select = (b: BrandName) => { setActiveBrand(b); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl pb-10 shadow-2xl font-sans"
          >
            <div className="w-10 h-1 bg-border rounded-full mx-auto mt-3 mb-4" />
            <p className="px-6 text-[13px] font-bold tracking-widest text-foreground/50 mb-2">PILIH BRAND</p>
            {ALL_BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => select(b)}
                className="w-full flex items-center justify-between px-6 py-4 text-[15px] hover:bg-cream transition-colors border-t border-border first:border-t-0 font-sans"
              >
                <span className={b === activeBrand ? "font-semibold text-brand" : "text-foreground"}>{b}</span>
                {b === activeBrand && <Check className="h-4 w-4 text-brand" />}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function TopHeader() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <BrandSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
      <header className="sticky top-0 z-30 bg-card border-b border-black/10">
        <div className="w-full px-6 h-[70px] flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/home" className="shrink-0">
              <img src={navLogo.url} alt="Aroma · Laura Mercier" className="h-[31px] w-auto" />
            </Link>
            <button
              onClick={() => setSheetOpen(true)}
              aria-label="Switch brand"
              className="ml-1 flex items-center justify-center h-7 w-7 rounded-full hover:bg-black/5 transition-colors"
            >
              <ChevronDown className="h-4 w-4 text-foreground/60" />
            </button>
          </div>
          <Link
            to="/profile"
            aria-label="Profile"
            className="shrink-0 h-8 w-8 rounded-full border border-brand/35 flex items-center justify-center text-brand"
          >
            <User className="h-4 w-4" />
          </Link>
        </div>
      </header>
    </>
  );
}
