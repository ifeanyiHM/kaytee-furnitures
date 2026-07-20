import type { Metadata } from "next";
import { ReadingProgress } from "@/components/legal/ReadingProgress";
import { LegalToc } from "@/components/legal/LegalToc";
import { RiCheckLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Kaytee Furnitures collects, uses, and protects your information.",
};

const LAST_UPDATED = "18 July 2026";

const PLAIN_ENGLISH = [
  "We collect only what's needed to plan your project — contact details, budget range, and space info.",
  "We never sell your personal information to anyone, for any reason.",
  "You can ask to see, correct, or delete your data at any time.",
  "Cookies help the site run smoothly — you're always free to turn them off in your browser.",
];

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      "We collect information you give us directly — for example, when you fill in a consultation booking form, a contact form, or subscribe to updates. This typically includes your name, email address, phone number, and details about your project (budget range, space size, location, and description).",
      "We also collect limited technical information automatically when you use our website, such as your IP address, browser type, device type, and pages visited, through cookies and similar technologies.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    body: [
      "We use the information we collect to respond to enquiries, schedule and manage consultations, provide quotes, deliver our design and furniture services, and communicate with you about your project.",
      "With your consent, we may also use your contact details to send updates about our work, offers, or studio news. You can opt out of these at any time.",
      "We use aggregated, non-identifying technical data to understand how the website is used and to improve it.",
    ],
  },
  {
    id: "sharing-information",
    title: "Sharing your information",
    body: [
      "We do not sell your personal information.",
      "We may share your information with trusted third parties who help us run our business — for example, hosting providers, booking/form processing tools, email delivery services, and payment processors — solely to the extent needed for them to perform those services.",
      "[Placeholder: name your actual payment processor and any CRM/booking tool here once decided, since each has its own data-handling terms that should be referenced specifically.]",
      "We may disclose information where required by law, to protect our legal rights, or in connection with a business transfer such as a merger or acquisition.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & tracking",
    body: [
      "We use cookies and similar technologies to keep the website functioning properly, remember your preferences, and understand how visitors use our site.",
      "[Placeholder: list the specific analytics or marketing tools in use — e.g. Google Analytics, Meta Pixel — once finalised, since each requires its own disclosure and, in some cases, a consent banner under Nigerian and international rules.]",
      "You can control cookies through your browser settings. Disabling cookies may affect how parts of the website function.",
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

      {/* ── Hero — textured, echoing the Space Planning service tile ── */}
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
                        className={`font-sans text-sm sm:text-base leading-relaxed ${
                          p.startsWith("[Placeholder:")
                            ? "text-brand-700 bg-brand-50 border-l-2 border-brand-400 pl-4 py-2 italic"
                            : "text-charcoal-muted"
                        }`}
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
