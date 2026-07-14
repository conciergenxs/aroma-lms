import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, MessageCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { t, lang } = useI18n();
  const [waNumber, setWaNumber] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = waNumber.replace(/\D/g, "").length >= 9;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSent(true);
  };

  return (
    <div className="mobile-shell min-h-screen bg-cream flex flex-col items-center px-6 pt-[80px] pb-[120px] relative overflow-hidden">
      <Link
        to="/"
        className="absolute top-5 left-6 inline-flex items-center gap-1 text-sm text-brand font-semibold"
      >
        <ChevronLeft className="h-4 w-4" />
        {lang === "id" ? "Kembali" : "Back"}
      </Link>


      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <h1 className="font-serif text-[30px] leading-tight mt-8 font-bold text-center">
              {lang === "id" ? "Lupa Kata Sandi?" : "Forgot Password?"}
            </h1>
            <p className="text-[14px] text-foreground/65 mt-3 text-center leading-relaxed">
              {lang === "id"
                ? "Masukkan nomor WhatsApp yang terdaftar. Kami akan mengirimkan link reset kata sandi melalui WhatsApp."
                : "Enter your registered WhatsApp number. We'll send a password reset link via WhatsApp."}
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
                className={`mt-6 w-full h-12 rounded-full font-semibold text-[16px] inline-flex items-center justify-center gap-2 transition-colors ${
                  canSubmit ? "bg-[#25D366] text-white" : "bg-tan/40 text-foreground/40 cursor-not-allowed"
                }`}
              >
                <MessageCircle className="h-5 w-5" />
                {lang === "id" ? "Kirim via WhatsApp" : "Send via WhatsApp"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center text-center mt-10"
          >
            <div className="h-20 w-20 rounded-full bg-[#25D366]/15 flex items-center justify-center mb-5">
              <Check className="h-10 w-10 text-[#25D366]" strokeWidth={2.5} />
            </div>
            <h2 className="font-serif text-[26px] font-bold">
              {lang === "id" ? "Pesan Terkirim!" : "Message Sent!"}
            </h2>
            <p className="text-[14px] text-foreground/65 mt-3 leading-relaxed max-w-[280px]">
              {lang === "id"
                ? "Permintaan kamu sudah kami terima. Cek WhatsApp kamu — link reset kata sandi akan segera dikirimkan."
                : "Your request has been received. Check your WhatsApp — a password reset link will be sent shortly."}
            </p>
            <Link
              to="/"
              className="mt-8 w-full h-12 rounded-full bg-brand text-white font-semibold text-[16px] flex items-center justify-center hover:brightness-110 transition-all"
            >
              {lang === "id" ? "Kembali ke Login" : "Back to Login"}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
