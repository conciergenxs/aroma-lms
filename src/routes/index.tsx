import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logoAroma from "@/assets/logo-aroma-upload.svg.asset.json";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — Aroma · Laura Mercier" },
      { name: "description", content: "Login to continue your beauty learning journey." },
    ],
  }),
  component: LoginPage,
});

function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === "id" ? "en" : "id")}
      className="flex items-center gap-1 text-[12px] font-bold tracking-wide text-foreground/60 hover:text-foreground transition-colors border border-border rounded-full px-3 py-1"
    >
      <span className={lang === "id" ? "text-brand font-extrabold" : ""}>ID</span>
      <span className="text-foreground/30">|</span>
      <span className={lang === "en" ? "text-brand font-extrabold" : ""}>EN</span>
    </button>
  );
}

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();
  const canSubmit = username.length > 0 && password.length > 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate({ to: "/login-success" });
  };

  return (
    <div className="mobile-shell min-h-screen bg-cream flex flex-col items-center px-6 pt-[118px] pb-[120px] relative overflow-hidden">
      {/* Language toggle — top right */}
      <div className="absolute top-5 right-6">
        <LangToggle />
      </div>

      <img src={logoAroma.url} alt="Aroma" className="h-[50px] w-auto" />

      <h1 className="font-serif text-[34px] leading-none mt-[34px] text-foreground font-bold">{t("welcomeBack")}</h1>
      <p className="text-[15px] text-foreground/75 mt-4">{t("loginSubtitle")}</p>

      <form onSubmit={onSubmit} className="mt-[34px] w-full">
        <label className="block">
          <span className="text-[12px] font-bold tracking-[0.18em] text-foreground">{t("whatsappNumber")}</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("whatsappPlaceholder")}
            inputMode="tel"
            className="mt-3 w-full bg-card rounded-full border border-border px-5 py-[15px] text-[15px] shadow-sm placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <label className="block mt-6">
          <span className="text-[12px] font-bold tracking-[0.18em] text-foreground">{t("password")}</span>
          <div className="relative mt-3">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("passwordPlaceholder")}
              className="w-full bg-card rounded-full border border-border pl-5 pr-12 py-[15px] text-[15px] shadow-sm placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </label>

        <div className="mt-4 text-right">
          <Link to="/forgot-password" className="text-[13px] font-medium text-brand underline underline-offset-2">{t("forgotPassword")}</Link>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`mt-8 w-full rounded-full h-12 font-semibold tracking-[0.18em] text-[16px] transition-colors ${
            canSubmit ? "bg-brand text-white" : "bg-tan/40 text-foreground/40 cursor-not-allowed"
          }`}
        >
          {t("loginBtn")}
        </button>
      </form>
    </div>
  );
}
