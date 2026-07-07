import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ChevronLeft } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/terms")({
  component: TermsPage,
});

const termsContent = {
  en: [
    { h: "1. Acceptance of Terms", p: "By accessing Aroma BA-Helper you confirm that you are an authorised brand ambassador employed by, or contracted to, PT Aroma Abadi or one of its retail partners. The platform is offered as an internal learning tool for the fashion and beauty brands we distribute, including Laura Mercier, Dolce & Gabbana Beauty, bareMinerals, Tom Ford, and YSL Beauty." },
    { h: "2. Use of Learning Content", p: "Product modules, knowledge cards, swatches, and AI advisor responses are confidential training material. You may not screenshot, redistribute, or reuse them in customer-facing channels without written approval from the brand owner." },
    { h: "3. AI Assistant", p: "The Aroma Abadi BA-Helper assistant generates suggestions for selling, shade matching, and ingredient context. Responses are guidance only and should never replace official brand training, regulatory claims, or counter manager instructions." },
    { h: "4. Account Responsibilities", p: "You are responsible for safeguarding your login credentials. Sharing your account with another BA, family member, or third party is prohibited and may lead to suspension." },
    { h: "5. Intellectual Property", p: "All brand marks, photography, and copy belong to their respective beauty houses. Aroma BA-Helper licenses this material strictly for internal training during your tenure on counter." },
    { h: "6. Changes to These Terms", p: "We may update these terms when new brands launch or platform features evolve. We will notify you in-app and via your registered work email at least seven days before changes take effect." },
  ],
  id: [
    { h: "1. Penerimaan Syarat", p: "Dengan mengakses Aroma BA-Helper, kamu menyatakan bahwa kamu adalah brand ambassador resmi yang dipekerjakan atau dikontrak oleh PT Aroma Abadi atau salah satu mitra ritelnya. Platform ini disediakan sebagai alat belajar internal untuk brand fashion dan kecantikan yang kami distribusikan, termasuk Laura Mercier, Dolce & Gabbana Beauty, bareMinerals, Tom Ford, dan YSL Beauty." },
    { h: "2. Penggunaan Konten Belajar", p: "Modul produk, kartu pengetahuan, swatch, dan respons asisten AI adalah materi pelatihan rahasia. Kamu tidak boleh mengambil tangkapan layar, mendistribusikan ulang, atau menggunakannya di saluran yang menghadap pelanggan tanpa persetujuan tertulis dari pemilik brand." },
    { h: "3. Asisten AI", p: "Asisten BA-Helper Aroma Abadi menghasilkan saran untuk penjualan, pencocokan shade, dan konteks bahan. Respons hanya sebagai panduan dan tidak boleh menggantikan pelatihan brand resmi, klaim regulasi, atau instruksi manajer counter." },
    { h: "4. Tanggung Jawab Akun", p: "Kamu bertanggung jawab menjaga kerahasiaan kredensial login. Berbagi akun dengan BA lain, anggota keluarga, atau pihak ketiga dilarang dan dapat mengakibatkan penangguhan." },
    { h: "5. Kekayaan Intelektual", p: "Semua merek dagang, foto, dan teks milik masing-masing beauty house. Aroma BA-Helper melisensikan materi ini khusus untuk pelatihan internal selama masa kerjamu di counter." },
    { h: "6. Perubahan Syarat Ini", p: "Kami dapat memperbarui syarat ini saat brand baru diluncurkan atau fitur platform berkembang. Kami akan memberi tahu kamu di dalam aplikasi dan melalui email kerja terdaftar setidaknya tujuh hari sebelum perubahan berlaku." },
  ],
};

function TermsPage() {
  const { t, lang } = useI18n();
  const sections = lang === "id" ? termsContent.id : termsContent.en;
  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <Link to="/profile" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("back")}
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">{t("termsTitle")}</h1>
        <p className="text-[12px] text-foreground/55 mt-2">{t("termsUpdated")}</p>
        <div className="mt-6 space-y-5 text-[14px] leading-relaxed text-foreground/80">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-serif text-[18px] font-medium text-foreground">{s.h}</h2>
              <p className="mt-2">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
