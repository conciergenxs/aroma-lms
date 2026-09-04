import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const ALL_BRANDS = ["Laura Mercier", "Dolce & Gabbana", "bareMinerals", "Rimmel", "Sisley"] as const;
export type BrandName = typeof ALL_BRANDS[number];

interface BrandCtx { activeBrand: BrandName; setActiveBrand: (b: BrandName) => void; }
const BrandContext = createContext<BrandCtx | null>(null);

const ACTIVE_BRAND_KEY = "aroma:activeBrand";

function isBrandName(v: string | null): v is BrandName {
  return v !== null && (ALL_BRANDS as readonly string[]).includes(v);
}

export function BrandProvider({ children }: { children: ReactNode }) {
  // Always start at the SSR-safe default so the client's first render matches
  // the server-rendered HTML exactly — reading localStorage in the initializer
  // (as this used to) causes a hydration mismatch (React error #418) for any
  // returning visitor who had previously switched to a non-default brand.
  const [activeBrand, setActiveBrandState] = useState<BrandName>("Laura Mercier");

  useEffect(() => {
    const stored = window.localStorage.getItem(ACTIVE_BRAND_KEY);
    if (isBrandName(stored)) setActiveBrandState(stored);
  }, []);

  const setActiveBrand = (b: BrandName) => {
    setActiveBrandState(b);
    if (typeof window !== "undefined") window.localStorage.setItem(ACTIVE_BRAND_KEY, b);
  };
  return <BrandContext.Provider value={{ activeBrand, setActiveBrand }}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
