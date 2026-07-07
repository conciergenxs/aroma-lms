import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/help")({
  component: HelpPage,
});

const WA_NUMBER = "6281200000000";
const WA_MESSAGE = encodeURIComponent(
  "Halo Aroma AI, saya butuh bantuan untuk akun saya.",
);

function HelpPage() {
  const { t } = useI18n();
  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <Link to="/profile" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("backToProfile")}
        </Link>
        <h1 className="font-serif text-[28px] font-medium leading-tight">
          Kami Siap Membantu
        </h1>
        <p className="text-[14px] text-foreground/75 mt-4 leading-relaxed">
          Apakah kamu punya pertanyaan tentang modul, butuh bantuan akun,
          atau ingin panduan produk dari beauty advisor kami — tim support kami
          siap membantu. Hubungi kapan saja dan kami akan segera merespons.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-xl bg-card border border-border p-5"
        >
          <h2 className="font-serif text-[20px] font-medium">Hubungi Support</h2>
          <p className="text-[13px] text-foreground/70 mt-2 leading-relaxed">
            Chat dengan asisten AI kami langsung di WhatsApp untuk jawaban cepat
            tentang produk, modul pelatihan, atau bantuan akun. Tersedia 24 jam.
          </p>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 rounded-full hover:brightness-110 transition-all"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </motion.a>
        </motion.div>

        <div className="mt-6 text-center text-[12px] text-foreground/60">
          Atau email kami di <span className="text-brand font-semibold">support@aroma.id</span>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
