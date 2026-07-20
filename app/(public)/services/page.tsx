import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/actions/bookings";
import { ServicesAccordion } from "@/components/services/ServiceAccordion";
import { RiArrowRightUpLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our full range of premium interior design services.",
};

const fallbackServices = [
  {
    _id: "1",
    name: "Interior Design",
    slug: "interior-design",
    description:
      "Full-service bespoke interior design from concept to completion.",
    features: [
      "Initial consultation",
      "Concept development",
      "3D visualisation",
      "Project management",
      "Final styling",
    ],
    priceFrom: 500000,
    duration: "6–12 weeks",
    image:
      "https://i.pinimg.com/736x/00/79/4d/00794d22e45b9e53ebf46b73a35de471.jpg",
  },
  {
    _id: "2",
    name: "Space Planning",
    slug: "space-planning",
    description:
      "Intelligent floor plan design that maximises your space's potential.",
    features: [
      "Measured survey",
      "Multiple layouts",
      "Furniture positioning",
      "Traffic flow analysis",
      "Digital floor plans",
    ],
    priceFrom: 150000,
    duration: "1–2 weeks",
    image:
      "https://i.pinimg.com/736x/23/d6/d8/23d6d8a5d46fc2ec6170fe8cf7df9323.jpg",
  },
  {
    _id: "3",
    name: "Furniture Procurement",
    slug: "furniture-procurement",
    description:
      "Curated sourcing of premium furniture from trusted suppliers worldwide.",
    features: [
      "Supplier network access",
      "Quality verification",
      "Negotiated pricing",
      "Delivery management",
      "Installation oversight",
    ],
    priceFrom: 200000,
    duration: "2–8 weeks",
    image:
      "https://i.pinimg.com/736x/e6/bc/6e/e6bc6e8b2f04ce6f33736d5a223f2d2f.jpg",
  },
  {
    _id: "4",
    name: "Virtual Consultation",
    slug: "virtual-consultation",
    description:
      "Professional design advice via video call — fast, flexible, and affordable.",
    features: [
      "60-min video session",
      "Mood board",
      "Product recommendations",
      "Q&A support",
      "Follow-up notes",
    ],
    priceFrom: 50000,
    duration: "Same week",
    image:
      "https://i.pinimg.com/1200x/2d/07/20/2d07207ef937bf4b6a3a0a63b4806e60.jpg",
  },
  {
    _id: "5",
    name: "Renovation Management",
    slug: "renovation-management",
    description:
      "End-to-end coordination and supervision of your renovation project, ensuring quality craftsmanship, timely delivery, and a stress-free experience.",
    features: [
      "Project planning",
      "Contractor coordination",
      "Site supervision",
      "Quality control",
      "Project handover",
    ],
    priceFrom: 350000,
    duration: "4–16 weeks",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
  },
];

export default async function ServicesPage() {
  const dbServices = await getServices().catch(() => []);
  const services = dbServices.length > 0 ? dbServices : fallbackServices;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/55 via-charcoal/15 to-charcoal/10" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/10 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-[11px] text-brand-400 tracking-[0.28em] uppercase mb-5">
            What we offer
          </p>
          <h1 className="font-hero text-[clamp(2.5rem,5.5vw,4.5rem)] text-white leading-[1.05] mb-6">
            Our services
          </h1>
          <p className="font-sans text-white/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to transform your space, under one roof. Select
            a service below to see how it works.
          </p>
        </div>
      </section>

      {/* ── Accordion index ── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
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
        <div className="max-w-2xl mx-auto px-4 text-center">
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
