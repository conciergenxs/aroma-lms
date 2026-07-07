import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

const T = {
  en: {
    // Login
    welcomeBack: "Welcome Back",
    loginSubtitle: "Login to continue your learning journey",
    whatsappNumber: "WHATSAPP NUMBER",
    whatsappPlaceholder: "Type your WhatsApp number..",
    password: "PASSWORD",
    passwordPlaceholder: "Type your password..",
    forgotPassword: "Forgot Password?",
    loginBtn: "LOGIN",
    // Profile
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
    // Navigation
    navHome: "Home",
    navCategory: "Category",
    navMyLearning: "My Learning",
    navProfile: "Profile",
    // Back links
    backToHome: "Back to Home",
    backToProfile: "Back to Profile",
    backToCategory: "Back to Category",
    backToModules: "Back to Modules",
    // Knowledge card
    knowledgeCard: "Knowledge Card",
    knowledgeCardLabel: "KNOWLEDGE CARD",
    congratsTitle: "Congratulations!",
    congratsDesc: "You've completed all knowledge cards in this module.",
    finish: "Finish",
    exploreOtherModule: "Explore Other Module",
    // Pages
    pageCategory: "Category",
    pageMyLearning: "My Learning",
  },
  id: {
    // Login
    welcomeBack: "Selamat Datang",
    loginSubtitle: "Login untuk melanjutkan perjalanan belajarmu",
    whatsappNumber: "NOMOR WHATSAPP",
    whatsappPlaceholder: "Masukkan nomor WhatsApp kamu..",
    password: "KATA SANDI",
    passwordPlaceholder: "Masukkan kata sandi..",
    forgotPassword: "Lupa Kata Sandi?",
    loginBtn: "MASUK",
    // Profile
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
    // Navigation
    navHome: "Beranda",
    navCategory: "Kategori",
    navMyLearning: "Belajarku",
    navProfile: "Profil",
    // Back links
    backToHome: "Kembali ke Beranda",
    backToProfile: "Kembali ke Profil",
    backToCategory: "Kembali ke Kategori",
    backToModules: "Kembali ke Modul",
    // Knowledge card
    knowledgeCard: "Kartu Pengetahuan",
    knowledgeCardLabel: "KARTU PENGETAHUAN",
    congratsTitle: "Selamat!",
    congratsDesc: "Kamu telah menyelesaikan semua kartu pengetahuan di modul ini.",
    finish: "Selesai",
    exploreOtherModule: "Jelajahi Modul Lain",
    // Pages
    pageCategory: "Kategori",
    pageMyLearning: "Belajarku",
  },
} as const;

type TKey = keyof typeof T.en;

interface I18nCtx { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string; }
const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "id";
    const saved = localStorage.getItem("aroma:lang") as Lang | null;
    // Only honour explicitly saved preference; default is always Indonesian
    if (saved === "en" || saved === "id") return saved;
    localStorage.setItem("aroma:lang", "id");
    return "id";
  });
  const setLang = (l: Lang) => { setLangState(l); if (typeof window !== "undefined") localStorage.setItem("aroma:lang", l); };
  const t = (k: TKey): string => T[lang][k];
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
