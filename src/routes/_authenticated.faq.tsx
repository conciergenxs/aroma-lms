import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/faq")({
  component: FaqPage,
});

const faqs = [
  {
    q: "Apa itu Aroma BA-Helper?",
    a: "Aroma BA-Helper adalah platform belajar internal untuk brand ambassador PT Aroma Abadi. Platform ini menyediakan pelatihan produk, cerita brand, dan tips penjualan di counter — mencakup Laura Mercier, Dolce & Gabbana, bareMinerals, dan lainnya.",
  },
  {
    q: "Bagaimana cara menyelesaikan modul belajar?",
    a: "Buka modul dari halaman Beranda atau Belajarku, lalu geser setiap kartu pengetahuan hingga selesai. Modul dinyatakan selesai setelah kamu membaca semua kartu pengetahuan.",
  },
  {
    q: "Bisakah saya chat dengan AI tentang produk tertentu?",
    a: "Bisa. Di dalam modul, ketuk ikon asisten melayang. Chat akan terbuka dengan produk tersebut sebagai konteks, sehingga kamu bisa bertanya tentang bahan, hasil akhir, cocok shade, dan poin penjualan.",
  },
  {
    q: "Apakah statistik belajar saya dibagikan ke atasan?",
    a: "Statistik belajar umum (modul yang sudah dibaca, streak) dapat dilihat oleh supervisor counter untuk mendukung coaching. Percakapan chat tetap bersifat privat.",
  },
  {
    q: "Brand apa saja yang tersedia saat ini?",
    a: "Laura Mercier adalah katalog utama kami. Dolce & Gabbana Beauty, bareMinerals, Rimmel, dan Sisley sedang diperluas secara bertahap ke counter-counter di Indonesia.",
  },
  {
    q: "Bagaimana cara melaporkan bug atau meminta modul baru?",
    a: "Gunakan opsi Bantuan di Profil → Pengaturan Akun, atau email ke support@aroma.id. Tim beauty enablement kami menangani permintaan setiap minggu.",
  },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <Link to="/profile" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> Kembali
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">FAQ</h1>
        <p className="text-[14px] text-foreground/70 mt-3">
          Semua yang perlu kamu ketahui tentang penggunaan Aroma BA-Helper di counter.
        </p>

        <div className="mt-6 space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full px-4 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-serif text-[16px] font-medium pr-4">{f.q}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-5 w-5 text-brand shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-[14px] leading-relaxed text-foreground/75">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
