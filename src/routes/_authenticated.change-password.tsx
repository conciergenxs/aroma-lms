import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/change-password")({
  component: ChangePassword,
});

function ChangePassword() {
  const { t } = useI18n();
  const [curr, setCurr] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curr || !next || !confirm) {
      toast.error(t("fillAllFields"));
      return;
    }
    if (next !== confirm) {
      toast.error(t("passwordsNoMatch"));
      return;
    }
    toast.success(t("passwordUpdated"));
    navigate({ to: "/profile" });
  };

  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <Link to="/profile" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("backToProfile")}
        </Link>
        <h1 className="font-serif text-[28px] font-medium leading-none">{t("changePasswordPage")}</h1>
        <p className="text-[14px] text-foreground/70 mt-3">
          {t("changePasswordSubtitle")}
        </p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={onSubmit}
          className="mt-6 space-y-4"
        >
          {[
            { label: t("currentPasswordLabel"), value: curr, set: setCurr, placeholder: t("currentPasswordPlaceholder") },
            { label: t("newPasswordLabel"), value: next, set: setNext, placeholder: t("newPasswordPlaceholder") },
            { label: t("confirmPasswordLabel"), value: confirm, set: setConfirm, placeholder: t("confirmPasswordPlaceholder") },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-[13px] font-medium mb-1.5">{f.label}</label>
              <input
                type="password"
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-[14px] placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-brand text-brand-foreground font-semibold tracking-wider py-3.5 rounded-full hover:brightness-110 transition-all"
          >
            UPDATE PASSWORD
          </button>
        </motion.form>
      </div>
      <SiteFooter />
    </>
  );
}
