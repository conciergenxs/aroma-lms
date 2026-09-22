import { create } from "zustand";
import { chatSessions as seedSessions, type ChatSession } from "@/data/chat";

const STORAGE_KEY = "aroma:chatSessions";

/** Ids this app mints for a brand-new chat (crypto.randomUUID). */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const isNewChatId = (id: string) => UUID_RE.test(id);

export const NEW_CHAT_INTRO =
  "Halo! Aku **Aroma Abadi BA-Helper**. Tanyakan apa saja seputar produk, tips beauty, atau training kamu di sini ✨";

export function createNewChatSession(id: string, time: string): ChatSession {
  return {
    id,
    title: "Chat Baru",
    lastTime: "Now",
    messages: [{ id: `${id}-intro`, role: "assistant", time, text: NEW_CHAT_INTRO }],
  };
}

function readStored(): ChatSession[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return Array.isArray(parsed) ? (parsed as ChatSession[]) : [];
  } catch {
    return [];
  }
}

function writeStored(sessions: ChatSession[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // Storage can be unavailable (private mode) or full — the in-memory copy
    // still works for this tab, it just won't survive a reload.
  }
}

type ChatStoreState = {
  sessions: ChatSession[];
  hydrated: boolean;
  /** Pull persisted sessions in. No-op on the server and after the first call. */
  hydrate: () => void;
  getSession: (id: string) => ChatSession | undefined;
  /** Add a session if new, or overwrite it in place if the id already exists. */
  saveSession: (session: ChatSession) => void;
};

export const useChatStore = create<ChatStoreState>((set, get) => ({
  // Seeds only to start: this module is evaluated during SSR too, where there is
  // no localStorage, so stored sessions are merged in after mount via hydrate()
  // rather than here — that keeps the server and first client render identical.
  sessions: seedSessions,
  hydrated: false,
  hydrate: () => {
    if (get().hydrated || typeof window === "undefined") return;
    const stored = readStored();
    const storedIds = new Set(stored.map((s) => s.id));
    set({
      sessions: [...stored, ...seedSessions.filter((s) => !storedIds.has(s.id))],
      hydrated: true,
    });
  },
  getSession: (id) => get().sessions.find((s) => s.id === id),
  saveSession: (session) =>
    set((state) => {
      const exists = state.sessions.some((s) => s.id === session.id);
      const sessions = exists
        ? state.sessions.map((s) => (s.id === session.id ? session : s))
        : [session, ...state.sessions];
      writeStored(sessions);
      return { sessions };
    }),
}));
