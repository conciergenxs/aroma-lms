import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="px-[14px] pt-[28px]">
      <h1 className="font-serif text-[31px] font-bold leading-none">Profile</h1>
      <div className="mt-6 bg-card rounded-lg border border-border p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-brand/10 flex items-center justify-center font-serif text-2xl text-brand">B</div>
          <div>
            <div className="font-serif text-xl">Bella Victoria</div>
            <div className="text-sm text-foreground/60">bellavictoria402</div>
          </div>
        </div>
      </div>
      <Link to="/" className="mt-5 flex items-center justify-center gap-2 bg-brand text-brand-foreground rounded-full py-3 font-semibold tracking-widest text-sm">
        <LogOut className="h-4 w-4" /> LOG OUT
      </Link>
      <SiteFooter />
    </div>
  );
}
