import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MessageCircle, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

// Placeholder ARCO contact — swap for the signed-in BA's actual assigned ARCO
// once that data is available from the aroma-abadi-scl dashboard.
const ARCO_NUMBER = "6281200000000";
const ARCO_MESSAGE_ID = encodeURIComponent(
  "Halo, saya lupa kata sandi akun Beauty Ambassador Aroma dan butuh bantuan untuk reset.",
) // keep static to avoid hook in module scope;
const ARCO_MESSAGE_EN = encodeURIComponent(
  "Hi, I forgot my Aroma Beauty Ambassador account password and need help resetting it.",
) // keep static to avoid hook in module scope;

function ForgotPasswordPage() {
  const { lang } = useI18n();

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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="w-full mt-16"
      >
        <h1 className="font-serif text-[30px] leading-tight font-bold text-foreground">
          {lang === "id" ? "Lupa Kata Sandi?" : "Forgot Your Password?"}
        </h1>
        <p className="text-[15px] text-foreground/75 mt-4 leading-relaxed">
          {lang === "id"
            ? "Akun Beauty Ambassador kamu dibuat dan dikelola oleh Area Coordinator (ARCO), jadi kata sandi tidak bisa direset lewat aplikasi ini. Hubungi ARCO kamu langsung dan mereka akan membantu."
            : "Your Beauty Ambassador account is created and managed by your Area Coordinator (ARCO), so passwords can't be reset from this app. Reach out to your ARCO directly and they'll help you get back in."}
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
              <div className="text-[15px] font-semibold text-foreground">
                {lang === "id" ? "Area Coordinator (ARCO) Kamu" : "Your Area Coordinator"}
              </div>
              <div className="text-[12px] text-foreground/60">
                {lang === "id" ? "Terhubung dengan akunmu" : "Assigned to your account"}
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
            <MessageCircle className="h-5 w-5" />
            {lang === "id" ? "Chat ARCO di WhatsApp" : "Chat ARCO on WhatsApp"}
          </motion.a>
        </motion.div>

        <div className="mt-6 text-center text-[12px] text-foreground/60">
          {lang === "id"
            ? "Tidak tahu kontak ARCO kamu? Tanyakan di grup onboarding kamu."
            : "Don't know your ARCO's contact? Ask in your onboarding group chat."}
        </div>
      </motion.div>
    </div>
  );
}
