import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { User, Lock, HelpCircle, LogOut, Camera, Mail, Check, ArrowLeftRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import avatarBella from "@/assets/avatar-bella.jpg";
import { useI18n } from "@/lib/i18n";
import { useBrand, ALL_BRANDS, type BrandName } from "@/lib/brand-context";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === "id" ? "en" : "id")}
      className="flex items-center gap-1 text-[12px] font-bold tracking-wide text-foreground/60 hover:text-foreground transition-colors border border-border rounded-full px-3 py-1 font-sans"
    >
      <span className={lang === "id" ? "text-brand font-extrabold" : ""}>ID</span>
      <span className="text-foreground/30">|</span>
      <span className={lang === "en" ? "text-brand font-extrabold" : ""}>EN</span>
    </button>
  );
}

function BottomSheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl pb-10 shadow-2xl font-sans"
          >
            <div className="w-10 h-1 bg-border rounded-full mx-auto mt-3 mb-4" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ProfilePage() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [brandSheetOpen, setBrandSheetOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();
  const { activeBrand, setActiveBrand } = useBrand();

  const menuItems = [
{ icon: Lock, label: t("changePassword"), to: "/change-password" as const },
    { icon: HelpCircle, label: t("help"), to: "/help" as const },
  ];

  return (
    <>
      {/* Brand sheet */}
      <BottomSheet open={brandSheetOpen} onClose={() => setBrandSheetOpen(false)}>
        <p className="px-6 text-[13px] font-bold tracking-widest text-foreground/50 mb-2">{t("selectBrand")}</p>
        {ALL_BRANDS.map((b) => (
          <button
            key={b}
            onClick={() => { setActiveBrand(b as BrandName); setBrandSheetOpen(false); }}
            className="w-full flex items-center justify-between px-6 py-4 text-[15px] hover:bg-cream transition-colors border-t border-border first:border-t-0 font-sans"
          >
            <span className={b === activeBrand ? "font-semibold text-brand" : "text-foreground"}>{b}</span>
            {b === activeBrand && <Check className="h-4 w-4 text-brand" />}
          </button>
        ))}
      </BottomSheet>

      {/* Logout sheet */}
      <BottomSheet open={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <div className="px-6 pb-2">
          <p className="font-serif text-[22px] font-medium text-foreground">{t("logoutTitle")}</p>
          <p className="mt-2 text-[14px] text-foreground/60 font-sans leading-relaxed">{t("logoutDesc")}</p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => { setLogoutOpen(false); navigate({ to: "/" }); }}
              className="w-full h-12 rounded-full bg-brand text-white font-semibold text-[16px] font-sans hover:brightness-110 transition-all"
            >
              {t("logout")}
            </button>
            <button
              onClick={() => setLogoutOpen(false)}
              className="w-full h-12 rounded-full border-2 border-border text-foreground font-semibold text-[16px] font-sans hover:bg-black/5 transition-all"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </BottomSheet>

      <div className="px-[24px] pt-[28px]">
        {/* Language toggle — top right */}
        <div className="flex justify-end mb-2">
          <LangToggle />
        </div>

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="relative"
          >
            <div className="h-[120px] w-[120px] rounded-full overflow-hidden ring-4 ring-card shadow-md">
              <img src={avatarBella} alt="Bella Victoria" className="h-full w-full object-cover" width={320} height={320} />
            </div>
            <button
              aria-label="Change photo"
              className="absolute bottom-1 right-1 h-9 w-9 rounded-full bg-brand text-white flex items-center justify-center shadow-md ring-2 ring-card hover:brightness-110 transition-all"
            >
              <Camera className="h-4 w-4" />
            </button>
          </motion.div>
          <h1 className="mt-4 font-serif text-[28px] font-medium leading-none">Bella Victoria</h1>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground/65 font-sans">
            <Mail className="h-4 w-4" /> bella.thompson@aroma.id
          </div>
        </div>

        {/* Brand switcher card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setBrandSheetOpen(true)}
          className="mt-6 w-full flex items-center justify-between bg-card rounded-xl border border-border px-4 py-3.5"
        >
          <div className="text-left">
            <p className="text-[15px] font-semibold text-brand font-sans">{activeBrand}</p>
          </div>
          <ArrowLeftRight className="h-[18px] w-[18px] text-foreground/50" />
        </motion.button>

        <h2 className="mt-8 font-serif text-[22px] font-medium">{t("accountSettings")}</h2>
        <div className="mt-3 space-y-2.5">
          {menuItems.map(({ icon: Icon, label, to }) => (
            <motion.div key={label} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => navigate({ to })}
                className="w-full flex items-center gap-3 bg-card rounded-xl border border-border px-4 py-3.5 text-[15px] hover:border-brand/40 transition-colors font-sans"
              >
                <Icon className="h-5 w-5 text-foreground/70" />
                <span>{label}</span>
              </button>
            </motion.div>
          ))}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setLogoutOpen(true)}
            className="w-full flex items-center gap-3 bg-card rounded-xl border border-brand/40 px-4 py-3.5 text-[15px] text-brand font-medium hover:bg-brand/5 transition-colors font-sans"
          >
            <LogOut className="h-5 w-5" />
            <span>{t("logout")}</span>
          </motion.button>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
