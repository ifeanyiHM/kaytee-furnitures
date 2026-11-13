import type { Metadata } from "next";
import { ReadingProgress } from "@/components/legal/ReadingProgress";
import { LegalToc } from "@/components/legal/LegalToc";
import { RiCheckLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing use of the Kaytee Furnitures & Interior website and interior design engagements.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "12 November 2026";

const PLAIN_ENGLISH = [
  "Submitting a project enquiry does not create a contract — a formal engagement begins when we agree on a written proposal or agreement.",
  "Project-specific fees and deliverables are agreed in writing before work begins.",
  "Our project photography and content belong to us — please don't reuse it without asking.",
  "Nigerian law governs these terms, and we're always reachable if something's unclear.",
];

const SECTIONS = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: [
      "By accessing or using this website, or by submitting a project enquiry to Kaytee Furnitures & Interior, you agree to be bound by these Terms of Use. If you do not agree, please do not use the website or our services.",
    ],
  },
  {
    id: "use-of-website",
    title: "Use of the website",
    body: [
      "You may use this website for lawful purposes only. You agree not to misuse the site, attempt to gain unauthorised access to any part of it, or interfere with its normal operation.",
      "We may update, suspend, or discontinue any part of the website at any time without notice.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      "All content on this website — including text, images, project photography, logos, and design — is the property of Kaytee Furnitures or its licensors, unless otherwise stated, and is protected by applicable intellectual property laws.",
      "You may not reproduce, distribute, or create derivative works from this content without our prior written permission.",
    ],
  },
  {
    id: "services-bookings",
    title: "Services & bookings",
    body: [
      "Submitting a project enquiry through this website does not itself create a binding contract. A formal engagement begins only once both parties agree to a written proposal or agreement.",
      "Project scope, deliverables, schedules, fees, payment arrangements and any cancellation terms will be set out in a separate proposal or agreement before work begins. A website enquiry alone does not establish those terms.",
    ],
  },
  {
    id: "user-conduct",
    title: "User conduct",
    body: [
      "When communicating with us — through forms, email, or otherwise — you agree to provide accurate information and not to submit content that is unlawful, abusive, or infringes on the rights of others.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    body: [
      "This website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of any linked third-party site.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer of warranties",
    body: [
      'This website and its content are provided "as is" without warranties of any kind, whether express or implied, including but not limited to accuracy, completeness, or fitness for a particular purpose.',
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Kaytee Furnitures & Interior shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or our services.",
      "Any project-specific responsibilities, limitations and remedies should be addressed in the written agreement for that engagement.",
    ],
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: [
      "You agree to indemnify and hold Kaytee Furnitures harmless from any claims, damages, or expenses arising from your misuse of the website or violation of these terms.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: [
      "These terms are governed by the laws of the Federal Republic of Nigeria. Any dispute will be handled by a court with appropriate jurisdiction under applicable law.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We may revise these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms. The date at the top of this page indicates when it was last updated.",
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <>
      <ReadingProgress />

      {/* ── Hero — textured, echoing the studio’s interior design palette ── */}
      <section className="relative pt-40 pb-20 bg-charcoal overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="terms-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="#b8956a"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#terms-grid)" />
        </svg>
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/40 to-charcoal" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="font-sans text-[11px] text-brand-400 tracking-[0.3em] uppercase mb-6">
            Legal
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-[1.05] mb-6">
            Terms of Use
          </h1>
          <p className="font-sans text-white/55 text-base leading-relaxed max-w-lg mx-auto mb-7">
            The terms governing your use of this website and your relationship
            with our studio.
          </p>
          <div className="inline-flex items-center gap-2 border border-white/15 px-4 py-1.5">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full" />
            <span className="font-sans text-[11px] text-white/60 tracking-wide">
              Last updated {LAST_UPDATED}
            </span>
          </div>
        </div>
      </section>

      {/* ── Plain English summary ── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-sans text-[11px] text-brand-600 tracking-[0.26em] uppercase mb-8 text-center">
            In plain English
          </p>
          <div className="grid sm:grid-cols-2 border-t border-l border-sand-200">
            {PLAIN_ENGLISH.map((line) => (
              <div
                key={line}
                className="flex items-start gap-3 border-r border-b border-sand-200 p-6"
              >
                <RiCheckLine className="w-4 h-4 text-brand-600 shrink-0 mt-1" />
                <p className="font-display text-charcoal-light leading-snug">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full terms ── */}
      <section className="bg-sand-50 pb-24 lg:pb-32 pt-4">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-20">
            <nav className="hidden lg:block">
              <LegalToc sections={SECTIONS} />
            </nav>

            <div>
              {SECTIONS.map((s, i) => (
                <div
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-28 py-10 border-b border-sand-200 last:border-b-0"
                >
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-hero text-lg text-brand-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl text-charcoal">
                      {s.title}
                    </h2>
                  </div>
                  <div className="space-y-4 pl-9 max-w-2xl">
                    {s.body.map((p, pi) => (
                      <p
                        key={pi}
                        className="font-sans text-sm leading-relaxed text-charcoal-muted sm:text-base"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
