import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import logoAroma from "@/assets/logo-aroma-upload.svg.asset.json";

export const Route = createFileRoute("/login-success")({
  component: LoginSuccess,
});

function LoginSuccess() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/home" }), 1400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="mobile-shell min-h-screen bg-cream flex flex-col items-center justify-start pt-[252px] px-6 relative overflow-hidden">
      <div className="h-24 w-24 rounded-full bg-tan flex items-center justify-center shadow-lg">
        <Check className="h-9 w-9 text-white" strokeWidth={3} />
      </div>
      <h1 className="font-serif text-[32px] font-bold leading-none mt-9">Login Success!</h1>
      <p className="text-[15px] text-foreground/75 mt-4">Redirecting to your learning modules...</p>
      <div className="mt-6 pt-6 border-t border-border w-[272px] text-center">
        <div className="font-bold tracking-tight text-lg leading-none">LAURA MERCIER</div>
        <div className="text-[9px] tracking-[0.28em] text-foreground/75 mt-1">PARIS · NEW YORK</div>
      </div>

      <img
        src={logoAroma.url}
        alt=""
        aria-hidden
        className="absolute -right-[190px] bottom-[92px] w-[560px] max-w-none grayscale pointer-events-none"
        style={{ filter: "grayscale(1) brightness(1.72) opacity(0.18)" }}
      />
      <Link to="/home" className="sr-only">Continue</Link>
    </div>
  );
}
