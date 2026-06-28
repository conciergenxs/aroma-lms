import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { getModule } from "@/data/modules";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

export const Route = createFileRoute("/_authenticated/modules/$moduleId/cards/$cardId")({
  loader: ({ params }) => {
    const m = getModule(params.moduleId);
    if (!m) throw notFound();
    const idx = m.cards.findIndex((c) => c.id === params.cardId);
    if (idx === -1) throw notFound();
    return { module: m, cardIndex: idx };
  },
  component: KnowledgeDetail,
  notFoundComponent: () => <div className="p-8 text-center">Card not found</div>,
  errorComponent: () => <div className="p-8 text-center">Something went wrong</div>,
});

function completionKey(moduleId: string, cardId: string) {
  return `aroma:completed:${moduleId}:${cardId}`;
}

function KnowledgeDetail() {
  const { module: m, cardIndex } = Route.useLoaderData();
  const card = m.cards[cardIndex];
  const navigate = useNavigate();
  const cardBodyRef = useRef<HTMLDivElement>(null);
  const [completed, setCompleted] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const prevCard = cardIndex > 0 ? m.cards[cardIndex - 1] : null;
  const nextCard = cardIndex < m.cards.length - 1 ? m.cards[cardIndex + 1] : null;

  // Complete-read detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(completionKey(m.id, card.id));
    if (stored === "1") {
      setCompleted(true);
      return;
    }
    // Check if card body fits the viewport — if yes, mark complete immediately
    const el = cardBodyRef.current;
    if (!el) return;
    const fits = el.scrollHeight <= window.innerHeight * 0.7;
    if (fits) {
      window.localStorage.setItem(completionKey(m.id, card.id), "1");
      setCompleted(true);
      return;
    }
    // Otherwise, mark complete when user scrolls near bottom of page
    const onScroll = () => {
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (reachedBottom) {
        window.localStorage.setItem(completionKey(m.id, card.id), "1");
        setCompleted(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [m.id, card.id]);

  const goTo = (cardId: string, dir: 1 | -1) => {
    setDirection(dir);
    navigate({ to: "/modules/$moduleId/cards/$cardId", params: { moduleId: m.id, cardId } });
  };

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const offset = info.offset.x;
    if (offset < -80 && nextCard) goTo(nextCard.id, 1);
    else if (offset > 80 && prevCard) goTo(prevCard.id, -1);
  };

  const progress = completed ? 100 : 0;

  return (
    <div className="relative">
      {/* Hero image — full background, no gradient */}
      <div className="relative h-64 overflow-hidden">
        <img src={card.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <Link
          to="/modules/$moduleId"
          params={{ moduleId: m.id }}
          className="absolute top-3 left-4 inline-flex items-center gap-1 text-white drop-shadow text-sm font-medium"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Modules
        </Link>
      </div>

      {/* Congratulations banner (Complete Read) */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-brand text-white px-5 py-3 flex items-center gap-3"
          >
            <div className="h-8 w-8 rounded-full bg-tan flex items-center justify-center">
              <Check className="h-4 w-4 text-white" strokeWidth={3} />
            </div>
            <div>
              <div className="font-serif text-lg leading-tight">Congratulations!</div>
              <div className="text-xs opacity-90">You've finished this module.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipeable white card */}
      <div className="px-4 -mt-20 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={card.id}
            ref={cardBodyRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="bg-white rounded-2xl shadow-xl p-5 cursor-grab active:cursor-grabbing select-none"
          >
            <span className="inline-block text-[10px] font-bold tracking-widest bg-cream border border-brand/20 px-2.5 py-1 rounded-md text-foreground/80">
              KNOWLEDGE CARD {card.index}
            </span>
            <h1 className="font-serif text-3xl mt-3 leading-tight">{card.title}</h1>
            <div className="my-4 h-px bg-border" />
            <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-foreground/90">
              {card.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            {card.keyIngredients.length > 0 && (
              <>
                <div className="mt-5 font-semibold text-[15px]">Key Ingredients:</div>
                <ul className="list-disc pl-5 mt-1.5 space-y-1.5 text-[15px] text-foreground/90">
                  {card.keyIngredients.map((k, i) => (
                    <li key={i}><span className="font-bold">{k.name}</span> → {k.description}</li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tan progress band */}
      <div className="mt-10 bg-tan/90 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/40 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-white text-sm font-semibold">{progress}%</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          {prevCard ? (
            <button
              onClick={() => goTo(prevCard.id, -1)}
              className="bg-white text-brand font-semibold text-sm px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow"
            >
              <ChevronLeft className="h-4 w-4" /> Knowledge Card {prevCard.index}
            </button>
          ) : <span />}
          {nextCard ? (
            <button
              onClick={() => goTo(nextCard.id, 1)}
              className="bg-white text-brand font-semibold text-sm px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow"
            >
              Knowledge Card {nextCard.index} <ChevronRight className="h-4 w-4" />
            </button>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
