import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { lang } = useI18n();
  const [waNumber, setWaNumber] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = waNumber.replace(/\D/g, "").length >= 9;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSent(true);
  };

  return (
    <div className="mobile-shell min-h-screen bg-cream flex flex-col px-6 pt-[118px] pb-[120px] relative overflow-hidden">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-5 left-6"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-brand font-semibold"
        >
          <ChevronLeft className="h-4 w-4" />
          {lang === "id" ? "Kembali" : "Back"}
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="w-full"
          >
            <h1 className="font-serif text-[34px] leading-none font-bold text-foreground">
              {lang === "id" ? "Lupa Kata Sandi?" : "Forgot Password?"}
            </h1>
            <p className="text-[15px] text-foreground/75 mt-4 leading-relaxed">
              {lang === "id"
                ? "Masukkan nomor WhatsApp yang terdaftar. Kami akan mengirimkan link reset kata sandi melalui WhatsApp."
                : "Enter your registered WhatsApp number. We'll send a password reset link via WhatsApp."}
            </p>

            <form onSubmit={onSubmit} className="mt-[34px] w-full">
              <label className="block">
                <span className="text-[12px] font-bold tracking-[0.18em] text-foreground">
                  {lang === "id" ? "NOMOR WHATSAPP" : "WHATSAPP NUMBER"}
                </span>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  placeholder={lang === "id" ? "Masukkan nomor WhatsApp.." : "Enter your WhatsApp number.."}
                  inputMode="tel"
                  className="mt-3 w-full bg-card rounded-full border border-border px-5 py-[15px] text-[15px] shadow-sm placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </label>

              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileTap={canSubmit ? { scale: 0.97 } : {}}
                animate={{
                  backgroundColor: canSubmit ? "#6b0f1a" : undefined,
                }}
                transition={{ duration: 0.2 }}
                className={`mt-8 w-full h-12 rounded-full font-semibold text-[16px] transition-colors ${
                  canSubmit
                    ? "bg-brand text-white hover:brightness-110"
                    : "bg-tan/40 text-foreground/40 cursor-not-allowed"
                }`}
              >
                {lang === "id" ? "Ubah Kata Sandi" : "Reset Password"}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="w-full flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
              className="h-[88px] w-[88px] rounded-full bg-brand/10 flex items-center justify-center mb-6"
            >
              <Check className="h-11 w-11 text-brand" strokeWidth={2.5} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-[28px] font-bold"
            >
              {lang === "id" ? "Permintaan Terkirim!" : "Request Sent!"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[15px] text-foreground/65 mt-3 leading-relaxed max-w-[280px]"
            >
              {lang === "id"
                ? "Cek WhatsApp kamu — link reset kata sandi akan segera dikirimkan."
                : "Check your WhatsApp — a password reset link will be sent shortly."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 w-full"
            >
              <Link
                to="/"
                className="w-full h-12 rounded-full bg-brand text-white font-semibold text-[16px] flex items-center justify-center hover:brightness-110 transition-all"
              >
                {lang === "id" ? "Kembali ke Login" : "Back to Login"}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
