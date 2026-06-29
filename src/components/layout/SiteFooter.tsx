import { Link } from "@tanstack/react-router";
import logoAroma from "@/assets/logo-aroma.svg.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white/85 pt-14 pb-[100px]">
      <div className="px-5 text-center">
        <img src={logoAroma.url} alt="Aroma" className="h-[58px] w-auto mx-auto opacity-95 invert brightness-0" />
        <div className="mt-8 flex items-center justify-center gap-9 text-sm">
          <Link to="/faq" className="underline underline-offset-4 hover:text-gold transition-colors">FAQ</Link>
          <Link to="/terms" className="underline underline-offset-4 hover:text-gold transition-colors">T&amp;C</Link>
          <Link to="/privacy" className="underline underline-offset-4 hover:text-gold transition-colors">Privacy Policy</Link>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 text-sm text-white/85">
          © 2026 PT Aroma Abadi
        </div>
      </div>
    </footer>
  );
}
