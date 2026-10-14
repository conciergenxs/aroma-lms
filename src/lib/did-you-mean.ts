import type { Module } from "@/data/modules";

// Words that appear in half the titles and would match almost anything.
const STOPWORDS = new Set([
  "dan",
  "untuk",
  "yang",
  "dengan",
  "dari",
  "pada",
  "atau",
  "ini",
  "itu",
  "the",
  "and",
  "for",
  "with",
  "your",
  "you",
]);

const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase());

/**
 * Levenshtein distance, with an early exit: we only care whether two words are within a
 * couple of edits of each other, so anything wildly different can bail immediately.
 */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 3) return Infinity;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

/** Every term a search could legitimately have been aiming at, drawn from the real data. */
function buildVocabulary(pool: Module[]): string[] {
  const seen = new Map<string, string>(); // lowercased key -> how to display it
  const add = (term: string) => {
    const key = term.toLowerCase();
    if (key.length < 4 || STOPWORDS.has(key)) return;
    if (!seen.has(key)) seen.set(key, term);
  };
  for (const m of pool) {
    add(titleCase(m.category));
    // The house brand sits on every level module and would match nearly anything.
    if (m.brand !== "PT Aroma Abadi") add(m.brand);
    for (const word of m.title.split(/[\s—–\-,.()/&]+/)) add(word);
  }
  return [...seen.values()];
}

/**
 * Terms close enough to `query` to be worth offering as "did you mean". Returns an empty
 * list when nothing is near it — a wrong guess is worse than no guess.
 */
export function didYouMean(query: string, pool: Module[], limit = 3): string[] {
  const q = query.trim().toLowerCase();
  if (q.length < 3) return [];
  return (
    buildVocabulary(pool)
      .map((term) => ({ term, distance: editDistance(q, term.toLowerCase()) }))
      // Allow a longer word to be further off, but never more than three edits: past that
      // the "suggestion" stops resembling what was typed.
      .filter(
        ({ term, distance }) => distance <= Math.min(3, Math.max(1, Math.floor(term.length / 3))),
      )
      .sort((a, b) => a.distance - b.distance || a.term.length - b.term.length)
      .slice(0, limit)
      .map(({ term }) => term)
  );
}
