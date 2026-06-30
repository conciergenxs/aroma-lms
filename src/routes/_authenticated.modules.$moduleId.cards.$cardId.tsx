import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getModule } from "@/data/modules";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
// AnimatePresence kept for card slide transitions
import { SiteFooter } from "@/components/layout/SiteFooter";

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
    const markComplete = () => {
      window.localStorage.setItem(completionKey(m.id, card.id), "1");
      setCompleted(true);
    };

    const checkCompletion = () => {
      const el = cardBodyRef.current;
      const reachedCardEnd = el ? el.getBoundingClientRect().bottom <= window.innerHeight - 32 : false;
      const reachedPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (reachedCardEnd || reachedPageBottom) {
        markComplete();
        window.removeEventListener("scroll", checkCompletion);
        window.removeEventListener("wheel", checkCompletion);
        window.removeEventListener("touchend", checkCompletion);
      }
    };

    const initialCheck = window.setTimeout(checkCompletion, 350);
    window.addEventListener("scroll", checkCompletion, { passive: true });
    window.addEventListener("wheel", checkCompletion, { passive: true });
    window.addEventListener("touchend", checkCompletion, { passive: true });
    return () => {
      window.clearTimeout(initialCheck);
      window.removeEventListener("scroll", checkCompletion);
      window.removeEventListener("wheel", checkCompletion);
      window.removeEventListener("touchend", checkCompletion);
    };
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
    <div className="relative bg-cream">
      <div className="relative h-[211px] overflow-hidden">
        <img src={card.image} alt="" className="absolute inset-0 w-full h-full object-cover" width={1024} height={768} />
        <Link
          to="/modules/$moduleId"
          params={{ moduleId: m.id }}
          className="absolute top-[31px] left-[14px] inline-flex items-center gap-1 text-white drop-shadow text-[15px] font-semibold"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Modules
        </Link>
      </div>

      <div className="px-[15px] -mt-[147px] relative z-10 overflow-visible">
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
            className="bg-card rounded-xl border border-border p-[15px] pb-[18px] cursor-grab active:cursor-grabbing select-none shadow-sm min-h-[408px]"
          >
            <span className="inline-block text-[12px] uppercase bg-card border border-[#dfc9b8] px-2.5 py-1 rounded-md text-tan leading-none">
              KNOWLEDGE CARD {card.index}
            </span>
            <h1 className="font-serif text-[27px] font-medium mt-4 leading-[1.17]">{card.title}</h1>
            <div className="my-4 h-px bg-border" />
            <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-[1.6] text-foreground/90">
              {card.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
            </ul>
            {card.keyIngredients.length > 0 && (
              <>
                <div className="mt-6 font-bold text-[15px]">Key Ingredients:</div>
                <ul className="list-disc pl-5 mt-1.5 space-y-1.5 text-[15px] leading-[1.6] text-foreground/90">
                  {card.keyIngredients.map((k: { name: string; description: string }, i: number) => (
                    <li key={i}><span className="font-bold">{k.name}</span> → {k.description}</li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-[104px] bg-tan px-[15px] py-[14px]">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-[5px] bg-white/35 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-white text-[15px] font-bold">{progress}%</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          {prevCard ? (
            <button
              onClick={() => goTo(prevCard.id, -1)}
              className="bg-card text-brand font-semibold text-[13px] px-2.5 py-2 rounded-md inline-flex items-center gap-1 shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" /> Knowledge Card {prevCard.index}
            </button>
          ) : <span />}
          {nextCard ? (
            <button
              onClick={() => goTo(nextCard.id, 1)}
              className="bg-card text-brand font-semibold text-[13px] px-2.5 py-2 rounded-md inline-flex items-center gap-1 shadow-sm"
            >
              Knowledge Card {nextCard.index} <ChevronRight className="h-4 w-4" />
            </button>
          ) : <span />}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
