import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, Eye, EyeOff, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

type Rule = {
  id: string;
  labelId: string;
  labelEn: string;
  test: (pw: string) => boolean;
};

const rules: Rule[] = [
  { id: "length", labelId: "8-30 karakter", labelEn: "8-30 characters", test: (pw) => pw.length >= 8 && pw.length <= 30 },
  { id: "upper", labelId: "1 huruf kapital", labelEn: "1 uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { id: "lower", labelId: "1 huruf kecil", labelEn: "1 lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { id: "number", labelId: "1 angka (0-9)", labelEn: "1 number (0-9)", test: (pw) => /[0-9]/.test(pw) },
  { id: "symbol", labelId: "1 simbol (! @ # $ % ^ & * ( ) , . ? \" : { } | < >)", labelEn: "1 symbol (! @ # $ % ^ & * ( ) , . ? \" : { } | < >)", test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
];

function RuleRow({ ok, label, delay }: { ok: boolean; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-2.5"
    >
      <motion.span
        animate={{
          backgroundColor: ok ? "#6b0f1a" : "rgba(0,0,0,0.06)",
          scale: ok ? 1 : 0.92,
        }}
        transition={{ duration: 0.2 }}
        className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
      >
        <AnimatePresence mode="wait">
          {ok ? (
            <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </motion.span>
          ) : (
            <motion.span key="x" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <X className="h-3 w-3 text-foreground/30" strokeWidth={3} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
      <span className={`text-[13px] transition-colors ${ok ? "text-foreground" : "text-foreground/50"}`}>{label}</span>
    </motion.div>
  );
}

function ResetPasswordPage() {
  const { lang } = useI18n();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const results = useMemo(() => rules.map((r) => ({ ...r, ok: r.test(password) })), [password]);
  const allValid = results.every((r) => r.ok);
  const matches = confirm.length > 0 && confirm === password;
  const canSubmit = allValid && matches;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setDone(true);
  };

  return (
    <div className={`mobile-shell min-h-screen bg-cream flex flex-col px-6 relative overflow-hidden ${done ? "items-center justify-center" : "pt-[80px] pb-[120px]"}`}>
      {!done && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-5 left-6"
        >
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-brand font-semibold">
            <ChevronLeft className="h-4 w-4" />
            {lang === "id" ? "Kembali" : "Back"}
          </Link>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="w-full"
          >
            <h1 className="font-serif text-[30px] leading-tight font-bold text-foreground">
              {lang === "id" ? "Buat Kata Sandi Baru" : "Create New Password"}
            </h1>
            <p className="text-[15px] text-foreground/75 mt-3 leading-relaxed">
              {lang === "id"
                ? "Buat kata sandi baru untuk akun Aroma BA-Helper kamu."
                : "Create a new password for your Aroma BA-Helper account."}
            </p>

            <form onSubmit={onSubmit} className="mt-8 w-full">
              <label className="block">
                <span className="text-[12px] font-bold tracking-[0.18em] text-foreground">
                  {lang === "id" ? "KATA SANDI BARU" : "NEW PASSWORD"}
                </span>
                <div className="relative mt-3">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={lang === "id" ? "Masukkan kata sandi baru.." : "Enter your new password.."}
                    className="w-full bg-card rounded-full border border-border pl-5 pr-12 py-[15px] text-[15px] shadow-sm placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>

              <label className="block mt-5">
                <span className="text-[12px] font-bold tracking-[0.18em] text-foreground">
                  {lang === "id" ? "KONFIRMASI KATA SANDI" : "CONFIRM PASSWORD"}
                </span>
                <div className="relative mt-3">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder={lang === "id" ? "Konfirmasi kata sandi baru.." : "Confirm your new password.."}
                    className={`w-full bg-card rounded-full border pl-5 pr-12 py-[15px] text-[15px] shadow-sm placeholder:text-foreground/35 focus:outline-none focus:ring-2 transition-colors ${
                      confirm.length > 0 && !matches
                        ? "border-red-300 focus:ring-red-200"
                        : "border-border focus:ring-brand/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {confirm.length > 0 && !matches && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-[12px] text-red-600 pl-1"
                  >
                    {lang === "id" ? "Kata sandi tidak cocok" : "Passwords do not match"}
                  </motion.p>
                )}
              </label>

              <div className="mt-6 bg-card rounded-xl border border-border px-4 py-4">
                <p className="text-[12px] font-bold tracking-wide text-foreground/60 mb-3">
                  {lang === "id" ? "Kata sandi wajib memiliki:" : "Password required at least:"}
                </p>
                <div className="space-y-2.5">
                  {results.map((r, i) => (
                    <RuleRow key={r.id} ok={r.ok} label={lang === "id" ? r.labelId : r.labelEn} delay={i * 0.03} />
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileTap={canSubmit ? { scale: 0.97 } : {}}
                transition={{ duration: 0.2 }}
                className={`mt-8 w-full h-12 rounded-full font-semibold text-[16px] transition-colors ${
                  canSubmit
                    ? "bg-brand text-white hover:brightness-110"
                    : "bg-tan/40 text-foreground/40 cursor-not-allowed"
                }`}
              >
                {lang === "id" ? "Simpan Kata Sandi Baru" : "Save New Password"}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="w-full flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
              className="h-[88px] w-[88px] rounded-full bg-brand/10 flex items-center justify-center mb-6"
            >
              <Check className="h-11 w-11 text-brand" strokeWidth={2.5} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-[28px] font-bold"
            >
              {lang === "id" ? "Kata Sandi Diperbarui!" : "Password Updated!"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[15px] text-foreground/65 mt-3 leading-relaxed max-w-[280px]"
            >
              {lang === "id"
                ? "Kata sandi kamu berhasil diubah. Silakan login dengan kata sandi baru."
                : "Your password has been updated. Please login with your new password."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 w-full"
            >
              <Link
                to="/"
                className="w-full h-12 rounded-full bg-brand text-white font-semibold text-[16px] flex items-center justify-center hover:brightness-110 transition-all"
              >
                {lang === "id" ? "Kembali ke Login" : "Back to Login"}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
