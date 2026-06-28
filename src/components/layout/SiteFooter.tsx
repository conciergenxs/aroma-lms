import logoAroma from "@/assets/logo-aroma.svg.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white/80 pt-10 pb-12 mt-12">
      <div className="mx-auto max-w-md px-6 text-center">
        <img src={logoAroma.url} alt="Aroma" className="h-10 w-auto mx-auto opacity-90 invert" />
        <div className="mt-6 flex items-center justify-center gap-8 text-sm">
          <a href="#" className="underline underline-offset-4">FAQ</a>
          <a href="#" className="underline underline-offset-4">T&amp;C</a>
          <a href="#" className="underline underline-offset-4">Privacy Policy</a>
        </div>
        <div className="mt-6 border-t border-white/15 pt-5 text-xs text-white/60">
          © 2026 PT Aroma Abadi
        </div>
      </div>
    </footer>
  );
}
