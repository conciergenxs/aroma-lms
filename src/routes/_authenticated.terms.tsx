import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ChevronLeft } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/terms")({
  component: TermsPage,
});

function TermsPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <Link to="/profile" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("back")}
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">{t("termsTitle")}</h1>
        <p className="text-[12px] text-foreground/55 mt-2">Last updated: 1 January 2026</p>

        <div className="mt-6 space-y-5 text-[14px] leading-relaxed text-foreground/80">
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing Aroma BA-Helper you confirm that you are an authorised brand ambassador
              employed by, or contracted to, PT Aroma Abadi or one of its retail partners. The
              platform is offered as an internal learning tool for the fashion and beauty brands we
              distribute, including Laura Mercier, Dolce &amp; Gabbana Beauty, bareMinerals, Tom Ford,
              and YSL Beauty.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">2. Use of Learning Content</h2>
            <p className="mt-2">
              Product modules, knowledge cards, swatches, and AI advisor responses are confidential
              training material. You may not screenshot, redistribute, or reuse them in customer-facing
              channels without written approval from the brand owner.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">3. AI Assistant</h2>
            <p className="mt-2">
              The Aroma Abadi BA-Helper assistant generates suggestions for selling, shade matching,
              and ingredient context. Responses are guidance only and should never replace official
              brand training, regulatory claims, or counter manager instructions.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">4. Account Responsibilities</h2>
            <p className="mt-2">
              You are responsible for safeguarding your login credentials. Sharing your account with
              another BA, family member, or third party is prohibited and may lead to suspension.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">5. Intellectual Property</h2>
            <p className="mt-2">
              All brand marks, photography, and copy belong to their respective beauty houses.
              Aroma BA-Helper licenses this material strictly for internal training during your
              tenure on counter.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">6. Changes to These Terms</h2>
            <p className="mt-2">
              We may update these terms when new brands launch or platform features evolve. We will
              notify you in-app and via your registered work email at least seven days before
              changes take effect.
            </p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
