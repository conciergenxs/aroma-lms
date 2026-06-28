import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { modules, brands } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useRef } from "react";

export const Route = createFileRoute("/_authenticated/home")({
  component: HomePage,
});

function HomePage() {
  const railRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) =>
    railRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <div className="px-4 pt-4">
      <h1 className="font-serif text-3xl text-foreground">Good Morning, Bella!</h1>
      <p className="text-sm text-foreground/70 mt-1">Continue your beauty learning journey.</p>

      <div className="mt-5 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
        <input
          type="search"
          placeholder="Search module name to learn..."
          className="w-full bg-white rounded-full pl-11 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <div className="mt-7 flex items-center justify-between">
        <h2 className="font-serif text-xl">Learning Modules</h2>
        <Link to="/my-learning" className="text-xs font-bold tracking-widest text-brand underline-offset-4 underline">
          SEE ALL
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {modules.slice(0, 6).map((m) => (
          <ModuleCard key={m.id} module={m} />
        ))}
      </div>

      <Link
        to="/my-learning"
        className="mt-5 block text-center bg-brand text-white font-semibold tracking-widest text-sm py-4 rounded-full"
      >
        SEE ALL MODULES
      </Link>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-serif text-xl">Other Brands</h2>
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
        {brands.map((b) => (
          <div key={b.id} className="relative shrink-0 w-[78%] aspect-[16/10] rounded-2xl overflow-hidden snap-start">
            <img src={b.image} alt={b.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="font-serif text-2xl tracking-wide">{b.name}</div>
              <div className="text-xs mt-1 opacity-90">{b.count} Modules</div>
            </div>
          </div>
        ))}
      </div>

      <SiteFooter />
    </div>
  );
}
