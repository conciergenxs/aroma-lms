import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

const T = {
  en: {
    // Errors
    pageNotFoundTitle: "Page not found",
    pageNotFoundDesc: "The page you're looking for doesn't exist or has been moved.",
    errorTitle: "This page failed to load",
    errorDesc: "Something went wrong. Try refreshing or go back home.",
    tryAgain: "Try Again",
    // Login
    welcomeBack: "Welcome Back",
    loginSubtitle: "Login to continue your learning journey",
    whatsappNumber: "WHATSAPP NUMBER",
    whatsappPlaceholder: "Enter your WhatsApp number..",
    password: "PASSWORD",
    passwordPlaceholder: "Enter your password..",
    forgotPassword: "Forgot Password?",
    loginBtn: "LOGIN",
    loginSuccess: "Login Success!",
    loginRedirect: "Redirecting to your learning modules...",
    continueLabel: "Continue",
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
    cardCompleteBannerTitle: "Card Completed!",
    cardCompleteBannerDesc: "You've completed this knowledge card.",
    finish: "Finish",
    exploreOtherModule: "Explore Other Module",
    keyIngredients: "Key Ingredients",
    baScript: "BA Script",
    customerQA: "Customer Q&A",
    // Module
    cardsCompleted: "cards completed",
    otherModules: "Other Modules",
    statusNotStarted: "NOT STARTED",
    statusInProgress: "IN PROGRESS",
    statusCompleted: "COMPLETED",
    noModulesInCategory: "No modules available yet in this category.",
    allCategories: "All Categories",
    countCategories: "Categories",
    productsSuffix: "Products",
    // Level filter chips
    chipBrand: "Brand",
    chipCategory: "Category",
    chipProduct: "Product",
    noModulesForLevel: "No modules match this filter yet.",
    // Pages
    pageCategory: "Category",
    pageMyLearning: "Progress",
    categorySubtitle: "Browse modules based on product categories",
    myLearningSubtitle: "All modules you've started or completed.",
    overallProgress: "Overall Progress",
    overallProgressInfoLabel: "About this percentage",
    overallProgressTooltip:
      "This percentage is the combined total across Brand, Category, and Product modules.",
    modulesCompleted: "completed",
    countModules: "Modules",
    countModulesBrand: "Brand modules",
    countModulesCategory: "Category modules",
    countModulesProduct: "Product modules",
    // Progress -> unfinished-modules drill-down
    unfinishedModules: "Unfinished Modules",
    unfinishedSubtitleBrand: "Brand-level modules you haven't finished yet.",
    unfinishedSubtitleCategory: "Category-level modules you haven't finished yet.",
    unfinishedSubtitleProduct: "Product-level modules you haven't finished yet.",
    viewUnfinishedBrand: "View unfinished Brand modules",
    viewUnfinishedCategory: "View unfinished Category modules",
    viewUnfinishedProduct: "View unfinished Product modules",
    levelAllDoneTitle: "Nothing Left at This Level",
    levelAllDoneDesc:
      "You've finished every module here. Try another level, or browse all modules.",
    browseAllModules: "Browse All Modules",
    backToMyLearning: "Back to Progress",
    // Knowledge-level entry banners + their destination pages
    aboutPrefix: "About",
    brandKnowledgeSubtitle: "Modules about a brand as a whole, before you go category by category.",
    categoryKnowledgeSubtitle:
      "Modules about this category as a whole, before you go product by product.",
    noKnowledgeModules: "No modules at this level yet.",
    // Home
    goodMorning: "Good Morning",
    homeSubtitle: "Continue your beauty learning journey.",
    searchPlaceholder: "Search module name to learn...",
    searchResultsTitle: "Search Results",
    searchResultsFor: "results for",
    noResultsTitle: "No Modules Found",
    noResultsBody: "Nothing matches",
    didYouMean: "Did you mean:",
    filterAll: "All",
    filterNotStarted: "Not Started",
    filterInProgress: "In Progress",
    filterCompleted: "Completed",
    filterTitle: "Filter",
    filterCategory: "Category",
    filterBrand: "Brand",
    sortBy: "Sort By",
    sortRelevance: "Most Relevant",
    sortProgressDesc: "Highest Progress",
    sortProgressAsc: "Lowest Progress",
    sortTitle: "Title A\u2013Z",
    applyFilter: "Show Results",
    resetFilter: "Reset",
    clearSearch: "Clear search",
    matchedIn: "matched in",
    viewBrand: "View",
    noResultsForFilter: "No modules match these filters.",
    didYouMeanElsewhere: "Not on this page, but found elsewhere \u2014 search all modules for:",
    searchEmptyPrompt: "Type a module name to search.",
    learningModules: "Learning Modules",
    seeAll: "See All",
    seeAllCategories: "See All Categories",
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
    changePasswordSubtitle:
      "Use at least 8 characters. Mix letters, numbers and symbols for a stronger password.",
    currentPasswordLabel: "Current Password",
    currentPasswordPlaceholder: "Enter your old password..",
    newPasswordLabel: "New Password",
    newPasswordPlaceholder: "Enter your new password..",
    confirmPasswordLabel: "Confirm New Password",
    confirmPasswordPlaceholder: "Confirm your new password..",
    updatePassword: "UPDATE PASSWORD",
    fillAllFields: "Please fill in all fields",
    passwordsNoMatch: "Passwords do not match",
    passwordUpdated: "Password updated",
    // Help
    helpTitle: "We're here to help",
    helpSubtitle:
      "Whether you have a question about a module, need help with your account, or want product guidance from our beauty advisors — our support team is ready to assist. Reach out anytime and we'll get back to you as soon as possible.",
    contactSupport: "Contact Support",
    contactSupportDesc:
      "Chat with our AI assistant directly on WhatsApp for instant answers about products, training modules, or account help. Available 24/7.",
    chatOnWhatsApp: "Chat on WhatsApp",
    orEmailUs: "Or email us at",
    waMessage: "Hi Aroma AI, I need help with my account.",
    // Chat
    backTo: "Back to",
    chatHistory: "Chat History",
    searchChatPlaceholder: "Search chat...",
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
    prevPage: "< Previous",
    nextPage: "Next >",
  },
  id: {
    // Errors
    pageNotFoundTitle: "Halaman tidak ditemukan",
    pageNotFoundDesc: "Halaman yang kamu cari tidak ada atau telah dipindahkan.",
    errorTitle: "Halaman gagal dimuat",
    errorDesc: "Terjadi kesalahan. Coba refresh atau kembali ke beranda.",
    tryAgain: "Coba Lagi",
    // Login
    welcomeBack: "Selamat Datang",
    loginSubtitle: "Login untuk melanjutkan perjalanan belajarmu",
    whatsappNumber: "NOMOR WHATSAPP",
    whatsappPlaceholder: "Masukkan nomor WhatsApp..",
    password: "KATA SANDI",
    passwordPlaceholder: "Masukkan kata sandi..",
    forgotPassword: "Lupa Kata Sandi?",
    loginBtn: "MASUK",
    loginSuccess: "Login Berhasil!",
    loginRedirect: "Mengarahkan ke modul belajarmu...",
    continueLabel: "Lanjutkan",
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
    knowledgeCard: "Knowledge Card",
    knowledgeCardLabel: "KNOWLEDGE CARD",
    congratsTitle: "Selamat!",
    congratsDesc: "Kamu telah menyelesaikan semua kartu pengetahuan di modul ini.",
    cardCompleteBannerTitle: "Kartu Selesai!",
    cardCompleteBannerDesc: "Kamu telah menyelesaikan knowledge card ini.",
    finish: "Selesai",
    exploreOtherModule: "Jelajahi Modul Lain",
    keyIngredients: "Bahan Utama",
    baScript: "BA Script",
    customerQA: "Customer Q&A",
    // Module
    cardsCompleted: "kartu selesai",
    otherModules: "Modul Lainnya",
    statusNotStarted: "BELUM MULAI",
    statusInProgress: "SEDANG BELAJAR",
    statusCompleted: "SELESAI",
    noModulesInCategory: "Belum ada modul di kategori ini.",
    allCategories: "Semua Kategori",
    countCategories: "Kategori",
    productsSuffix: "Products",
    // Level filter chips
    chipBrand: "Brand",
    chipCategory: "Category",
    chipProduct: "Product",
    noModulesForLevel: "Belum ada modul untuk filter ini.",
    // Pages
    pageCategory: "Kategori",
    pageMyLearning: "Progres",
    categorySubtitle: "Telusuri modul berdasarkan kategori produk",
    myLearningSubtitle: "Semua modul yang sudah kamu mulai atau selesaikan.",
    overallProgress: "Progres Keseluruhan",
    overallProgressInfoLabel: "Tentang persentase ini",
    overallProgressTooltip:
      "Persentase ini adalah gabungan (kumulatif) dari modul Brand, Kategori, dan Produk.",
    modulesCompleted: "selesai",
    countModules: "Modul",
    countModulesBrand: "modul Brand",
    countModulesCategory: "modul Kategori",
    countModulesProduct: "modul Produk",
    // Progress -> unfinished-modules drill-down
    unfinishedModules: "Modul Belum Selesai",
    unfinishedSubtitleBrand: "Modul level Brand yang belum kamu selesaikan.",
    unfinishedSubtitleCategory: "Modul level Category yang belum kamu selesaikan.",
    unfinishedSubtitleProduct: "Modul level Product yang belum kamu selesaikan.",
    viewUnfinishedBrand: "Lihat modul Brand yang belum selesai",
    viewUnfinishedCategory: "Lihat modul Category yang belum selesai",
    viewUnfinishedProduct: "Lihat modul Product yang belum selesai",
    levelAllDoneTitle: "Level Ini Sudah Selesai",
    levelAllDoneDesc:
      "Semua modul di level ini sudah kamu selesaikan. Coba level lain, atau jelajahi semua modul.",
    browseAllModules: "Jelajahi Semua Modul",
    backToMyLearning: "Kembali ke Progres",
    // Knowledge-level entry banners + their destination pages
    aboutPrefix: "About",
    brandKnowledgeSubtitle:
      "Modul tentang brand secara keseluruhan, sebelum masuk ke tiap kategori.",
    categoryKnowledgeSubtitle:
      "Modul tentang kategori ini secara keseluruhan, sebelum masuk ke tiap produk.",
    noKnowledgeModules: "Belum ada modul di level ini.",
    // Home
    goodMorning: "Selamat Pagi",
    homeSubtitle: "Lanjutkan perjalanan belajar kecantikanmu.",
    searchPlaceholder: "Cari nama modul...",
    searchResultsTitle: "Hasil Pencarian",
    searchResultsFor: "hasil untuk",
    noResultsTitle: "Modul Tidak Ditemukan",
    noResultsBody: "Tidak ada modul yang cocok dengan",
    didYouMean: "Mungkin maksudmu:",
    filterAll: "Semua",
    filterNotStarted: "Belum Mulai",
    filterInProgress: "Sedang Belajar",
    filterCompleted: "Selesai",
    filterTitle: "Filter",
    filterCategory: "Kategori",
    filterBrand: "Brand",
    sortBy: "Urutkan",
    sortRelevance: "Paling Relevan",
    sortProgressDesc: "Progres Tertinggi",
    sortProgressAsc: "Progres Terendah",
    sortTitle: "Judul A\u2013Z",
    applyFilter: "Tampilkan Hasil",
    resetFilter: "Reset",
    clearSearch: "Hapus pencarian",
    matchedIn: "cocok di",
    viewBrand: "Lihat",
    noResultsForFilter: "Tidak ada modul yang cocok dengan filter ini.",
    didYouMeanElsewhere: "Tidak ada di halaman ini, tapi ada di modul lain \u2014 cari:",
    searchEmptyPrompt: "Ketik nama modul untuk mencari.",
    learningModules: "Modul Belajar",
    seeAll: "LIHAT SEMUA",
    seeAllCategories: "Lihat Semua Kategori",
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
    changePasswordSubtitle:
      "Gunakan minimal 8 karakter. Kombinasikan huruf, angka, dan simbol untuk kata sandi yang lebih kuat.",
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
    helpSubtitle:
      "Apakah kamu punya pertanyaan tentang modul, butuh bantuan akun, atau ingin panduan produk dari beauty advisor kami — tim support kami siap membantu. Hubungi kapan saja dan kami akan segera merespons.",
    contactSupport: "Hubungi Support",
    contactSupportDesc:
      "Chat dengan asisten AI kami langsung di WhatsApp untuk jawaban cepat tentang produk, modul pelatihan, atau bantuan akun. Tersedia 24 jam.",
    chatOnWhatsApp: "Chat di WhatsApp",
    orEmailUs: "Atau email kami di",
    waMessage: "Halo Aroma AI, saya butuh bantuan untuk akun saya.",
    // Chat
    backTo: "Kembali ke",
    chatHistory: "Riwayat Chat",
    searchChatPlaceholder: "Cari chat...",
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
    prevPage: "< Sebelumnya",
    nextPage: "Selanjutnya >",
  },
} as const;

type TKey = keyof typeof T.en;

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: TKey) => string;
}
const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always start at the SSR-safe default so the client's first render matches
  // the server-rendered HTML exactly — reading localStorage in the initializer
  // (as this used to) causes a hydration mismatch (React error #418) for any
  // returning visitor who had previously chosen a non-default language.
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    // v2: force-reset anyone who had old "en" default; only keep if user explicitly chose after v2
    const VER = "v2";
    if (localStorage.getItem("aroma:lang:ver") !== VER) {
      localStorage.setItem("aroma:lang", "id");
      localStorage.setItem("aroma:lang:ver", VER);
      localStorage.removeItem("aroma:lang:chosen");
      return;
    }
    const saved = localStorage.getItem("aroma:lang") as Lang | null;
    if (saved === "en" || saved === "id") setLangState(saved);
  }, []);

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
