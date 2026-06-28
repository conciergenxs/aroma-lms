import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import navLogo from "@/assets/navbar-logo.svg.asset.json";

export function TopHeader() {
  return (
    <header className="sticky top-0 z-30 bg-cream border-b border-black/5">
      <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
        <Link to="/home" className="flex items-center">
          <img src={navLogo.url} alt="Aroma · Laura Mercier" className="h-7 w-auto" />
        </Link>
        <Link
          to="/profile"
          aria-label="Profile"
          className="h-9 w-9 rounded-full border border-brand/40 flex items-center justify-center text-brand"
        >
          <User className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
