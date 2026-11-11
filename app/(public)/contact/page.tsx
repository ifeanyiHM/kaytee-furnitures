import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import Link from "next/link";
import {
  RiArrowRightUpLine,
  RiInstagramLine,
  RiTiktokFill,
} from "react-icons/ri";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kaytee Furnitures & Interior in Surulere, Lagos — enquire about bespoke furniture, interior design or a custom project.",
  alternates: { canonical: "/contact" },
};

const DETAILS = [
  {
    label: "Studio",
    value: "22 Oremerin, Itire, Surulere, Lagos",
    href: "https://maps.google.com/?q=22+Oremerin+Itire+Surulere+Lagos",
  },
  { label: "Phone", value: "+234 807 919 7554", href: "tel:+2348079197554" },
  {
    label: "Email",
    value: "kayteefurnitureandinterior@gmail.com",
    href: "mailto:kayteefurnitureandinterior@gmail.com",
  },
  { label: "Hours", value: "Mon – Fri · 9am – 5pm WAT", href: null },
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
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Let’s talk about", "your space."]}
        intro="Tell us about the room, the piece or the project. We reply within 24 hours — usually much sooner."
        image="/images/hero/hero3.jpg"
      />

      <section className="site-section bg-white">
        <div className="site-container grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="site-kicker mb-10 flex items-center gap-4 text-brand-600">
              <span className="h-px w-10 bg-brand-500" />
              Find us
            </p>
            <dl className="border-t border-sand-300">
              {DETAILS.map(({ label, value, href }) => (
                <div
                  key={label}
                  className="grid grid-cols-[5rem_minmax(0,1fr)] sm:grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-sand-300 py-6 xl3:py-8"
                >
                  <dt className="site-label pt-1">{label}</dt>
                  <dd className="font-display text-xl font-light text-charcoal xl3:text-2xl">
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="break-all transition-colors hover:text-brand-600 sm:wrap-break-word"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center border border-charcoal/25 text-charcoal transition-colors hover:bg-charcoal hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="site-kicker mb-10 flex items-center gap-4 text-brand-600">
              <span className="h-px w-10 bg-brand-500" />
              Send an enquiry
            </p>
            <ContactForm />
            <div className="mt-16 border-t border-sand-300 pt-8">
              <p className="site-copy mb-3">
                Prefer to book a conversation directly?
              </p>
              <Link href="/consultation" className="link-draw text-charcoal">
                Book a consultation <RiArrowRightUpLine className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
