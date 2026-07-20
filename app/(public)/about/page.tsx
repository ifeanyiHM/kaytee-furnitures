import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Kaytee Furnitures — our story, team, and design philosophy.",
};

const STATS = [
  { value: "200+", label: "Projects" },
  { value: "12+", label: "Years" },
  { value: "50+", label: "Awards" },
  { value: "98%", label: "Satisfaction" },
];

const VALUES = [
  {
    title: "Client-first",
    desc: "Your vision is our compass. We listen deeply before we draw a single line — every brief starts as a conversation, not a template.",
  },
  {
    title: "Timeless quality",
    desc: "We design for how you'll feel in ten years, not just how it looks on launch day. Trends fade; proportion, material, and craft don't.",
  },
  {
    title: "Sustainable choices",
    desc: "We prioritise materials and suppliers with ethical and environmental responsibility, without asking you to compromise on beauty.",
  },
];

const TEAM = [
  {
    name: "Kayode Aina",
    role: "Founder & Creative Director",
    img: "/images/ceo1.jpg",
    bio: "15 years transforming spaces across West Africa and beyond.",
  },
  {
    name: "Kofi Mensah",
    role: "Technician",
    img: "",
    bio: "Specialises in contemporary African design fused with global trends.",
  },
  {
    name: "Ifeanyi Iheme",
    role: "Website Developer",
    img: "",
    bio: "Sources premium furniture from over 30 suppliers worldwide.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1920&q=80"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/55 via-charcoal/15 to-charcoal/10" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/10 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-[11px] text-brand-400 tracking-[0.28em] uppercase mb-5">
            Est. 2012 — Lagos, Nigeria
          </p>
          <h1 className="font-hero text-[clamp(2.5rem,5.5vw,4.75rem)] text-white leading-[1.03] mb-7">
            Design with purpose,
            <br />
            crafted with patience.
          </h1>
          <p className="font-sans text-white/55 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Kaytee Furnitures has grown from a small Lagos studio into one of
            West Africa&apos;s most celebrated interior design and bespoke
            furniture houses.
          </p>
        </div>
      </section>

      {/* ── Story + stats band ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-brand-600" />
                <p className="font-sans text-[11px] text-brand-600 tracking-[0.26em] uppercase font-medium">
                  Who we are
                </p>
              </div>
              <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.75rem)] text-charcoal leading-[1.1] mb-8">
                A studio rooted in African elegance
              </h2>
              <div className="space-y-5 font-sans text-charcoal-muted leading-relaxed">
                <p>
                  We believe great design has the power to transform how you
                  feel in a space — and how you feel about life. Every project
                  we take on is an opportunity to create something meaningful.
                </p>
                <p>
                  Our approach blends global design sensibilities with the
                  warmth, texture, and vibrancy of African aesthetics to deliver
                  interiors that are both timeless and deeply personal.
                </p>
                <p>
                  From intimate apartments to expansive commercial spaces, we
                  bring the same commitment to excellence, sustainability, and
                  client collaboration to every project.
                </p>
              </div>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2.5 mt-9 bg-brand-600 hover:bg-brand-700 text-white font-sans font-medium text-[11px] tracking-[0.16em] uppercase px-7 py-3.5 rounded-sm transition-colors"
              >
                Work with us
                <RiArrowRightUpLine className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative w-full aspect-4/5 overflow-hidden bg-charcoal">
              <Image
                src="https://i.pinimg.com/1200x/bb/0a/8b/bb0a8bdeaed58663546907285377c508.jpg"
                alt="Kaytee Furnitures studio work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* <div className="absolute inset-0 bg-linear-to-t from-charcoal/60 via-transparent to-transparent" /> */}
              {/* <p className="absolute bottom-6 left-6 font-sans text-[10px] text-white/70 uppercase tracking-[0.2em]">
                Ikoyi Penthouse — 2024
              </p> */}
            </div>
          </div>

          {/* Stats — same hairline band as the homepage/portfolio hero */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y divide-x sm:divide-y-0 divide-sand-200 border-t border-sand-200 mt-20">
            {STATS.map((stat) => (
              <div key={stat.label} className="py-8 px-6 first:pl-0">
                <p className="font-hero text-3xl sm:text-4xl text-brand-600 leading-none mb-1.5">
                  {stat.value}
                </p>
                <p className="font-sans text-[10px] text-charcoal-muted uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values — numbered manifesto, not cards ── */}
      <section className="bg-brand-50 py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <p className="font-sans text-[11px] text-brand-600 tracking-[0.24em] uppercase mb-3">
              What drives us
            </p>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] text-charcoal leading-tight">
              Our values
            </h2>
          </div>

          <div className="border-t border-sand-200">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="flex flex-col sm:flex-row gap-4 sm:gap-10 py-10 border-b border-sand-200"
              >
                <p
                  className="font-hero text-3xl sm:text-4xl leading-none shrink-0 sm:w-20"
                  style={{
                    WebkitTextStroke: "1px #a07848",
                    color: "transparent",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-2xl text-charcoal mb-3">
                    {v.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-xl">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team — row index, matching the portfolio page's language ── */}
      {/* <section className="bg-white py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <p className="font-sans text-[11px] text-brand-600 tracking-[0.24em] uppercase mb-3">
              The people behind the work
            </p>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] text-charcoal leading-tight">
              Meet our team
            </h2>
          </div>

          <div className="border-t border-sand-200">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="group flex items-start sm:items-center gap-5 sm:gap-8 py-8 sm:py-9 border-b border-sand-200"
              >
                <p className="font-display text-xl sm:text-2xl text-charcoal-muted/50 group-hover:text-brand-500 transition-colors duration-300 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </p>

                <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover grayscale-35 group-hover:grayscale-0 transition-all duration-500"
                    sizes="64px"
                  />
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                  <div>
                    <h3 className="font-display text-xl text-charcoal">
                      {member.name}
                    </h3>
                    <p className="font-sans text-[11px] text-brand-600 uppercase tracking-[0.16em] mt-1">
                      {member.role}
                    </p>
                  </div>
                  <p className="font-sans text-sm text-charcoal-muted leading-relaxed max-w-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-xs text-brand-600 tracking-[0.2em] uppercase mb-3">
              The people behind the work
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal">
              Meet our team
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden">
                  <Image
                    src={
                      member.img ||
                      "https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
                    }
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-xl text-charcoal">
                  {member.name}
                </h3>
                <p className="font-sans text-sm text-brand-600 mb-2">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA — consistent with the rest of the site ── */}
      <section className="py-20 bg-charcoal border-b border-white/8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="font-sans text-[11px] text-brand-400 tracking-[0.25em] uppercase mb-4">
            Let&apos;s work together
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] text-white mb-5 leading-tight">
            Ready to start your own story?
          </h2>
          <p className="font-sans text-white/50 mb-10 leading-relaxed max-w-lg mx-auto">
            Book a free discovery call — no commitment, no pressure — and
            let&apos;s talk about what&apos;s possible for your space.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-sans font-medium text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm transition-colors"
          >
            Book your free consultation
            <RiArrowRightUpLine className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
