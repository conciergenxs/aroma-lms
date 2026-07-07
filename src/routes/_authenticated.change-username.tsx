import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/change-username")({
  component: ChangeUsername,
});

function ChangeUsername() {
  const { t } = useI18n();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    toast.success(t("usernameUpdated"));
    navigate({ to: "/profile" });
  };

  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <Link to="/profile" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("backToProfile")}
        </Link>
        <h1 className="font-serif text-[28px] font-medium leading-none">{t("changeUsernamePage")}</h1>
        <p className="text-[14px] text-foreground/70 mt-3">
          {t("changeUsernameSubtitle")}
        </p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={onSubmit}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="block text-[13px] font-medium mb-1.5">{t("currentUsernameLabel")}</label>
            <input
              disabled
              value="bella.victoria"
              className="w-full bg-soft border border-border rounded-lg px-4 py-3 text-[14px] text-foreground/60"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5">{t("newUsernameLabel")}</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t("newUsernamePlaceholder")}
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-[14px] placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand text-brand-foreground font-semibold tracking-wider py-3.5 rounded-full hover:brightness-110 transition-all"
          >
            SAVE CHANGES
          </button>
        </motion.form>
      </div>
      <SiteFooter />
    </>
  );
}
