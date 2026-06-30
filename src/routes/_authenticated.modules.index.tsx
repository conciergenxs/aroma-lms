import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { modules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { z } from "zod";

const searchSchema = z.object({
  brand: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/modules/")({
  validateSearch: searchSchema,
  component: AllModulesPage,
});

const PAGE_SIZE = 10;

function AllModulesPage() {
  const { brand } = Route.useSearch();
  const [page, setPage] = useState(1);

  const filtered = brand
    ? modules.filter((m) => m.brand.toLowerCase() === brand.toLowerCase())
    : modules;

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  return (
    <>
      <div className="px-[14px] pt-[28px]">
        <Link to="/home" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> Back to Home
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">
          {brand ? brand : "All Modules"}
        </h1>
        {total === 0 ? (
          <p className="text-[15px] text-foreground/75 mt-3">No modules available for this brand yet.</p>
        ) : (
          <p className="text-[15px] text-foreground/75 mt-3">
            Showing {start + 1}–{Math.min(start + PAGE_SIZE, total)} of {total} modules
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          {items.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <ModuleCard module={m} />
            </motion.div>
          ))}
        </div>

        {pages > 1 && (
          <>
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-9 w-9 rounded-full border border-brand/40 text-brand flex items-center justify-center disabled:opacity-30 hover:bg-brand hover:text-white transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: pages }).map((_, i) => {
                const p = i + 1;
                const active = p === page;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-9 w-9 rounded-full text-sm font-semibold transition-colors ${
                      active ? "bg-brand text-white" : "border border-brand/30 text-brand hover:bg-brand/10"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="h-9 w-9 rounded-full border border-brand/40 text-brand flex items-center justify-center rotate-180 disabled:opacity-30 hover:bg-brand hover:text-white transition-colors"
                aria-label="Next page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-foreground/60">
              Page {page} of {pages} · {total} modules total
            </p>
          </>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
