import type { Module, KnowledgeCard } from "@/data/modules";

const norm = (s: string) => s.toLowerCase();
const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase());

/** Where a module turned up, so a result can say why it is in the list. */
export type SearchHit = {
  module: Module;
  /** 0 title, 1 brand/category, 2 inside the knowledge cards. Lower sorts first. */
  rank: number;
  /** The text that matched, when it wasn't the module's own title. */
  matchedIn: string | null;
};

/** Everything written inside a knowledge card — what a BA actually learns from it. */
function cardText(card: KnowledgeCard): string[] {
  return [
    card.title,
    ...card.bullets,
    ...card.keyIngredients.flatMap((i) => [i.name, i.description]),
    card.learningFocus ?? "",
    card.baScript ?? "",
    ...(card.qa ?? []).flatMap((entry) => [entry.q, entry.a]),
  ];
}

/**
 * Searches a module by everything it contains, not just its cover. "argan" lives in one
 * knowledge card's ingredient list, so a title-only search finds nothing for it and the BA
 * is left browsing categories by hand — which is exactly the complaint.
 */
function findMatch(m: Module, q: string): SearchHit | null {
  if (norm(m.title).includes(q)) return { module: m, rank: 0, matchedIn: null };
  if (norm(m.brand).includes(q)) return { module: m, rank: 1, matchedIn: m.brand };
  if (norm(m.category).includes(q)) return { module: m, rank: 1, matchedIn: titleCase(m.category) };

  for (const card of m.cards) {
    // An ingredient name is the most quotable reason, so it wins over a looser body match.
    const ingredient = card.keyIngredients.find((i) => norm(i.name).includes(q));
    if (ingredient) return { module: m, rank: 2, matchedIn: ingredient.name };
    if (norm(card.title).includes(q)) return { module: m, rank: 2, matchedIn: card.title };
    if (cardText(card).some((t) => norm(t).includes(q))) {
      return { module: m, rank: 2, matchedIn: card.title };
    }
  }
  return null;
}

export function searchModules(query: string, pool: Module[]): SearchHit[] {
  const q = norm(query.trim());
  if (!q) return [];
  return pool
    .map((m) => findMatch(m, q))
    .filter((hit): hit is SearchHit => hit !== null)
    .sort((a, b) => a.rank - b.rank || a.module.title.localeCompare(b.module.title));
}

// ─── filters and sorting, applied after the search ──────────────────────────────

export type StatusFilter = "all" | "not-started" | "in-progress" | "completed";
export type SortKey = "relevance" | "progress-desc" | "progress-asc" | "title";

export const statusOf = (m: Module): Exclude<StatusFilter, "all"> =>
  m.completed === 0 ? "not-started" : m.completed >= m.total ? "completed" : "in-progress";

const pct = (m: Module) => (m.total > 0 ? m.completed / m.total : 0);

export function applyFilters(
  hits: SearchHit[],
  {
    status,
    categoryIds,
    brands,
  }: { status: StatusFilter; categoryIds: string[]; brands: string[] },
): SearchHit[] {
  return hits.filter(({ module: m }) => {
    if (status !== "all" && statusOf(m) !== status) return false;
    if (categoryIds.length > 0 && !categoryIds.includes(m.categoryId)) return false;
    if (brands.length > 0 && !brands.includes(m.brand)) return false;
    return true;
  });
}

export function applySort(hits: SearchHit[], sort: SortKey): SearchHit[] {
  if (sort === "relevance") return hits;
  const sorted = [...hits];
  if (sort === "title") sorted.sort((a, b) => a.module.title.localeCompare(b.module.title));
  if (sort === "progress-desc") sorted.sort((a, b) => pct(b.module) - pct(a.module));
  if (sort === "progress-asc") sorted.sort((a, b) => pct(a.module) - pct(b.module));
  return sorted;
}
