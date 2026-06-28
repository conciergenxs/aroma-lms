import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import logoAroma from "@/assets/logo-aroma.svg.asset.json";

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
    <div className="min-h-screen bg-cream flex flex-col items-center justify-start pt-32 px-6 relative overflow-hidden">
      <div className="h-20 w-20 rounded-full bg-tan flex items-center justify-center shadow-lg">
        <Check className="h-9 w-9 text-white" strokeWidth={3} />
      </div>
      <h1 className="font-serif text-3xl mt-8">Login Success!</h1>
      <p className="text-sm text-foreground/70 mt-2">Redirecting to your learning modules...</p>
      <div className="mt-6 pt-5 border-t border-foreground/15 w-72 text-center">
        <div className="font-semibold tracking-widest text-sm">LAURA MERCIER</div>
        <div className="text-[10px] tracking-widest text-foreground/60 mt-1">PARIS · NEW YORK</div>
      </div>

      <img
        src={logoAroma.url}
        alt=""
        aria-hidden
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] max-w-none opacity-[0.18] grayscale pointer-events-none"
        style={{ filter: "grayscale(1) brightness(1.2)" }}
      />
      <Link to="/home" className="sr-only">Continue</Link>
    </div>
  );
}
