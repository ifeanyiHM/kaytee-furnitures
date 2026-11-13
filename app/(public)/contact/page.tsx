import type { Metadata } from "next";
import Link from "next/link";
import {
  RiArrowRightUpLine,
  RiInstagramLine,
  RiMailLine,
  RiMapPin2Line,
  RiPhoneLine,
  RiTiktokFill,
  RiTimeLine,
} from "react-icons/ri";

import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "../../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kaytee Furnitures & Interior — visit our Surulere studio in Lagos, call, email or message us on Instagram about your interior design project.",
  alternates: { canonical: "/contact" },
};


const DETAILS = [
  {
    label: "Visit our studio",
    value: "22 Oremerin, Itire, Surulere, Lagos",
    href: "https://maps.google.com/?q=22+Oremerin+Itire+Surulere+Lagos",
    icon: RiMapPin2Line,
    external: true,
  },
  {
    label: "Give us a call",
    value: "+234 807 919 7554",
    href: "tel:+2348079197554",
    icon: RiPhoneLine,
  },
  {
    label: "Send us an email",
    value: "kayteefurnitureandinterior@gmail.com",
    href: "mailto:kayteefurnitureandinterior@gmail.com",
    icon: RiMailLine,
  },
  {
    label: "Opening hours",
    value: "Mon – Fri · 9am – 5pm WAT",
    href: null,
    icon: RiTimeLine,
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kayteefurnitureandinteriors?utm_source=qr",
    icon: RiInstagramLine,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@kayteefurnitureinteriors?_r=1&_t=ZS-98Zqp8c3Ytp",
    icon: RiTiktokFill,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Let’s talk about", "your space."]}
        intro="Tell us about the space you have in mind and what you would like to achieve. We will be in touch to discuss your enquiry."
        image="/images/hero/hero3.jpg"
      />

      <section className="site-section overflow-hidden bg-sand-50">
        <div className="site-container">
          {/* Intro */}
          <Reveal className="mb-12 max-w-2xl md:mb-16">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-600">
              We'd love to hear from you
            </p>

            <h2 className="font-hero text-3xl leading-[1.15] tracking-[-0.04em] text-charcoal sm:text-4xl lg:text-5xl">
              Let's start a conversation about{" "}
              <span className="font-light italic text-brand-600">
                your space.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal-muted sm:text-base">
              Whether you have a project in mind, need more information about
              our services, or simply want to explore ideas, we're here to help.
            </p>
          </Reveal>

          {/* Main contact layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
            {/* Contact information */}
            <Reveal className="lg:col-span-5">
              <div className="flex h-full flex-col rounded-sm border border-sand-200 bg-brand-100 p-6 sm:p-8 lg:p-10">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-600">
                    Contact information
                  </p>

                  <h3 className="mt-4 max-w-sm font-hero text-2xl leading-snug tracking-[-0.03em] text-brand-900 sm:text-3xl">
                    A thoughtful space begins with a conversation.
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-charcoal-muted">
                    Reach out to discuss your furniture, interior design or
                    project enquiries. We'd be happy to hear what you have in
                    mind.
                  </p>
                </div>

                <div className="mt-10 border-t border-brand-300/60">
                  {DETAILS.map((detail, index) => {
                    const Icon = detail.icon;

                    return (
                      <div
                        key={detail.label}
                        className="flex gap-4 border-b border-brand-300/60 py-5"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-300/70 bg-sand-50 text-brand-700">
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                            {detail.label}
                          </p>

                          {detail.href ? (
                            <a
                              href={detail.href}
                              target={detail.external ? "_blank" : undefined}
                              rel={
                                detail.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="break-words text-sm leading-6 text-charcoal transition-colors duration-300 hover:text-brand-600"
                            >
                              {detail.value}
                              {detail.external && (
                                <RiArrowRightUpLine
                                  className="ml-1 inline-block"
                                  size={14}
                                />
                              )}
                            </a>
                          ) : (
                            <p className="text-sm leading-6 text-charcoal">
                              {detail.value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Social links */}
                <div className="mt-auto pt-8">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                    Follow our work
                  </p>

                  <div className="flex items-center gap-3">
                    {SOCIALS.map((social) => {
                      const Icon = social.icon;

                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit our ${social.label}`}
                          className="flex size-11 items-center justify-center rounded-full border border-brand-300/70 bg-sand-50 text-brand-800 transition-all duration-300 hover:border-brand-600 hover:bg-brand-600 hover:text-white"
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Enquiry form */}
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="h-full rounded-sm border border-sand-200 bg-white p-6 sm:p-8 lg:p-10">
                <div className="mb-8 flex flex-col justify-between gap-4 border-b border-sand-200 pb-7 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-600">
                      Send an enquiry
                    </p>

                    <h3 className="mt-3 font-hero text-2xl tracking-[-0.03em] text-charcoal sm:text-3xl">
                      Tell us about your project.
                    </h3>
                  </div>

                  <p className="text-xs text-charcoal-muted">
                    Fields marked * are required.
                  </p>
                </div>

                <ContactForm />
              </div>
            </Reveal>
          </div>

          {/* Consultation callout */}
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-col gap-5 border border-sand-200 bg-brand-900 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-300">
                  Prefer a one-on-one conversation?
                </p>

                <h3 className="mt-2 font-hero text-xl text-sand-50 sm:text-2xl">
                  Let's talk through your ideas.
                </h3>
              </div>

              <Link
                href="/consultation"
                className="inline-flex w-fit items-center gap-3 border-b border-brand-300/60 pb-2 text-sm font-medium text-sand-50 transition-colors hover:border-white hover:text-brand-200"
              >
                Book a consultation
                <RiArrowRightUpLine size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
