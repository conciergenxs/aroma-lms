import logoAroma from "@/assets/logo-aroma.svg.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white/85 pt-14 pb-20 mt-16 -mx-4">
      <div className="mobile-shell px-5 text-center">
        <img src={logoAroma.url} alt="Aroma" className="h-[58px] w-auto mx-auto opacity-95 invert brightness-0" />
        <div className="mt-8 flex items-center justify-center gap-9 text-sm">
          <a href="#" className="underline underline-offset-4">FAQ</a>
          <a href="#" className="underline underline-offset-4">T&amp;C</a>
          <a href="#" className="underline underline-offset-4">Privacy Policy</a>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 text-sm text-white/85">
          © 2026 PT Aroma Abadi
        </div>
      </div>
    </footer>
  );
}
