import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ChevronLeft } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/privacy")({
  component: PrivacyPage,
});

const privacyContent = {
  en: [
    { h: "What we collect", p: "We collect your name, work email, store location, learning progress, and chat transcripts with the AI advisor. We do not collect customer data through this app — avoid pasting customer names, phone numbers, or transaction details into chat." },
    { h: "How we use it", p: "Learning progress powers your dashboard and helps brand educators (Laura Mercier, Dolce & Gabbana, bareMinerals, etc.) tailor future training. Chat history allows you to revisit past conversations and improves AI quality over time." },
    { h: "Who can see your data", p: "Your direct counter manager and the Aroma Abadi beauty enablement team can view aggregated learning stats. Individual chat content is private to your account except when escalated for support." },
    { h: "Data retention", p: "Learning records are retained for the duration of your employment plus 12 months. Chat transcripts older than 90 days are anonymised and used only for AI quality." },
    { h: "Your rights", p: "You can request export or deletion of your personal data by contacting privacy@aroma.id. We respond within 14 working days." },
    { h: "Security", p: "Aroma BA-Helper uses encrypted transport, restricted admin access, and quarterly security reviews. Please report any suspicious activity to security@aroma.id." },
  ],
  id: [
    { h: "Apa yang kami kumpulkan", p: "Kami mengumpulkan nama, email kerja, lokasi toko, progress belajar, dan transkrip chat dengan asisten AI. Kami tidak mengumpulkan data pelanggan melalui aplikasi ini — hindari menempelkan nama pelanggan, nomor telepon, atau detail transaksi ke dalam chat." },
    { h: "Cara kami menggunakannya", p: "Progress belajar menampilkan dasbor kamu dan membantu brand educator (Laura Mercier, Dolce & Gabbana, bareMinerals, dll.) menyesuaikan pelatihan berikutnya. Riwayat chat memungkinkan kamu meninjau percakapan sebelumnya dan meningkatkan kualitas AI." },
    { h: "Siapa yang dapat melihat datamu", p: "Manajer counter langsung dan tim beauty enablement Aroma Abadi dapat melihat statistik belajar secara agregat. Konten chat individu bersifat privat kecuali dieskalasi untuk dukungan." },
    { h: "Penyimpanan data", p: "Catatan belajar disimpan selama masa kerja kamu ditambah 12 bulan. Transkrip chat lebih dari 90 hari dianonimkan dan hanya digunakan untuk kualitas AI." },
    { h: "Hak kamu", p: "Kamu dapat meminta ekspor atau penghapusan data pribadi dengan menghubungi privacy@aroma.id. Kami merespons dalam 14 hari kerja." },
    { h: "Keamanan", p: "Aroma BA-Helper menggunakan enkripsi transport, akses admin terbatas, dan tinjauan keamanan berkala. Laporkan aktivitas mencurigakan ke security@aroma.id." },
  ],
};

function PrivacyPage() {
  const { t, lang } = useI18n();
  const sections = lang === "id" ? privacyContent.id : privacyContent.en;
  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <Link to="/profile" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("back")}
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">{t("privacyTitle")}</h1>
        <p className="text-[12px] text-foreground/55 mt-2">{t("privacyEffective")}</p>
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
