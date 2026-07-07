import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import logoAroma from "@/assets/logo-aroma.svg.asset.json";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="bg-ink text-white/85 mt-[100px] pt-14 pb-[110px]">
      <div className="px-5 text-center">
        <img src={logoAroma.url} alt="Aroma" className="h-[58px] w-auto mx-auto opacity-95 invert brightness-0" />
        <div className="mt-8 flex items-center justify-center gap-9 text-sm">
          <Link to="/faq" className="underline underline-offset-4 hover:text-gold transition-colors">{t("faqTitle")}</Link>
          <Link to="/terms" className="underline underline-offset-4 hover:text-gold transition-colors">{t("termsConditions")}</Link>
          <Link to="/privacy" className="underline underline-offset-4 hover:text-gold transition-colors">{t("privacyPolicy")}</Link>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 text-sm text-white/85">
          © 2026 PT Aroma Abadi
        </div>
      </div>
    </footer>
  );
}
