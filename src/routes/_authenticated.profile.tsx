import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { User, Lock, HelpCircle, LogOut, Camera, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import avatarBella from "@/assets/avatar-bella.jpg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

const menuItems = [
  { icon: User, label: "Change Username", to: "/change-username" as const },
  { icon: Lock, label: "Change Password", to: "/change-password" as const },
  { icon: HelpCircle, label: "Help", to: "/help" as const },
];


function ProfilePage() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="relative"
          >
            <div className="h-[120px] w-[120px] rounded-full overflow-hidden ring-4 ring-card shadow-md">
              <img src={avatarBella} alt="Bella Victoria" className="h-full w-full object-cover" width={320} height={320} />
            </div>
            <button
              aria-label="Change photo"
              className="absolute bottom-1 right-1 h-9 w-9 rounded-full bg-brand text-white flex items-center justify-center shadow-md ring-2 ring-card hover:brightness-110 transition-all"
            >
              <Camera className="h-4 w-4" />
            </button>
          </motion.div>
          <h1 className="mt-4 font-serif text-[28px] font-medium leading-none">Bella Victoria</h1>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground/65">
            <Mail className="h-4 w-4" /> bella.thompson@aroma.id
          </div>
        </div>

        <h2 className="mt-8 font-serif text-[22px] font-medium">Account Settings</h2>
        <div className="mt-3 space-y-2.5">
          {menuItems.map(({ icon: Icon, label, to }) => (
            <motion.div key={label} whileTap={{ scale: 0.98 }}>
              <Link
                to={to}
                className="flex items-center gap-3 bg-card rounded-xl border border-border px-4 py-3.5 text-[15px] hover:border-brand/40 transition-colors"
              >
                <Icon className="h-5 w-5 text-foreground/70" />
                <span>{label}</span>
              </Link>
            </motion.div>
          ))}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setLogoutOpen(true)}
            className="w-full flex items-center gap-3 bg-card rounded-xl border border-brand/40 px-4 py-3.5 text-[15px] text-brand font-medium hover:bg-brand/5 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </motion.button>
        </div>

      </div>

      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout from Aroma?</AlertDialogTitle>
            <AlertDialogDescription>
              You'll need to sign in again to access your learning progress and modules.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => navigate({ to: "/" })}
              className="bg-brand text-brand-foreground hover:brightness-110"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SiteFooter />
    </>
  );
}
