import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/help")({
  component: HelpPage,
});

const WA_NUMBER = "6281200000000";
const WA_MESSAGE = encodeURIComponent(
  "Hi Aroma AI, I need help with my account.",
);

function HelpPage() {
  return (
    <>
      <div className="px-[24px] pt-[28px]">
        <Link to="/profile" className="inline-flex items-center text-sm text-brand font-semibold mb-4">
          <ChevronLeft className="h-4 w-4" /> Back to Profile
        </Link>
        <h1 className="font-serif text-[28px] font-medium leading-tight">
          We're here to help
        </h1>
        <p className="text-[14px] text-foreground/75 mt-4 leading-relaxed">
          Whether you have a question about a module, need help with your account,
          or want product guidance from our beauty advisors — our support team is
          ready to assist. Reach out anytime and we'll get back to you as soon as
          possible.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-xl bg-card border border-border p-5"
        >
          <h2 className="font-serif text-[20px] font-medium">Contact Support</h2>
          <p className="text-[13px] text-foreground/70 mt-2 leading-relaxed">
            Chat with our AI assistant directly on WhatsApp for instant answers
            about products, training modules, or account help. Available 24/7.
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
          Or email us at <span className="text-brand font-semibold">support@aroma.id</span>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
