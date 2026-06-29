import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { User, Lock, HelpCircle, LogOut, Camera, Mail, Award } from "lucide-react";
import { motion } from "framer-motion";
import avatarBella from "@/assets/avatar-bella.jpg";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

const menuItems = [
  { icon: User, label: "Change Username", to: "/profile" },
  { icon: Lock, label: "Change Password", to: "/profile" },
  { icon: HelpCircle, label: "Help", to: "/faq" },
] as const;

const achievements = [
  { label: "First Article", unlocked: true },
  { label: "10 Articles", unlocked: true },
  { label: "50 Articles", unlocked: false },
  { label: "Beauty Expert", unlocked: false },
];

const stats = [
  { value: 24, label: "Modules Read" },
  { value: 120, label: "Minutes Reading" },
  { value: 7, label: "Day Streak" },
];

function ProfilePage() {
  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="relative h-[120px] w-[120px] rounded-full overflow-hidden ring-4 ring-card shadow-md"
          >
            <img src={avatarBella} alt="Bella Victoria" className="h-full w-full object-cover" width={320} height={320} />
            <button
              aria-label="Change photo"
              className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-brand text-white flex items-center justify-center shadow"
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
          <motion.div whileTap={{ scale: 0.98 }}>
            <Link
              to="/"
              className="flex items-center gap-3 bg-card rounded-xl border border-brand/40 px-4 py-3.5 text-[15px] text-brand font-medium hover:bg-brand/5 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
          </motion.div>
        </div>

        <h2 className="mt-10 font-serif text-[22px] font-medium">Your Achievements</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border p-5 flex flex-col items-center gap-2 ${
                a.unlocked
                  ? "bg-[#f5a8ad] border-[#f5a8ad] text-white"
                  : "bg-card border-border text-foreground/30"
              }`}
            >
              <Award className="h-8 w-8" strokeWidth={1.5} />
              <span className="text-sm font-medium text-center">{a.label}</span>
            </motion.div>
          ))}
        </div>

        <h2 className="mt-10 font-serif text-[22px] font-medium">Reading Statistics</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 220 }}
              className="rounded-xl bg-card border border-border p-4 text-center"
            >
              <div className="font-serif text-[28px] text-brand font-medium leading-none">{s.value}</div>
              <div className="mt-2 text-[11px] text-foreground/60 leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
