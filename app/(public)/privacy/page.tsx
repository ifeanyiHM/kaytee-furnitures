import type { Metadata } from "next";
import { ReadingProgress } from "@/components/legal/ReadingProgress";
import { LegalToc } from "@/components/legal/LegalToc";
import { RiCheckLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Kaytee Furnitures & Interior collects, uses and protects information submitted through its website.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "12 November 2026";

const PLAIN_ENGLISH = [
  "We collect the contact and project details you choose to share through our enquiry forms.",
  "We do not sell your personal information.",
  "You may contact us to ask about accessing or correcting the information you submitted.",
  "We explain how website technologies and service providers may handle technical information in this policy.",
];

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      "We collect information you give us directly when you submit a project enquiry or contact form. This may include your name, email address, phone number, project location, budget range, space size and project description.",
      "The hosting platform and technical services that deliver the website may process basic connection information, such as IP address, browser type and device information, for security and operation.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    body: [
      "We use the information we collect to respond to enquiries, discuss interior design projects, prepare project-specific proposals where appropriate, and communicate with you about your enquiry.",
      "We do not use project enquiry details for unrelated marketing communications.",
    ],
  },
  {
    id: "sharing-information",
    title: "Sharing your information",
    body: [
      "We do not sell your personal information.",
      "We may share your information with service providers that help host the website, process forms or deliver email, only where needed to operate the site and respond to your enquiry.",
      "This website does not currently take online payments or create customer accounts. Enquiry details are sent to the studio by email so the team can respond to the request.",
      "We may disclose information where required by law, to protect our legal rights, or in connection with a business transfer such as a merger or acquisition.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & tracking",
    body: [
      "The website may rely on essential technical storage or cookies provided by the hosting platform and services used to operate the site. We do not currently describe any separate advertising or analytics tracking programme here.",
      "You can review and manage cookies through your browser settings. Blocking essential cookies or storage may affect site functionality.",
    ],
  },
  {
    id: "data-retention",
    title: "Data retention",
    body: [
      "We retain personal information for as long as necessary to fulfil the purposes described in this policy, including any ongoing project, legal, accounting, or reporting requirements.",
      "Where you have not proceeded with a project, enquiry details are generally retained for a limited period before being deleted or anonymised.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "Depending on applicable law, you may have the right to access, correct, delete, or restrict the use of your personal information, and to withdraw consent for marketing communications at any time.",
      "To exercise any of these rights, contact us using the details at the end of this policy.",
    ],
  },
  {
    id: "data-security",
    title: "Data security",
    body: [
      "We take reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's privacy",
    body: [
      "Our services are directed at adults and businesses. We do not knowingly collect personal information from children.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time to reflect changes in our practices or for legal reasons. The date at the top of this page indicates when it was last revised.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
              id="privacy-grid"
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
          <rect width="100%" height="100%" fill="url(#privacy-grid)" />
        </svg>
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/40 to-charcoal" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="font-sans text-[11px] text-brand-400 tracking-[0.3em] uppercase mb-6">
            Legal
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-[1.05] mb-6">
            Privacy Policy
          </h1>
          <p className="font-sans text-white/55 text-base leading-relaxed max-w-lg mx-auto mb-7">
            How we collect, use, and protect your information when you visit
            this site or work with our studio.
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

      {/* ── Full policy ── */}
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
