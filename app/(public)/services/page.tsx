import { ServicesAccordion } from "@/components/services/ServiceAccordion";
import type { Metadata } from "next";
import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";
import { SERVICES } from "@/lib/services-data";
import { PageHero } from "../../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our full range of premium interior design services.",
};

export default function ServicesPage() {
  const services = SERVICES;

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        eyebrow="Services"
        lines={["Everything a room", "needs, under one roof."]}
        intro="From the first measured survey to the final styled shelf. Select a service to see how it works."
        image="/images/hero/hero2.jpg"
      />

      {/* ── Accordion index ── */}
      <section className="bg-white">
        <div className="site-container max-w-5xl xxl:max-w-[56rem] xl2:max-w-232 xl3:max-w-240 xl4:max-w-248 py-16 sm:py-20">
          <div className="flex items-center justify-between mb-2">
            <p className="font-sans text-[10px] text-charcoal-muted uppercase tracking-[0.22em]">
              Full range
            </p>
            <p className="font-sans text-[10px] text-charcoal-muted/60 uppercase tracking-[0.22em]">
              {services.length} services
            </p>
          </div>
          <ServicesAccordion services={services} />
        </div>
      </section>

      {/* ── CTA band — consistent with the rest of the site ── */}
      <section className="py-20 bg-charcoal">
        <div className="mx-auto max-w-2xl xxl:max-w-[34rem] xl2:max-w-xl xl3:max-w-152 xl4:max-w-160 px-4 text-center">
          <p className="font-sans text-[11px] text-brand-400 tracking-[0.25em] uppercase mb-4">
            Not sure where to start?
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] text-white mb-5 leading-tight">
            Let&apos;s figure it out together.
          </h2>
          <p className="font-sans text-white/50 mb-10 leading-relaxed max-w-lg mx-auto">
            Book a free 30-minute discovery call and let us guide you to the
            right solution for your space.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-sans font-medium text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm transition-colors"
          >
            Book your free call
            <RiArrowRightUpLine className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
