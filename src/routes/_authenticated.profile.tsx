import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { User, Lock, HelpCircle, LogOut, Camera, Mail, Check, ArrowLeftRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import avatarBella from "@/assets/avatar-bella.jpg";
import { useI18n } from "@/lib/i18n";
import { useBrand, ALL_BRANDS, type BrandName } from "@/lib/brand-context";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

function BrandSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { activeBrand, setActiveBrand } = useBrand();
  const { t } = useI18n();
  const select = (b: BrandName) => { setActiveBrand(b); onClose(); };

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
            <p className="px-6 text-[13px] font-bold tracking-widest text-foreground/50 mb-2 font-sans">{t("selectBrand")}</p>
            {ALL_BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => select(b)}
                className="w-full flex items-center justify-between px-6 py-4 text-[15px] hover:bg-cream transition-colors border-t border-border first:border-t-0 font-sans"
              >
                <span className={b === activeBrand ? "font-semibold text-brand" : "text-foreground"}>{b}</span>
                {b === activeBrand && <Check className="h-4 w-4 text-brand" />}
              </button>
            ))}
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
  const { activeBrand } = useBrand();

  const menuItems = [
    { icon: User, label: t("changeUsername"), to: "/change-username" as const },
    { icon: Lock, label: t("changePassword"), to: "/change-password" as const },
    { icon: HelpCircle, label: t("help"), to: "/help" as const },
  ];

  return (
    <>
      <BrandSheet open={brandSheetOpen} onClose={() => setBrandSheetOpen(false)} />

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

          {/* Name + brand row */}
          <h1 className="mt-4 font-serif text-[28px] font-medium leading-none">Bella Victoria</h1>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-[13px] font-semibold text-brand font-sans">{activeBrand}</span>
            <button
              onClick={() => setBrandSheetOpen(true)}
              aria-label="Switch brand"
              className="h-6 w-6 rounded-full bg-brand/10 flex items-center justify-center hover:bg-brand/20 transition-colors"
            >
              <ArrowLeftRight className="h-3 w-3 text-brand" />
            </button>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-foreground/65 font-sans">
            <Mail className="h-4 w-4" /> bella.thompson@aroma.id
          </div>
        </div>

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

      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-sans">{t("logoutTitle")}</AlertDialogTitle>
            <AlertDialogDescription className="font-sans">{t("logoutDesc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-sans">{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => navigate({ to: "/" })}
              className="bg-brand text-brand-foreground hover:brightness-110 font-sans"
            >
              {t("logout")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SiteFooter />
    </>
  );
}
