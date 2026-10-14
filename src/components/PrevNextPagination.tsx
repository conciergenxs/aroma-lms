import { useI18n } from "@/lib/i18n";

export function PrevNextPagination({
  page,
  totalPages,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { t } = useI18n();
  if (totalPages <= 1) return null;

  // The buttons sit under the list, so changing page without this leaves the reader at the
  // bottom of a list they have not seen the start of.
  const go = (fn: () => void) => {
    fn();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        onClick={() => go(onPrev)}
        disabled={page === 1}
        className="px-5 py-2.5 rounded-full border border-brand/40 text-brand text-sm font-semibold tracking-wide disabled:opacity-30 disabled:pointer-events-none hover:bg-brand hover:text-white transition-colors"
      >
        {t("prevPage")}
      </button>
      <button
        onClick={() => go(onNext)}
        disabled={page === totalPages}
        className="px-5 py-2.5 rounded-full border border-brand/40 text-brand text-sm font-semibold tracking-wide disabled:opacity-30 disabled:pointer-events-none hover:bg-brand hover:text-white transition-colors"
      >
        {t("nextPage")}
      </button>
    </div>
  );
}
