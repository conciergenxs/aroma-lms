import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

const T = {
  en: {
    welcomeBack: "Welcome Back",
    loginSubtitle: "Login to continue your learning journey",
    whatsappNumber: "WHATSAPP NUMBER",
    whatsappPlaceholder: "Type your WhatsApp number..",
    password: "PASSWORD",
    passwordPlaceholder: "Type your password..",
    forgotPassword: "Forgot Password?",
    loginBtn: "LOGIN",
    accountSettings: "Account Settings",
    changeUsername: "Change Username",
    changePassword: "Change Password",
    help: "Help",
    logout: "Logout",
    logoutTitle: "Logout from Aroma?",
    logoutDesc: "You'll need to sign in again to access your learning progress and modules.",
    cancel: "Cancel",
    currentBrand: "Current Brand",
    switchBrand: "Switch Brand",
    selectBrand: "Select Brand",
    language: "Language",
  },
  id: {
    welcomeBack: "Selamat Datang",
    loginSubtitle: "Login untuk melanjutkan perjalanan belajarmu",
    whatsappNumber: "NOMOR WHATSAPP",
    whatsappPlaceholder: "Masukkan nomor WhatsApp kamu..",
    password: "KATA SANDI",
    passwordPlaceholder: "Masukkan kata sandi..",
    forgotPassword: "Lupa Kata Sandi?",
    loginBtn: "MASUK",
    accountSettings: "Pengaturan Akun",
    changeUsername: "Ubah Username",
    changePassword: "Ubah Kata Sandi",
    help: "Bantuan",
    logout: "Keluar",
    logoutTitle: "Keluar dari Aroma?",
    logoutDesc: "Kamu perlu masuk lagi untuk mengakses progress belajar dan modulmu.",
    cancel: "Batal",
    currentBrand: "Brand Saat Ini",
    switchBrand: "Ganti Brand",
    selectBrand: "Pilih Brand",
    language: "Bahasa",
  },
} as const;

type TKey = keyof typeof T.en;

interface I18nCtx { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string; }
const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window !== "undefined" ? ((localStorage.getItem("aroma:lang") as Lang) ?? "id") : "id"
  );
  const setLang = (l: Lang) => { setLangState(l); if (typeof window !== "undefined") localStorage.setItem("aroma:lang", l); };
  const t = (k: TKey): string => T[lang][k];
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
