import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import navLogo from "@/assets/navbar-logo.svg.asset.json";

export function TopHeader() {
  return (
    <header className="sticky top-0 z-30 bg-card border-b border-black/10">
      <div className="w-full px-6 h-[70px] flex items-center justify-between">
        <Link to="/home" className="flex items-center">
          <img src={navLogo.url} alt="Aroma · Laura Mercier" className="h-[31px] w-auto" />
        </Link>
        <Link
          to="/profile"
          aria-label="Profile"
          className="h-8 w-8 rounded-full border border-brand/35 flex items-center justify-center text-brand"
        >
          <User className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
