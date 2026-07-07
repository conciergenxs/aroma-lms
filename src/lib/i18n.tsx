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
    loginSuccess: "Login Success!",
    loginRedirect: "Redirecting to your learning modules...",
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
    navMyLearning: "Progress",
    navProfile: "Profile",
    // Back links
    backToHome: "Back to Home",
    backToProfile: "Back to Profile",
    backToCategory: "Back to Category",
    backToModules: "Back to Modules",
    back: "Back",
    // Knowledge card
    knowledgeCard: "Knowledge Card",
    knowledgeCardLabel: "KNOWLEDGE CARD",
    congratsTitle: "Congratulations!",
    congratsDesc: "You've completed all knowledge cards in this module.",
    finish: "Finish",
    exploreOtherModule: "Explore Other Module",
    keyIngredients: "Key Ingredients",
    // Module
    cardsCompleted: "cards completed",
    otherModules: "Other Modules",
    statusNotStarted: "NOT STARTED",
    statusInProgress: "IN PROGRESS",
    statusCompleted: "COMPLETED",
    noModulesForBrand: "No modules available for this brand yet.",
    noModulesInCategory: "No modules available yet in this category.",
    allModules: "All Modules",
    // Pages
    pageCategory: "Category",
    pageMyLearning: "Progress",
    categorySubtitle: "Browse modules based on product categories",
    myLearningSubtitle: "All modules you've started or completed.",
    countModules: "Modules",
    // Home
    goodMorning: "Good Morning",
    homeSubtitle: "Continue your beauty learning journey.",
    searchPlaceholder: "Search module name to learn...",
    learningModules: "Learning Modules",
    seeAll: "SEE ALL",
    seeAllModules: "SEE ALL MODULES",
    otherBrands: "Other Brands",
    // Change username/password
    changeUsernamePage: "Change Username",
    changeUsernameSubtitle: "Your username appears across your profile and learning history.",
    currentUsernameLabel: "Current Username",
    newUsernameLabel: "New Username",
    newUsernamePlaceholder: "Type your new username here..",
    saveChanges: "SAVE CHANGES",
    usernameUpdated: "Username updated",
    changePasswordPage: "Change Password",
    changePasswordSubtitle: "Use at least 8 characters. Mix letters, numbers and symbols for a stronger password.",
    currentPasswordLabel: "Current Password",
    currentPasswordPlaceholder: "Type your old password here..",
    newPasswordLabel: "New Password",
    newPasswordPlaceholder: "Type your new password here..",
    confirmPasswordLabel: "Confirm New Password",
    confirmPasswordPlaceholder: "Confirm your new password..",
    updatePassword: "UPDATE PASSWORD",
    fillAllFields: "Please fill in all fields",
    passwordsNoMatch: "Passwords do not match",
    passwordUpdated: "Password updated",
    // Help
    helpTitle: "We're here to help",
    helpSubtitle: "Whether you have a question about a module, need help with your account, or want product guidance from our beauty advisors — our support team is ready to assist. Reach out anytime and we'll get back to you as soon as possible.",
    contactSupport: "Contact Support",
    contactSupportDesc: "Chat with our AI assistant directly on WhatsApp for instant answers about products, training modules, or account help. Available 24/7.",
    chatOnWhatsApp: "Chat on WhatsApp",
    orEmailUs: "Or email us at",
    waMessage: "Hi Aroma AI, I need help with my account.",
    // Chat
    backTo: "Back to",
    chatHistory: "Chat History",
    chatPlaceholder: "Type your message here..",
    thinking: "Thinking...",
    // Footer
    privacyPolicy: "Privacy Policy",
    termsConditions: "T&C",
    // Privacy page
    privacyTitle: "Privacy Policy",
    privacyEffective: "Effective: 1 January 2026",
    // Terms page
    termsTitle: "Terms & Conditions",
    termsUpdated: "Last updated: 1 January 2026",
    // FAQ
    faqTitle: "FAQ",
    faqSubtitle: "Everything you need to know about using Aroma BA-Helper on the counter floor.",
    // Pagination
    showing: "Showing",
    of: "of",
    page: "Page",
    total: "total",
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
    loginSuccess: "Login Berhasil!",
    loginRedirect: "Mengarahkan ke modul belajarmu...",
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
    navMyLearning: "Progres",
    navProfile: "Profil",
    // Back links
    backToHome: "Kembali ke Beranda",
    backToProfile: "Kembali ke Profil",
    backToCategory: "Kembali ke Kategori",
    backToModules: "Kembali ke Modul",
    back: "Kembali",
    // Knowledge card
    knowledgeCard: "Kartu Pengetahuan",
    knowledgeCardLabel: "KARTU PENGETAHUAN",
    congratsTitle: "Selamat!",
    congratsDesc: "Kamu telah menyelesaikan semua kartu pengetahuan di modul ini.",
    finish: "Selesai",
    exploreOtherModule: "Jelajahi Modul Lain",
    keyIngredients: "Bahan Utama",
    // Module
    cardsCompleted: "kartu selesai",
    otherModules: "Modul Lainnya",
    statusNotStarted: "BELUM MULAI",
    statusInProgress: "SEDANG BELAJAR",
    statusCompleted: "SELESAI",
    noModulesForBrand: "Belum ada modul untuk brand ini.",
    noModulesInCategory: "Belum ada modul di kategori ini.",
    allModules: "Semua Modul",
    // Pages
    pageCategory: "Kategori",
    pageMyLearning: "Progres",
    categorySubtitle: "Telusuri modul berdasarkan kategori produk",
    myLearningSubtitle: "Semua modul yang sudah kamu mulai atau selesaikan.",
    countModules: "Modul",
    // Home
    goodMorning: "Selamat Pagi",
    homeSubtitle: "Lanjutkan perjalanan belajar kecantikanmu.",
    searchPlaceholder: "Cari nama modul...",
    learningModules: "Modul Belajar",
    seeAll: "LIHAT SEMUA",
    seeAllModules: "LIHAT SEMUA MODUL",
    otherBrands: "Brand Lainnya",
    // Change username/password
    changeUsernamePage: "Ubah Username",
    changeUsernameSubtitle: "Username kamu tampil di profil dan riwayat belajarmu.",
    currentUsernameLabel: "Username Saat Ini",
    newUsernameLabel: "Username Baru",
    newUsernamePlaceholder: "Ketik username baru kamu..",
    saveChanges: "SIMPAN PERUBAHAN",
    usernameUpdated: "Username berhasil diubah",
    changePasswordPage: "Ubah Kata Sandi",
    changePasswordSubtitle: "Gunakan minimal 8 karakter. Kombinasikan huruf, angka, dan simbol untuk kata sandi yang lebih kuat.",
    currentPasswordLabel: "Kata Sandi Saat Ini",
    currentPasswordPlaceholder: "Ketik kata sandi lama kamu..",
    newPasswordLabel: "Kata Sandi Baru",
    newPasswordPlaceholder: "Ketik kata sandi baru kamu..",
    confirmPasswordLabel: "Konfirmasi Kata Sandi Baru",
    confirmPasswordPlaceholder: "Konfirmasi kata sandi barumu..",
    updatePassword: "PERBARUI KATA SANDI",
    fillAllFields: "Mohon isi semua kolom",
    passwordsNoMatch: "Kata sandi tidak cocok",
    passwordUpdated: "Kata sandi berhasil diubah",
    // Help
    helpTitle: "Kami Siap Membantu",
    helpSubtitle: "Apakah kamu punya pertanyaan tentang modul, butuh bantuan akun, atau ingin panduan produk dari beauty advisor kami — tim support kami siap membantu. Hubungi kapan saja dan kami akan segera merespons.",
    contactSupport: "Hubungi Support",
    contactSupportDesc: "Chat dengan asisten AI kami langsung di WhatsApp untuk jawaban cepat tentang produk, modul pelatihan, atau bantuan akun. Tersedia 24 jam.",
    chatOnWhatsApp: "Chat di WhatsApp",
    orEmailUs: "Atau email kami di",
    waMessage: "Halo Aroma AI, saya butuh bantuan untuk akun saya.",
    // Chat
    backTo: "Kembali ke",
    chatHistory: "Riwayat Chat",
    chatPlaceholder: "Ketik pesanmu di sini..",
    thinking: "Sedang berpikir...",
    // Footer
    privacyPolicy: "Kebijakan Privasi",
    termsConditions: "S&K",
    // Privacy page
    privacyTitle: "Kebijakan Privasi",
    privacyEffective: "Berlaku: 1 Januari 2026",
    // Terms page
    termsTitle: "Syarat & Ketentuan",
    termsUpdated: "Terakhir diperbarui: 1 Januari 2026",
    // FAQ
    faqTitle: "FAQ",
    faqSubtitle: "Semua yang perlu kamu ketahui tentang penggunaan Aroma BA-Helper di counter.",
    // Pagination
    showing: "Menampilkan",
    of: "dari",
    page: "Halaman",
    total: "total",
  },
} as const;

type TKey = keyof typeof T.en;

interface I18nCtx { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string; }
const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "id";
    // v2: force-reset anyone who had old "en" default; only keep if user explicitly chose after v2
    const VER = "v2";
    if (localStorage.getItem("aroma:lang:ver") !== VER) {
      localStorage.setItem("aroma:lang", "id");
      localStorage.setItem("aroma:lang:ver", VER);
      localStorage.removeItem("aroma:lang:chosen");
      return "id";
    }
    const saved = localStorage.getItem("aroma:lang") as Lang | null;
    return saved === "en" || saved === "id" ? saved : "id";
  });
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("aroma:lang", l);
    }
  };
  const t = (k: TKey): string => T[lang][k];
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
