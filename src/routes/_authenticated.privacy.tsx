import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <Link to="/profile" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> Back
        </Link>
        <h1 className="font-serif text-[31px] font-medium leading-none">Privacy Policy</h1>
        <p className="text-[12px] text-foreground/55 mt-2">Effective: 1 January 2026</p>

        <div className="mt-6 space-y-5 text-[14px] leading-relaxed text-foreground/80">
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">What we collect</h2>
            <p className="mt-2">
              We collect your name, work email, store location, learning progress, and chat
              transcripts with the AI advisor. We do not collect customer data through this app —
              avoid pasting customer names, phone numbers, or transaction details into chat.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">How we use it</h2>
            <p className="mt-2">
              Learning progress powers your dashboard and helps brand educators (Laura Mercier,
              Dolce &amp; Gabbana, bareMinerals, etc.) tailor future training. Chat history allows you
              to revisit past conversations and improves AI quality over time.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">Who can see your data</h2>
            <p className="mt-2">
              Your direct counter manager and the Aroma Abadi beauty enablement team can view
              aggregated learning stats. Individual chat content is private to your account except
              when escalated for support.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">Data retention</h2>
            <p className="mt-2">
              Learning records are retained for the duration of your employment plus 12 months.
              Chat transcripts older than 90 days are anonymised and used only for AI quality.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">Your rights</h2>
            <p className="mt-2">
              You can request export or deletion of your personal data by contacting
              privacy@aroma.id. We respond within 14 working days.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-[18px] font-medium text-foreground">Security</h2>
            <p className="mt-2">
              Aroma BA-Helper uses encrypted transport, restricted admin access, and quarterly
              security reviews. Please report any suspicious activity to security@aroma.id.
            </p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
