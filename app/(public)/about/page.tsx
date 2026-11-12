import { ParallaxImage } from "@/components/motion/Parallax";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";
import { PageHero } from "../../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story and design philosophy behind Kaytee Furnitures & Interior, a Lagos-based interior design studio.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    number: "01",
    title: "Client-first",
    description:
      "Your vision is our compass. We listen deeply before we draw a single line — every brief starts as a conversation, not a template.",
    detail: "Personalised by design",
  },
  {
    number: "02",
    title: "Timeless quality",
    description:
      "We design for how you'll feel in ten years, not just how it looks on launch day. Trends fade; proportion, material, and craft don't.",
    detail: "Made to endure",
  },
  {
    number: "03",
    title: "Material awareness",
    description:
      "We consider the character, durability and practical demands of materials when shaping a design direction.",
    detail: "Beauty with purpose",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Lagos, Nigeria · Interior Design Studio"
        lines={["Design with purpose,", "crafted with patience."]}
        intro="Kaytee Furnitures & Interior is a Lagos-based interior design studio creating thoughtful, functional and beautifully considered spaces. We approach every project with an appreciation for detail, material, proportion and the way people experience their surroundings."
        image="/images/hero/hero1.jpg"
      />

      {/* Studio introduction */}
      <section className="site-section overflow-hidden bg-sand-50">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-14 xl3:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="site-kicker mb-7 flex items-center gap-4 text-brand-600">
                  <span className="h-px w-9 bg-brand-500" />A little about us
                </p>
              </Reveal>

              <RevealLines
                as="h1"
                immediate
                delay={0.15}
                className="site-heading max-w-[12ch]"
                lines={["A studio rooted", "in African elegance."]}
              />

              <Reveal className="mt-8 space-y-5">
                <p className="site-copy">
                  We believe great design has the power to transform how you
                  feel in a space — and how you feel about life. Every project
                  we take on is an opportunity to create something meaningful.
                </p>

                <p className="site-copy">
                  Our approach blends global design sensibilities with the
                  warmth, texture, and vibrancy of African aesthetics to deliver
                  interiors that are both timeless and deeply personal.
                </p>

                <p className="site-copy">
                  From individual rooms to complete residences, we bring the
                  same commitment to thoughtful design, material quality and
                  close client collaboration to every project.
                </p>
              </Reveal>

              <Reveal>
                <Link
                  href="/portfolio"
                  className="link-draw mt-9 text-charcoal"
                >
                  Discover our work
                  <RiArrowRightUpLine className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal className="relative">
                <div className="relative">
                  <ParallaxImage
                    src="/images/hero/hero3.jpg"
                    alt="Kitchen and dining interior by Kaytee Furnitures & Interior"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="aspect-4/4"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-5 -left-5 -z-10 h-2/3 w-2/3 border border-brand-300 sm:-bottom-7 sm:-left-7"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="site-label text-charcoal-muted">
                    Thoughtful spaces. Meaningful living.
                  </p>
                  <span className="font-sans text-xs text-brand-600">
                    KFI / 01
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Studio philosophy */}
          <Reveal className="mt-24 border-t border-sand-300 pt-10 sm:mt-32 sm:pt-14 xl3:mt-40">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <p className="site-kicker text-brand-600 lg:col-span-3">
                Our perspective
              </p>

              <p className="max-w-4xl font-display text-3xl font-light leading-[1.3] text-charcoal sm:text-4xl lg:col-span-9 xl3:text-5xl">
                A beautiful space should do more than look good. It should feel
                considered, work effortlessly and reflect the people who live in
                it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Studio values */}
      <section className="site-section bg-white">
        <div className="site-container">
          <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="site-kicker mb-6 flex items-center gap-4 text-brand-600">
                  <span className="h-px w-9 bg-brand-500" />
                  The principles behind our work
                </p>
              </Reveal>

              <RevealLines
                className="site-heading max-w-[10ch]"
                lines={["What we believe in."]}
              />
            </div>

            <Reveal className="lg:col-span-5 lg:col-start-8 lg:pb-2">
              <p className="site-copy max-w-lg">
                Every design decision has a reason. These are the principles
                that guide how we listen, plan and bring a space to life.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 border-t border-sand-300 md:grid-cols-3 md:divide-x md:divide-sand-300">
            {VALUES.map((value, index) => (
              <Reveal
                as="article"
                key={value.number}
                className="group flex flex-col border-b border-sand-300 px-0 py-9 md:border-b-0 md:px-7 md:py-8 first:md:pl-0 last:md:pr-0 xl3:py-12"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="font-sans text-xs tracking-[0.18em] text-brand-600">
                    {value.number}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-300 text-brand-600 transition-all duration-500 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
                    <RiArrowRightUpLine className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>

                <div className="mt-auto">
                  <p className="site-label mb-4 text-brand-600">
                    {value.detail}
                  </p>

                  <h3 className="mb-5 font-display text-3xl font-light text-charcoal sm:text-4xl xl3:text-5xl">
                    {value.title}
                  </h3>

                  <p className="site-copy max-w-sm">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="site-section overflow-hidden bg-charcoal text-white">
        <div className="site-container">
          <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-6">
            <p className="site-kicker text-brand-300">
              The person behind the vision
            </p>

            <span className="font-sans text-xs tracking-[0.15em] text-white/35">
              KFI / 02
            </span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16 xl3:gap-24">
            <Reveal className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:mx-0">
                <div className="relative aspect-[4/5] lg:aspect-4/4 overflow-hidden bg-charcoal-light">
                  <Image
                    src="/images/ceo1.jpg"
                    alt="Kayode Aina, founder and creative director"
                    fill
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="font-sans text-sm text-white/55">Kayode Aina</p>
                  <p className="site-label text-brand-300">
                    Founder &amp; Creative Director
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-6 lg:col-start-7">
              <p className="site-kicker mb-8 text-brand-300">
                A considered approach to every space
              </p>

              <h2 className="max-w-[15ch] font-display text-4xl font-light leading-[1.2] sm:text-5xl xl3:text-6xl">
                Good spaces begin with a thoughtful vision.
              </h2>

              <div className="mt-8 max-w-xl space-y-5">
                <p className="font-sans text-sm leading-7 text-white/60 sm:text-base">
                  Kayode Aina leads the studio&apos;s creative direction,
                  bringing a considered perspective to the spaces we design.
                </p>

                <p className="font-sans text-sm leading-7 text-white/60 sm:text-base">
                  His approach reflects the studio&apos;s belief that a
                  successful interior should balance visual character,
                  functionality and the needs of the people who experience it.
                </p>
              </div>

              <Link
                href="/consultation"
                className="group mt-10 inline-flex items-center gap-5 border-b border-white/25 pb-3 font-sans text-sm text-white transition-colors hover:border-brand-300 hover:text-brand-300"
              >
                Work with us
                <RiArrowRightUpLine className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
