import { create } from "zustand";

const STORAGE_KEY = "aroma:avatar";
/** Avatars are only ever shown at 120px — downscale so they fit in localStorage. */
const MAX_SIZE = 320;

type AvatarState = {
  /** The user's photo as a data URL, or null for the default icon. */
  avatar: string | null;
  hydrated: boolean;
  /** Pull the stored photo in. No-op on the server and after the first call. */
  hydrate: () => void;
  setAvatar: (dataUrl: string | null) => void;
};

export const useAvatarStore = create<AvatarState>((set, get) => ({
  // Null to start: this module is evaluated during SSR too, so the stored photo
  // is read after mount via hydrate() instead of here — that keeps the server
  // and first client render identical.
  avatar: null,
  hydrated: false,
  hydrate: () => {
    if (get().hydrated || typeof window === "undefined") return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage unavailable (private mode) — fall back to the default icon.
    }
    set({ avatar: stored, hydrated: true });
  },
  setAvatar: (dataUrl) => {
    try {
      if (dataUrl) localStorage.setItem(STORAGE_KEY, dataUrl);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Keep the in-memory photo; it just won't survive a reload.
    }
    set({ avatar: dataUrl, hydrated: true });
  },
}));

/** Shrink a picked photo to an avatar-sized JPEG data URL. */
export function fileToAvatarDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, MAX_SIZE / Math.max(img.width, img.height));
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("canvas unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("could not read image"));
    };
    img.src = objectUrl;
  });
}
