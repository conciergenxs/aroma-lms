import { createContext, useContext, useState, type ReactNode } from "react";

export const ALL_BRANDS = ["Laura Mercier", "Dolce & Gabbana", "bareMinerals", "Rimmel", "Sisley"] as const;
export type BrandName = typeof ALL_BRANDS[number];

interface BrandCtx { activeBrand: BrandName; setActiveBrand: (b: BrandName) => void; }
const BrandContext = createContext<BrandCtx | null>(null);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [activeBrand, setActiveBrandState] = useState<BrandName>(() =>
    typeof window !== "undefined" ? ((localStorage.getItem("aroma:activeBrand") as BrandName) ?? "Laura Mercier") : "Laura Mercier"
  );
  const setActiveBrand = (b: BrandName) => {
    setActiveBrandState(b);
    if (typeof window !== "undefined") localStorage.setItem("aroma:activeBrand", b);
  };
  return <BrandContext.Provider value={{ activeBrand, setActiveBrand }}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
