import React from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { getModule } from "@/data/modules";
import { useI18n } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
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
  notFoundComponent: () => <div className="p-8 text-center">Kartu tidak ditemukan</div>,
  errorComponent: () => <div className="p-8 text-center">Terjadi kesalahan</div>,
});

function completionKey(moduleId: string, cardId: string) {
  return `aroma:completed:${moduleId}:${cardId}`;
}

function allCardsCompleted(moduleId: string, cards: { id: string }[]) {
  return cards.every((c) => window.localStorage.getItem(completionKey(moduleId, c.id)) === "1");
}

function KnowledgeDetail() {
  const { module: m, cardIndex } = Route.useLoaderData();
  const card = m.cards[cardIndex];
  const navigate = useNavigate();
  const cardBodyRef = useRef<HTMLDivElement>(null);
  const [completed, setCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const { t } = useI18n();
  const isLastCard = cardIndex === m.cards.length - 1;
  const prevCard = cardIndex > 0 ? m.cards[cardIndex - 1] : null;
  const nextCard = !isLastCard ? m.cards[cardIndex + 1] : null;

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
      // Show modal only on last card and only when all cards are now done
      if (isLastCard && allCardsCompleted(m.id, m.cards)) {
        setShowModal(true);
      }
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
  }, [m.id, card.id, isLastCard, m.cards]);

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
    <div className="relative bg-cream" style={{ "--floating-ai-bottom": "85px" } as React.CSSProperties}>
      {/* Congratulations Modal — shown only after all cards in module are read */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-6 rounded-2xl bg-white text-ink px-8 py-10 flex flex-col items-center text-center shadow-2xl"
            >
              <div className="h-[72px] w-[72px] rounded-full bg-[#c9a455]/15 flex items-center justify-center mb-5">
                <Check className="h-10 w-10 text-[#c9a455]" strokeWidth={3} />
              </div>
              <div className="font-serif text-[28px] font-bold leading-tight text-ink">{t("congratsTitle")}</div>
              <div className="mt-2 text-[15px] text-ink/60 leading-relaxed">
                {t("congratsDesc")}
              </div>
              <div className="mt-8 flex flex-col gap-3 w-full">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full px-8 py-3 rounded-full bg-[#6b0f1a] text-white font-semibold text-[15px] hover:brightness-110 transition-all"
                >
                  {t("finish")}
                </button>
                <button
                  onClick={() => { setShowModal(false); navigate({ to: "/modules" }); }}
                  className="w-full px-8 py-3 rounded-full border-2 border-[#6b0f1a] text-[#6b0f1a] font-semibold text-[15px] hover:bg-[#6b0f1a]/5 transition-all"
                >
                  {t("exploreOtherModule")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[211px] overflow-hidden">
        <img src={card.image} alt="" className="absolute inset-0 w-full h-full object-cover" width={1024} height={768} />
        <Link
          to="/modules/$moduleId"
          params={{ moduleId: m.id }}
          className="absolute top-[31px] left-[14px] inline-flex items-center gap-1 text-white drop-shadow text-[15px] font-semibold"
        >
          <ChevronLeft className="h-4 w-4" /> {t("backToModules")}
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
              {t("knowledgeCardLabel")} {card.index}
            </span>
            <h1 className="font-serif text-[27px] font-medium mt-4 leading-[1.17]">{card.title}</h1>
            <div className="my-4 h-px bg-border" />
            <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-[1.6] text-foreground/90">
              {card.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
            </ul>
            {card.keyIngredients.length > 0 && (
              <>
                <div className="mt-6 font-bold text-[15px]">{t("keyIngredients")}:</div>
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

      {/* Spacer so content isn't hidden behind fixed nav */}
      <div className="h-[90px]" />
      <SiteFooter />

      {/* Sticky card navigation — sits above bottom navbar */}
      <div className="fixed bottom-[70px] left-0 right-0 z-30 bg-tan px-[15px] py-[14px] pb-[19px] shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
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
              <ChevronLeft className="h-4 w-4" /> {t("knowledgeCard")} {prevCard.index}
            </button>
          ) : <span />}
          {nextCard ? (
            <button
              onClick={() => goTo(nextCard.id, 1)}
              className="bg-card text-brand font-semibold text-[13px] px-2.5 py-2 rounded-md inline-flex items-center gap-1 shadow-sm"
            >
              {t("knowledgeCard")} {nextCard.index} <ChevronRight className="h-4 w-4" />
            </button>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
