import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import logoAroma from "@/assets/logo-aroma.svg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — Aroma · Laura Mercier" },
      { name: "description", content: "Login to continue your beauty learning journey." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const canSubmit = username.length > 0 && password.length > 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate({ to: "/login-success" });
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center px-6 pt-20 relative overflow-hidden">
      {/* Brand mark */}
      <div className="text-brand">
        <svg viewBox="0 0 168 168" className="h-14 w-14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M87.3438 103.801C88.1242 101.689 91.2391 101.689 92.0194 103.801L94.1532 109.577C94.4031 110.253 94.9576 110.785 95.6622 111.024L101.685 113.071C103.887 113.819 103.887 116.806 101.685 117.555L95.6622 119.601C94.9576 119.841 94.4031 120.373 94.1532 121.049L92.0194 126.824C91.2391 128.937 88.1242 128.937 87.3438 126.824L85.21 121.049C84.9602 120.373 84.4056 119.841 83.7005 119.601L77.6781 117.555C75.4758 116.806 75.4758 113.819 77.6781 113.071L83.7005 111.024C84.4056 110.785 84.9602 110.253 85.21 109.577L87.3438 103.801Z"/>
          <path d="M96.417 38.8229C97.6062 35.5929 102.351 35.5929 103.54 38.8229L107.615 49.8935C107.996 50.9274 108.84 51.7408 109.914 52.1072L121.414 56.0299C124.77 57.1744 124.77 61.7424 121.414 62.8869L109.914 66.8096C108.84 67.176 107.996 67.9893 107.615 69.0233L103.54 80.0938C102.351 83.3239 97.6062 83.3239 96.417 80.0938L92.3422 69.0233C91.9619 67.9893 91.117 67.176 90.0428 66.8096L78.5431 62.8869C75.1874 61.7424 75.1874 57.1744 78.5431 56.0299L90.0428 52.1072C91.117 51.7408 91.9619 50.9274 92.3422 49.8935L96.417 38.8229Z"/>
          <path d="M54.7087 68.9213C55.585 66.4481 59.0826 66.4481 59.9589 68.9213L62.3551 75.6845C62.6356 76.4762 63.2584 77.0988 64.0501 77.3794L70.8128 79.7757C73.2861 80.6524 73.2861 84.1497 70.8128 85.0263L64.0501 87.4226C63.2584 87.7032 62.6356 88.3258 62.3551 89.1176L59.9589 95.8807C59.0826 98.3542 55.585 98.3542 54.7087 95.8807L52.3125 89.1176C52.032 88.3258 51.4092 87.7032 50.6175 87.4226L43.8548 85.0263C41.3817 84.1497 41.3817 80.6524 43.8548 79.7757L50.6175 77.3794C51.4092 77.0988 52.032 76.4762 52.3125 75.6845L54.7087 68.9213Z"/>
        </svg>
      </div>

      <h1 className="font-serif text-4xl mt-6 text-foreground">Welcome Back</h1>
      <p className="text-sm text-foreground/70 mt-2">Login to continue your learning journey</p>

      <form onSubmit={onSubmit} className="mt-8 w-full max-w-sm">
        <label className="block">
          <span className="text-[11px] font-bold tracking-widest text-foreground">USERNAME</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username.."
            className="mt-2 w-full bg-white rounded-full px-5 py-3.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>

        <label className="block mt-5">
          <span className="text-[11px] font-bold tracking-widest text-foreground">PASSWORD</span>
          <div className="relative mt-2">
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password.."
              className="w-full bg-white rounded-full px-5 py-3.5 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              aria-label={showPwd ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40"
            >
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>

        <div className="mt-3 text-right">
          <a href="#" className="text-xs font-semibold text-brand underline">Forgot Password?</a>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`mt-6 w-full rounded-full py-4 font-semibold tracking-widest text-sm transition-colors ${
            canSubmit
              ? "bg-brand text-white"
              : "bg-tan/40 text-foreground/40 cursor-not-allowed"
          }`}
        >
          LOGIN
        </button>
      </form>

      {/* Decorative lotus — light grey, blends with cream */}
      <img
        src={logoAroma.url}
        alt=""
        aria-hidden
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[120%] max-w-none pointer-events-none select-none"
        style={{ filter: "grayscale(1) brightness(1.25) opacity(0.22)" }}
      />
    </div>
  );
}
