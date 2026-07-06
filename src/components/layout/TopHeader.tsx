import { Link } from "@tanstack/react-router";
import { User, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import navLogo from "@/assets/navbar-logo.svg.asset.json";
import { useBrand, ALL_BRANDS } from "@/lib/brand-context";

function BrandDropdown() {
  const { activeBrand, setActiveBrand } = useBrand();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[12px] font-semibold text-foreground/70 hover:text-foreground transition-colors max-w-[140px]"
      >
        <span className="truncate">{activeBrand}</span>
        <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-[200px] bg-card rounded-xl shadow-lg border border-border z-50 py-1 overflow-hidden">
          {ALL_BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => { setActiveBrand(b); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] hover:bg-cream transition-colors"
            >
              <span className={b === activeBrand ? "font-semibold text-brand" : "text-foreground"}>{b}</span>
              {b === activeBrand && <Check className="h-3.5 w-3.5 text-brand" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TopHeader() {
  return (
    <header className="sticky top-0 z-30 bg-card border-b border-black/10">
      <div className="w-full px-6 h-[70px] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/home" className="shrink-0">
            <img src={navLogo.url} alt="Aroma · Laura Mercier" className="h-[31px] w-auto" />
          </Link>
          <div className="h-4 w-px bg-border shrink-0" />
          <BrandDropdown />
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
  );
}
