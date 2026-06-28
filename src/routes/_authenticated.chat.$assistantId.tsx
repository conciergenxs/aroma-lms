import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { ChevronLeft, History, MoreVertical, X, Mic } from "lucide-react";
import { useMemo, useState } from "react";
import { chatSessions, getSession, type ChatMessage } from "@/data/chat";
import { useNavHistory } from "@/lib/nav-history";
import aiLogo from "@/assets/ai-logo.svg.asset.json";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Conversation, ConversationContent } from "@/components/ai-elements/conversation";
import { MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

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

const initialTextToMarkdown = (text: string) => text.replace(/^• /gm, "- ");

function toUiMessage(message: ChatMessage): UIMessage {
  return {
    id: message.id,
    role: message.role,
    parts: [{ type: "text", text: initialTextToMarkdown(message.text) }],
  };
}

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function ChatRoom() {
  const { session } = Route.useLoaderData();
  const navigate = useNavigate();
  const { previousPath, previousLabel } = useNavHistory();
  const [showProduct, setShowProduct] = useState(!!session.product);
  const [historyOpen, setHistoryOpen] = useState(false);
  const initialMessages = useMemo(() => session.messages.map(toUiMessage), [session.id, session.messages]);
  const { messages, sendMessage, status, stop, error } = useChat({
    id: session.id,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { product: session.product?.name },
    }),
  });
  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="h-screen min-h-[667px] flex flex-col bg-card">
      <header className="h-[55px] shrink-0 bg-card border-b border-black/5 px-[14px] flex items-center justify-between">
        <button
          onClick={() => navigate({ to: previousPath as never })}
          className="inline-flex items-center gap-1.5 text-foreground font-serif text-[17px] font-bold"
        >
          <ChevronLeft className="h-5 w-5" /> <span>Back to {previousLabel}</span>
        </button>
        <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
          <SheetTrigger asChild>
            <button aria-label="Chat history" className="h-10 w-10 text-brand flex items-center justify-center">
              <History className="h-[25px] w-[25px]" strokeWidth={2.25} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card max-w-[320px]">
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
                  className={`w-full text-left p-3 rounded-xl border ${s.id === session.id ? "border-brand bg-brand/5" : "border-border bg-card"}`}
                >
                  <div className="font-medium text-sm">{s.title}</div>
                  <div className="text-xs text-foreground/60 mt-0.5">{s.lastTime}</div>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div className="h-[65px] shrink-0 bg-card border-b border-black/5 px-[15px] flex items-center gap-3">
        <div className="h-[37px] w-[37px] rounded-full bg-[#df5b64] flex items-center justify-center overflow-hidden">
          <img src={aiLogo.url} alt="" className="h-6 w-6 brightness-0 invert" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-[15px] leading-tight">Aroma Abadi BA-Helper</div>
          <div className="text-xs text-foreground/40 mt-0.5">online</div>
        </div>
        <button aria-label="More" className="text-tan"><MoreVertical className="h-5 w-5" /></button>
      </div>

      <Conversation>
        <ConversationContent className="px-[14px] py-[10px] space-y-2.5">
          {showProduct && session.product && (
            <div className="relative ml-auto mr-0 w-[278px] bg-peach rounded-[5px] p-2 pr-7 flex items-center gap-3 rounded-br-[14px]">
              <img src={session.product.image} alt="" className="h-[78px] w-[78px] rounded-lg object-cover bg-card" width={300} height={300} />
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-bold tracking-tight leading-none">LAURA MERCIER</div>
                <div className="text-[7px] tracking-[0.18em] text-foreground/75 leading-none mt-0.5">PARIS | NEW YORK</div>
                <div className="font-serif text-[17px] leading-[1.04] mt-2">{session.product.name}</div>
              </div>
              <button onClick={() => setShowProduct(false)} aria-label="Dismiss" className="absolute top-2.5 right-2.5 text-tan">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {messages.map((m, index) => {
            const text = getMessageText(m);
            return (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[278px] rounded-[5px] px-3 py-2.5 text-[15px] leading-[1.46] ${
                    m.role === "user"
                      ? "bg-peach text-foreground rounded-br-[14px]"
                      : "bg-[#f5f5f5] text-foreground rounded-bl-[14px] shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
                  }`}
                >
                  {text ? <MessageResponse>{text}</MessageResponse> : <Shimmer>Thinking...</Shimmer>}
                  <div className="text-[11px] text-foreground/18 text-right mt-1.5">
                    {session.messages[index]?.time ?? new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            );
          })}
          {error && <div className="text-xs text-brand px-2">AI sedang bermasalah. Coba kirim ulang sebentar lagi.</div>}
        </ConversationContent>
      </Conversation>

      <div className="shrink-0 bg-[#f4f4f4] px-[10px] pt-2 pb-1">
        <PromptInput
          onSubmit={({ text }) => sendMessage({ text }, { body: { product: session.product?.name } })}
          className="gap-2"
        >
          <PromptInputTextarea placeholder="Message" className="min-h-[46px] rounded-full border border-black/10 bg-card shadow-sm text-[15px]" />
          <button
            type="button"
            aria-label={busy ? "Stop response" : "Voice message"}
            onClick={() => { if (busy) void stop(); }}
            className="h-[46px] w-[46px] rounded-full bg-brand text-brand-foreground flex items-center justify-center shrink-0"
          >
            <Mic className="h-5 w-5" />
          </button>
        </PromptInput>
        <div className="mt-[15px] mx-auto h-1 w-[134px] bg-foreground/35 rounded-full" />
      </div>
    </div>
  );
}
