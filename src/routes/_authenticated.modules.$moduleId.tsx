import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getModule, modules, type ModuleStatus, type KnowledgeCard } from "@/data/modules";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ModuleCard } from "@/components/ModuleCard";
import { useRef } from "react";

export const Route = createFileRoute("/_authenticated/modules/$moduleId")({
  loader: ({ params }) => {
    const m = getModule(params.moduleId);
    if (!m) throw notFound();
    return { module: m };
  },
  component: ModuleDetail,
  notFoundComponent: () => <div className="p-8 text-center">Module not found</div>,
  errorComponent: () => <div className="p-8 text-center">Something went wrong</div>,
});

const statusStyle: Record<ModuleStatus, string> = {
  "not-started": "bg-foreground/15 text-foreground/70",
  "in-progress": "bg-tan/30 text-tan",
  "completed": "bg-brand/15 text-brand",
};
const statusLabel: Record<ModuleStatus, string> = {
  "not-started": "NOT STARTED",
  "in-progress": "IN PROGRESS",
  "completed": "COMPLETED",
};

function ModuleDetail() {
  const { module: m } = Route.useLoaderData();
  const pct = Math.round((m.completed / m.total) * 1000) / 10;
  const railRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) => railRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  const others = modules.filter((x) => x.id !== m.id);

  return (
    <div className="px-[14px] pt-5">
      <Link to="/home" className="inline-flex items-center text-sm text-brand font-semibold">
        <ChevronLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="mt-4 bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 p-3">
          <img src={m.image} alt="" className="h-20 w-20 rounded-lg object-cover" width={1024} height={1024} />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] tracking-wider text-tan font-semibold">{m.category}</div>
            <div className="font-serif text-xl leading-tight mt-1">{m.title}</div>
            <div className="text-xs text-brand font-semibold mt-2">{m.completed}/{m.total} Cards completed</div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-rose-line rounded-full overflow-hidden">
                <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs font-semibold text-brand">{pct}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {m.cards.map((c: KnowledgeCard) => (
          <Link
            key={c.id}
            to="/modules/$moduleId/cards/$cardId"
            params={{ moduleId: m.id, cardId: c.id }}
            className="block bg-card rounded-lg border border-border shadow-sm overflow-hidden"
          >
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest bg-card px-2.5 py-1 rounded-md text-tan border border-[#dfc9b8]">
                  KNOWLEDGE CARD {c.index}
                </span>
                <span className={`text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md ${statusStyle[c.status]}`}>
                  {statusLabel[c.status]}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-rose-line rounded-full overflow-hidden">
                  <div className="h-full bg-brand" style={{ width: `${c.progress}%` }} />
                </div>
                <span className="text-[11px] font-semibold text-brand">{c.progress}%</span>
              </div>
            </div>
            <div className="aspect-[16/8] bg-cream/60">
              <img src={c.image} alt="" className="w-full h-full object-cover" loading="lazy" width={1024} height={768} />
            </div>
            <div className="px-3 py-3">
              <div className="font-serif text-lg">{c.title}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-serif text-xl">Other Modules</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} aria-label="Previous" className="h-8 w-8 rounded-full border border-brand/30 text-brand flex items-center justify-center">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next" className="h-8 w-8 rounded-full border border-brand/30 text-brand flex items-center justify-center">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={railRef} className="mt-3 flex gap-3 overflow-x-auto scrollbar-none snap-x">
        {others.map((o) => (
          <div key={o.id} className="shrink-0 w-[48%] snap-start">
            <ModuleCard module={o} />
          </div>
        ))}
      </div>

      <SiteFooter />
    </div>
  );
}
