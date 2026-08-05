import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/login-success")({
  component: LoginSuccess,
});

function LoginSuccess() {
  const { t } = useI18n();
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/home" }), 1400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="mobile-shell min-h-screen bg-cream flex flex-col items-center justify-start pt-[252px] px-6 relative overflow-hidden">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className="h-24 w-24 rounded-full bg-tan flex items-center justify-center shadow-lg"
      >
        <Check className="h-9 w-9 text-white" strokeWidth={3} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-serif text-[32px] leading-none mt-9"
      >
        {t("loginSuccess")}
      </motion.h1>
      <p className="text-[15px] text-foreground/75 mt-4">{t("loginRedirect")}</p>
      <div className="mt-6 pt-6 border-t border-border w-[272px] text-center">
        <div className="font-bold tracking-tight text-lg leading-none">LAURA MERCIER</div>
        <div className="text-[9px] tracking-[0.28em] text-foreground/75 mt-1">PARIS · NEW YORK</div>
      </div>
      <Link to="/home" className="sr-only">Continue</Link>
    </div>
  );
}
