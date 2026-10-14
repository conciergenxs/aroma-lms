import { Link } from "@tanstack/react-router";
import { User, ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAvatarStore } from "@/lib/avatar-store";
import navLogo from "@/assets/navbar-logo.svg.asset.json";
import dolceLogo from "@/assets/brands/dolce-gabbana.svg";
import { useBrand, ALL_BRANDS, type BrandName } from "@/lib/brand-context";

function BrandSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { activeBrand, setActiveBrand } = useBrand();
  const select = (b: BrandName) => {
    setActiveBrand(b);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl pb-10 shadow-2xl font-sans"
          >
            <div className="w-10 h-1 bg-border rounded-full mx-auto mt-3 mb-4" />
            <p className="px-6 text-[13px] font-bold tracking-widest text-foreground/50 mb-2">
              PILIH BRAND
            </p>
            {ALL_BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => select(b)}
                className="w-full flex items-center justify-between px-6 py-4 text-[15px] hover:bg-cream transition-colors border-t border-border first:border-t-0 font-sans"
              >
                <span
                  className={b === activeBrand ? "font-semibold text-brand" : "text-foreground"}
                >
                  {b}
                </span>
                {b === activeBrand && <Check className="h-4 w-4 text-brand" />}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Below this the page has barely moved, so the header always stays put — otherwise it
// flickers away on the smallest nudge at the very top of a page.
const REVEAL_ZONE = 72;
// Ignore scroll jitter and the rubber-band bounce at either end.
const DIRECTION_THRESHOLD = 6;

/** Hides the header while reading down the page, brings it back the moment you scroll up. */
function useHideOnScrollDown(disabled: boolean) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // While a sheet is open the page behind is frozen; keep the header where it is.
    if (disabled) return;
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - last;
        if (y <= REVEAL_ZONE) {
          setHidden(false);
          last = y;
          return;
        }
        if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
        setHidden(delta > 0);
        last = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [disabled]);

  // Reveal it again whenever it stops being driven, so it can never be left stuck off-screen.
  useEffect(() => {
    if (disabled) setHidden(false);
  }, [disabled]);

  return hidden;
}

/**
 * Publishes the header's current bottom edge as --sticky-offset. A page bar that sets
 * `top: var(--sticky-offset)` then sits under the header while it is showing and rides up
 * to the top of the screen as it retreats, instead of being covered by it on the way back.
 */
function usePublishStickyOffset(ref: React.RefObject<HTMLElement | null>, hidden: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (typeof document === "undefined") return;
    const height = el?.offsetHeight ?? 0;
    document.documentElement.style.setProperty("--sticky-offset", hidden ? "0px" : `${height}px`);
    return () => {
      document.documentElement.style.removeProperty("--sticky-offset");
    };
  }, [ref, hidden]);
}

export function TopHeader() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const hidden = useHideOnScrollDown(sheetOpen);
  const headerRef = useRef<HTMLElement>(null);
  usePublishStickyOffset(headerRef, hidden);
  const { activeBrand } = useBrand();
  const headerLogo = activeBrand === "Dolce & Gabbana" ? dolceLogo : navLogo.url;
  const avatar = useAvatarStore((s) => s.avatar);
  const hydrateAvatar = useAvatarStore((s) => s.hydrate);

  useEffect(() => hydrateAvatar(), [hydrateAvatar]);

  return (
    <>
      <BrandSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
      <header
        ref={headerRef}
        className={`sticky top-0 z-30 border-b border-black/10 bg-card transition-transform duration-300 ease-out motion-reduce:transition-none ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="w-full px-6 h-[70px] flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/home" className="shrink-0">
              <img src={headerLogo} alt={`Aroma · ${activeBrand}`} className="h-[31px] w-auto" />
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
            className="shrink-0 h-8 w-8 rounded-full border border-brand/35 flex items-center justify-center text-brand overflow-hidden"
          >
            {avatar ? (
              <img src={avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              <User className="h-4 w-4" />
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
