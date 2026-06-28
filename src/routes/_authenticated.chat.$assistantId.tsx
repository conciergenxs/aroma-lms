import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { ChevronLeft, History, MoreVertical, X, Mic } from "lucide-react";
import { useState } from "react";
import { chatSessions, getSession, type ChatMessage } from "@/data/chat";
import { useNavHistory } from "@/lib/nav-history";
import aiLogo from "@/assets/ai-logo.svg.asset.json";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/_authenticated/chat/$assistantId")({
  loader: ({ params }) => {
    const s = getSession(params.assistantId);
    if (!s) throw notFound();
    return { session: s };
  },
  component: ChatRoom,
  notFoundComponent: () => <div className="p-8 text-center">Chat not found</div>,
  errorComponent: () => <div className="p-8 text-center">Something went wrong</div>,
});

function formatBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**")
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>
  );
}

function renderMessageText(text: string) {
  // Split lines, detect bullet "• " starts
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("• ")) {
      return (
        <div key={i} className="flex gap-2">
          <span>•</span>
          <span>{formatBold(line.slice(2))}</span>
        </div>
      );
    }
    return <div key={i}>{formatBold(line)}</div>;
  });
}

function ChatRoom() {
  const { session } = Route.useLoaderData();
  const navigate = useNavigate();
  const { previousPath, previousLabel } = useNavHistory();
  const [showProduct, setShowProduct] = useState(!!session.product);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Chat top nav */}
      <header className="bg-white border-b border-black/5 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate({ to: previousPath as never })}
          className="inline-flex items-center gap-1 text-foreground font-medium"
        >
          <ChevronLeft className="h-5 w-5" /> <span>Back to {previousLabel}</span>
        </button>
        <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
          <SheetTrigger asChild>
            <button aria-label="Chat history" className="h-9 w-9 rounded-full border border-brand text-brand flex items-center justify-center">
              <History className="h-4 w-4" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white">
            <SheetHeader>
              <SheetTitle className="font-serif text-2xl">Chat History</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              {chatSessions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setHistoryOpen(false);
                    navigate({ to: "/chat/$assistantId", params: { assistantId: s.id } });
                  }}
                  className={`w-full text-left p-3 rounded-xl border ${s.id === session.id ? "border-brand bg-brand/5" : "border-border"}`}
                >
                  <div className="font-medium text-sm">{s.title}</div>
                  <div className="text-xs text-foreground/60 mt-0.5">{s.lastTime}</div>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Assistant header strip */}
      <div className="mx-3 mt-3 bg-white border border-black/5 rounded-xl shadow-sm px-3 py-2.5 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center overflow-hidden">
          <img src={aiLogo.url} alt="" className="h-7 w-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">Aroma Abadi BA-Helper</div>
          <div className="text-xs text-foreground/50">online</div>
        </div>
        <button aria-label="More" className="text-foreground/50"><MoreVertical className="h-5 w-5" /></button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {showProduct && session.product && (
          <div className="relative bg-peach rounded-2xl p-3 pr-9 flex items-center gap-3">
            <img src={session.product.image} alt="" className="h-16 w-16 rounded-lg object-cover bg-white" />
            <div className="flex-1">
              <div className="text-xs font-bold tracking-wider">{session.product.brand}</div>
              <div className="text-[10px] tracking-widest text-foreground/60">PARIS · NEW YORK</div>
              <div className="font-serif text-lg leading-tight mt-1">{session.product.name}</div>
            </div>
            <button onClick={() => setShowProduct(false)} aria-label="Dismiss" className="absolute top-2 right-2 text-foreground/60">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {session.messages.map((m: ChatMessage) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-peach text-foreground rounded-tr-sm"
                  : "bg-[#f1f1f1] text-foreground rounded-tl-sm"
              }`}
            >
              <div className="space-y-1">{renderMessageText(m.text)}</div>
              <div className="text-[10px] text-foreground/40 text-right mt-2">{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Composer */}
      <div className="border-t border-black/5 bg-[#f5f5f5] px-3 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Message"
            className="flex-1 bg-white rounded-full px-4 py-3 text-sm focus:outline-none"
          />
          <button aria-label="Voice message" className="h-11 w-11 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
            <Mic className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 mx-auto h-1 w-32 bg-foreground/30 rounded-full" />
      </div>
    </div>
  );
}
