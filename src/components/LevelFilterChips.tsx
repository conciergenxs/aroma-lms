import { useI18n } from "@/lib/i18n";
import type { Module } from "@/data/modules";

// Which "level" of module a filtered grid is showing. Maps 1:1 onto Module.level,
// except "product" stands in for the implicit level === undefined (SKU/product)
// modules — an explicit string literal so it works cleanly as button/state value
// instead of undefined.
export type ModuleLevelFilter = "brand" | "category" | "product";

// Sensible default everywhere this filter appears: "product" is the pre-existing
// behavior (the original ~70 SKU modules) and the largest, most relevant set.
export const DEFAULT_LEVEL: ModuleLevelFilter = "product";

export const matchesLevel = (m: Module, level: ModuleLevelFilter): boolean =>
  level === "product" ? !m.level : m.level === level;

export function LevelFilterChips({
  value,
  onChange,
  includeBrand = true,
}: {
  value: ModuleLevelFilter;
  onChange: (level: ModuleLevelFilter) => void;
  // Category Details has no brand-scoped content by definition — pass false there
  // to render a 2-way Category/Product control instead of the default 3-way one.
  includeBrand?: boolean;
}) {
  const { t } = useI18n();
  const options: { value: ModuleLevelFilter; label: string }[] = [
    ...(includeBrand ? [{ value: "brand" as const, label: t("chipBrand") }] : []),
    { value: "category" as const, label: t("chipCategory") },
    { value: "product" as const, label: t("chipProduct") },
  ];
  // A single continuous track (one "switch"), not separate floating pills —
  // the active segment gets a solid fill, inactive segments sit flush beside
  // it inside the same rounded, padded container.
  return (
    <div
      className={`grid ${includeBrand ? "grid-cols-3" : "grid-cols-2"} gap-1 bg-tan/15 rounded-full p-1`}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`w-full h-9 rounded-full text-[13px] font-semibold tracking-wide transition-colors ${
              active ? "bg-brand text-white shadow-sm" : "text-brand hover:bg-brand/10"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
