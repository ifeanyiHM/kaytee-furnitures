import type { Metadata } from "next";
import {
  RiArrowRightUpLine,
  RiCalendarLine,
  RiCheckLine,
  RiPhoneLine,
  RiTimeLine,
} from "react-icons/ri";

import { ConsultationExperience } from "@/components/booking/ConsultationExperience";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Start a Project — Book a Consultation",
  description:
    "Share your interior design brief with Kaytee Furnitures & Interior and tell us about the space you have in mind.",
  alternates: { canonical: "/consultation" },
};

const STEPS = [
  {
    n: "01",
    label: "Share your brief",
    sub: "Tell us about your space and what you have in mind.",
    icon: RiCalendarLine,
  },
  {
    n: "02",
    label: "We review your project",
    sub: "Our team considers your needs and design direction.",
    icon: RiCheckLine,
  },
  {
    n: "03",
    label: "We get in touch",
    sub: "We'll contact you to discuss the appropriate next steps.",
    icon: RiArrowRightUpLine,
  },
];

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        lines={["A considered space", "starts with a brief."]}
        intro="Tell us a little about the space you have in mind. We will review your enquiry and get in touch to discuss the right next step."
        image="/images/hero/hero2.jpg"
      />

      <section className="overflow-hidden bg-sand-50 py-16 sm:py-20 lg:py-24">
        <div className="site-container">
          {/* Section introduction */}
          <Reveal className="mb-12 max-w-2xl lg:mb-16">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-600">
              <span className="h-px w-8 bg-brand-500" />
              The consultation process
            </p>

            <h2 className="font-hero text-3xl leading-[1.15] tracking-[-0.04em] text-charcoal sm:text-4xl lg:text-5xl">
              Every detail begins with{" "}
              <span className="font-light italic text-brand-600">
                understanding.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal-muted sm:text-base">
              A little about your space, your ideas and your expectations helps
              us understand how best to approach your project.
            </p>
          </Reveal>

          {/* Main consultation layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
            {/* Process and contact panel */}
            <Reveal className="lg:col-span-4">
              <aside className="flex h-full flex-col border border-sand-200 bg-brand-100 p-6 sm:p-8 lg:p-9">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-600">
                    A simple process
                  </p>

                  <h3 className="mt-4 font-hero text-2xl leading-snug tracking-[-0.03em] text-brand-900 sm:text-3xl">
                    From first ideas to a considered direction.
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-charcoal-muted">
                    Here's what happens after you share your project brief with
                    us.
                  </p>
                </div>

                <ol className="mt-10 border-t border-brand-300/60">
                  {STEPS.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <li
                        key={item.n}
                        className="grid grid-cols-[2.75rem_1fr] gap-3 border-b border-brand-300/60 py-6"
                      >
                        <div className="flex size-10 items-center justify-center rounded-full border border-brand-300/70 bg-sand-50 text-brand-700">
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold tracking-[0.16em] text-brand-600">
                            STEP {item.n}
                          </span>

                          <h4 className="mt-1 font-display text-lg text-charcoal">
                            {item.label}
                          </h4>

                          <p className="mt-1.5 text-xs leading-6 text-charcoal-muted">
                            {item.sub}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-auto border-t border-brand-300/60 pt-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                    Prefer to speak with us?
                  </p>

                  <a
                    href="tel:+2348079197554"
                    className="mt-3 inline-flex items-center gap-2 font-display text-xl text-brand-900 transition-colors hover:text-brand-600 sm:text-2xl"
                  >
                    <RiPhoneLine size={18} />
                    +234 807 919 7554
                  </a>

                  <p className="mt-2 flex items-center gap-2 text-xs text-charcoal-muted">
                    <RiTimeLine size={14} />
                    Monday – Friday · 9am – 5pm WAT
                  </p>
                </div>
              </aside>
            </Reveal>

            {/* Booking form */}
            <Reveal delay={0.1} className="lg:col-span-8">
              <div className="h-full border border-sand-200 bg-white p-6 sm:p-9 lg:p-10 xl3:p-12">
                <ConsultationExperience />
              </div>
            </Reveal>
          </div>

          {/* Closing note */}
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-col gap-3 border border-sand-200 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-sm leading-6 text-charcoal-muted">
                Not quite ready to submit a project brief?
                <span className="ml-1 text-charcoal">
                  You can still get in touch with our team.
                </span>
              </p>

              <a
                href="mailto:kayteefurnitureandinterior@gmail.com"
                className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700 transition-colors hover:text-brand-500"
              >
                Email our studio
                <RiArrowRightUpLine size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
