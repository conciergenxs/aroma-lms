import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SlidersHorizontal, Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories as allCategories, brands as allBrands } from "@/data/modules";
import {
  EMPTY_FILTERS,
  activeFilterCount,
  type StatusFilter,
  type SortKey,
  type FilterState,
} from "@/lib/search";

const chip = (active: boolean) =>
  `shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
    active
      ? "border-brand bg-brand text-white"
      : "border-brand/30 bg-card text-brand hover:bg-brand/10"
  }`;

/**
 * The row above the results: quick status chips that narrow in one tap, and a sheet for the
 * rest. Everything here is optional — the results are already on screen before any of it is
 * touched, which is the point of dropping the old mandatory tabs.
 */
export function SearchFilters({
  value,
  onChange,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<FilterState>(value);
  // The four status chips do not fit a phone width. They scroll, but a chip sliced by the
  // edge reads as broken rather than as "there is more" — so fade the edge while there is
  // more, and drop the fade once the row is scrolled out.
  const [atEnd, setAtEnd] = useState(false);
  const onRowScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  const statuses: { key: StatusFilter; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "not-started", label: t("filterNotStarted") },
    { key: "in-progress", label: t("filterInProgress") },
    { key: "completed", label: t("filterCompleted") },
  ];
  const sorts: { key: SortKey; label: string }[] = [
    { key: "relevance", label: t("sortRelevance") },
    { key: "progress-desc", label: t("sortProgressDesc") },
    { key: "progress-asc", label: t("sortProgressAsc") },
    { key: "title", label: t("sortTitle") },
  ];

  const toggle = (list: string[], v: string) =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  const count = activeFilterCount(value);

  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="relative min-w-0 flex-1">
        <div
          onScroll={onRowScroll}
          className="flex gap-2 overflow-x-auto scrollbar-none snap-x scroll-px-1"
        >
          {statuses.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => onChange({ ...value, status: s.key })}
              className={`${chip(value.status === s.key)} snap-start`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {!atEnd && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream to-transparent"
          />
        )}
      </div>

      <Sheet
        open={open}
        onOpenChange={(next) => {
          if (next) setDraft(value);
          setOpen(next);
        }}
      >
        <SheetTrigger
          className={`relative shrink-0 rounded-full border px-3 py-2 transition-colors ${
            count > 0 ? "border-brand bg-brand text-white" : "border-brand/30 bg-card text-brand"
          }`}
          aria-label={t("filterTitle")}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 text-[11px] font-semibold text-white">
              {count}
            </span>
          )}
        </SheetTrigger>

        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="font-serif text-[20px] font-medium">
              {t("filterTitle")}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-5 space-y-6 pb-2">
            <section>
              <h3 className="text-[13px] font-semibold text-foreground/70">{t("sortBy")}</h3>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {sorts.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setDraft({ ...draft, sort: s.key })}
                    className={chip(draft.sort === s.key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[13px] font-semibold text-foreground/70">
                {t("filterCategory")}
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {allCategories.map((c) => {
                  const on = draft.categoryIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() =>
                        setDraft({ ...draft, categoryIds: toggle(draft.categoryIds, c.id) })
                      }
                      className={chip(on)}
                    >
                      {on && <Check className="mr-1 inline h-3.5 w-3.5" />}
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <h3 className="text-[13px] font-semibold text-foreground/70">{t("filterBrand")}</h3>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {allBrands.map((b) => {
                  const on = draft.brands.includes(b.name);
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setDraft({ ...draft, brands: toggle(draft.brands, b.name) })}
                      className={chip(on)}
                    >
                      {on && <Check className="mr-1 inline h-3.5 w-3.5" />}
                      {b.name}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="sticky bottom-0 -mx-6 mt-2 flex gap-3 border-t border-border bg-card px-6 py-4">
            <button
              type="button"
              onClick={() => setDraft(EMPTY_FILTERS)}
              className="rounded-full border border-brand/40 px-5 py-3 text-[13px] font-semibold text-brand transition-colors hover:bg-brand/10"
            >
              {t("resetFilter")}
            </button>
            <button
              type="button"
              onClick={() => {
                onChange(draft);
                setOpen(false);
              }}
              className="flex-1 rounded-full bg-brand py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-foreground transition-all hover:brightness-110 active:scale-[0.99]"
            >
              {t("applyFilter")}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
