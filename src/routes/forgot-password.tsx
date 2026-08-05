import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

// Placeholder ARCO contact — swap for the signed-in BA's actual assigned ARCO
// once that data is available from the aroma-abadi-scl dashboard.
const ARCO_NAME = "Christian Wijaya";
const ARCO_NUMBER = "6281200000000";
const ARCO_MESSAGE_ID = encodeURIComponent(
  "Halo, saya lupa kata sandi akun Beauty Ambassador Aroma dan butuh bantuan untuk reset.",
) // keep static to avoid hook in module scope;
const ARCO_MESSAGE_EN = encodeURIComponent(
  "Hi, I forgot my Aroma Beauty Ambassador account password and need help resetting it.",
) // keep static to avoid hook in module scope;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ForgotPasswordPage() {
  const { lang } = useI18n();
  const [waNumber, setWaNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const canSubmit = waNumber.replace(/\D/g, "").length >= 9;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setVerified(true);
    toast.success(lang === "id" ? "Nomor berhasil diverifikasi" : "Number verified successfully");
  };

  return (
    <div className="mobile-shell min-h-screen bg-cream flex flex-col px-6 pt-[80px] pb-[120px] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-5 left-6"
      >
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-brand font-semibold">
          <ChevronLeft className="h-4 w-4" />
          {lang === "id" ? "Kembali" : "Back"}
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        {!verified ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="w-full mt-16"
          >
            <h1 className="font-serif text-[30px] leading-tight font-bold text-foreground">
              {lang === "id" ? "Lupa Kata Sandi?" : "Forgot Your Password?"}
            </h1>
            <p className="text-[14px] text-foreground/75 mt-3 leading-relaxed">
              {lang === "id"
                ? "Masukkan nomor WhatsApp terdaftarmu untuk melanjutkan."
                : "Enter your registered WhatsApp number to continue."}
            </p>

            <form onSubmit={onSubmit} className="mt-8 w-full">
              <label className="block">
                <span className="text-[12px] font-bold tracking-[0.18em] text-foreground">
                  {lang === "id" ? "NOMOR WHATSAPP" : "WHATSAPP NUMBER"}
                </span>
                <input
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  placeholder={lang === "id" ? "Masukkan nomor WhatsApp.." : "Enter your WhatsApp number.."}
                  inputMode="tel"
                  className="mt-3 w-full bg-card rounded-full border border-border px-5 py-[15px] text-[15px] shadow-sm placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </label>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`mt-8 w-full h-12 rounded-full font-semibold text-[16px] transition-colors ${
                  canSubmit
                    ? "bg-brand text-white hover:brightness-110"
                    : "bg-tan/40 text-foreground/40 cursor-not-allowed"
                }`}
              >
                {lang === "id" ? "Verifikasi" : "Verify"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="arco"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="w-full mt-16"
          >
            <h1 className="font-serif text-[30px] leading-tight font-bold text-foreground">
              {lang === "id" ? "Hubungi ARCO Kamu" : "Contact Your ARCO"}
            </h1>
            <p className="text-[14px] text-foreground/75 mt-3 leading-relaxed">
              {lang === "id"
                ? "Akunmu dikelola oleh Area Coordinator (ARCO). Hubungi mereka untuk reset kata sandi."
                : "Your account is managed by your Area Coordinator (ARCO). Contact them to reset your password."}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 w-full rounded-xl bg-card border border-border p-5"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <UserRound className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-foreground">{ARCO_NAME}</div>
                  <div className="text-[12px] text-foreground/60">
                    {lang === "id" ? "Area Coordinator (ARCO) Kamu" : "Your Area Coordinator"}
                  </div>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href={`https://wa.me/${ARCO_NUMBER}?text=${lang === "id" ? ARCO_MESSAGE_ID : ARCO_MESSAGE_EN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 rounded-full hover:brightness-110 transition-all"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {lang === "id" ? "Hubungi ARCO" : "Contact ARCO"}
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
