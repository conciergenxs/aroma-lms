import { create } from "zustand";
import { chatSessions as seedSessions, type ChatSession } from "@/data/chat";

type ChatStoreState = {
  sessions: ChatSession[];
  getSession: (id: string) => ChatSession | undefined;
  /** Add a session if new, or overwrite it in place if the id already exists. */
  saveSession: (session: ChatSession) => void;
};

export const useChatStore = create<ChatStoreState>((set, get) => ({
  sessions: seedSessions,
  getSession: (id) => get().sessions.find((s) => s.id === id),
  saveSession: (session) =>
    set((state) => {
      const exists = state.sessions.some((s) => s.id === session.id);
      const sessions = exists
        ? state.sessions.map((s) => (s.id === session.id ? session : s))
        : [session, ...state.sessions];
      return { sessions };
    }),
}));
