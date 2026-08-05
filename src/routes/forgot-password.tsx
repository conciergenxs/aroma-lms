import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MessageCircle, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import logoAroma from "@/assets/logo-aroma-upload.svg.asset.json";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — Aroma · Laura Mercier" },
      { name: "description", content: "Contact your Area Coordinator to reset your password." },
    ],
  }),
  component: ForgotPasswordPage,
});

// Placeholder ARCO contact — swap for the signed-in BA's actual assigned ARCO
// once that data is available from the aroma-abadi-scl dashboard.
const ARCO_NAME = "Your Area Coordinator";
const ARCO_NUMBER = "6281200000000";
const ARCO_MESSAGE = encodeURIComponent(
  "Hi, I forgot my Aroma Beauty Ambassador account password and need help resetting it.",
);

function ForgotPasswordPage() {
  return (
    <div className="mobile-shell min-h-screen bg-cream flex flex-col items-center px-6 pt-[72px] relative overflow-hidden">
      <Link to="/" className="self-start inline-flex items-center gap-1 text-sm text-brand font-semibold">
        <ChevronLeft className="h-4 w-4" /> Back to Login
      </Link>

      <img src={logoAroma.url} alt="Aroma" className="h-[42px] w-auto mt-8" />

      <h1 className="font-serif text-[30px] leading-none mt-8 text-foreground font-bold text-center">
        Forgot Your Password?
      </h1>
      <p className="text-[14px] text-foreground/75 mt-4 text-center leading-relaxed">
        Your Beauty Ambassador account is created and managed by your Area
        Coordinator (ARCO), so passwords can't be reset from this app. Reach
        out to your ARCO directly and they'll help you get back in.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 w-full rounded-xl bg-card border border-border p-5"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
            <UserRound className="h-5 w-5 text-brand" />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-foreground">{ARCO_NAME}</div>
            <div className="text-[12px] text-foreground/60">Assigned to your account</div>
          </div>
        </div>

        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          href={`https://wa.me/${ARCO_NUMBER}?text=${ARCO_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 rounded-full hover:brightness-110 transition-all"
        >
          <MessageCircle className="h-5 w-5" />
          Chat ARCO on WhatsApp
        </motion.a>
      </motion.div>

      <div className="mt-6 text-center text-[12px] text-foreground/60">
        Don't know your ARCO's contact? Ask in your onboarding group chat.
      </div>
    </div>
  );
}
