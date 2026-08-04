import { ContactForm } from "@/components/forms/ContactForm";
import type { Metadata } from "next";
import Image from "next/image";
import {
  RiMapPin2Line,
  RiPhoneLine,
  RiMailLine,
  RiTimeLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiPinterestLine,
  RiTiktokFill,
} from "react-icons/ri";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Luxe Interiors team.",
};

const CONTACT_ITEMS = [
  {
    icon: RiMapPin2Line,
    label: "Studio",
    value: "22 Oremerin, Itire Surulere, Lagos",
    href: "https://maps.google.com/?q=14+Design+Boulevard+Victoria+Island+Lagos",
  },
  {
    icon: RiPhoneLine,
    label: "Phone",
    value: "+234 807 919 7554",
    href: "tel:+2348079197554",
  },
  {
    icon: RiMailLine,
    label: "Email",
    value: "hello@kayteefurniture.com",
    href: "mailto:hello@kayteefurniture.com",
  },
  {
    icon: RiTimeLine,
    label: "Hours",
    value: "Mon – Fri · 9am – 5pm WAT",
    href: null,
  },
];

const SOCIALS = [
  {
    icon: RiInstagramLine,
    href: "https://www.instagram.com/kayteefurnitureandinteriors?utm_source=qr",
    label: "Instagram",
  },
  {
    icon: RiTiktokFill,
    href: "https://www.tiktok.com/@kayteefurnitureinteriors?_r=1&_t=ZS-98Zqp8c3Ytp",
    label: "TikTok",
  },
  // { icon: RiTwitterXLine, href: "https://twitter.com", label: "Twitter" },
  { icon: RiPinterestLine, href: "https://pinterest.com", label: "Pinterest" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Full-viewport split layout ── */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left — photo + contact info */}
        <div className="relative lg:w-[45%] lg:sticky lg:top-0 lg:h-screen overflow-hidden bg-charcoal">
          {/* Full-height project image */}
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85&auto=format&fit=crop"
            alt="Luxe Interiors studio project"
            fill
            className="object-cover opacity-40"
            sizes="45vw"
            priority
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/50 to-charcoal/20" />

          {/* Content over image */}
          <div className="relative z-10 flex flex-col justify-between h-full px-10 pt-32 pb-12 lg:pb-20">
            {/* Top — eyebrow + headline */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-brand-400" />
                <p className="font-sans text-[10px] text-brand-400 tracking-[0.3em] uppercase font-medium">
                  Get in touch
                </p>
              </div>
              <h1 className="font-display text-[clamp(2.5rem,4vw,3.75rem)] text-white leading-none tracking-tight">
                Let&apos;s talk about
                {/* <br /> */}
                <br />
                your
                <span className="text-brand-400"> space.</span>
              </h1>
            </div>

            {/* Bottom — contact details + socials */}
            <div>
              <div className="space-y-6 mb-10">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-brand-400" />
                    </div>
                    <div>
                      <p className="font-sans text-[9px] text-white/30 uppercase tracking-[0.2em] mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="font-sans text-sm text-white/75 hover:text-white transition-colors leading-relaxed"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-sans text-sm text-white/75 leading-relaxed">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex items-center gap-3 pt-8 border-t border-white/8">
                <p className="font-sans text-[9px] text-white/25 uppercase tracking-[0.2em] mr-2">
                  Follow
                </p>
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex-1 flex items-start lg:items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-24 lg:pt-0 lg:pb-10">
          <div className="w-full max-w-lg">
            {/* Form header */}
            <div className="mb-12">
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-charcoal leading-tight mb-2">
                Send us a message.
              </h2>
              <p className="font-sans text-sm text-charcoal-muted">
                We reply within 24 hours — usually much sooner.
              </p>
            </div>

            <ContactForm />

            {/* Quiet alternative CTA */}
            <div className="mt-14 pt-10 border-t border-sand-100">
              <p className="font-sans text-xs text-charcoal-muted mb-1">
                Prefer to book a consultation directly?
              </p>
              <a
                href="/consultation"
                className="font-sans text-sm text-charcoal hover:text-brand-600 transition-colors underline underline-offset-4 decoration-sand-300 hover:decoration-brand-400"
              >
                Go to our booking page →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
