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
    "The story, philosophy and craft behind Kaytee Furnitures & Interior — a Lagos studio pairing interior design with in-house bespoke furniture.",
  alternates: { canonical: "/about" },
};

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

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Est. 2012 — Lagos, Nigeria"
        lines={["Design with purpose,", "crafted with patience."]}
        intro="Kaytee Furnitures has grown from a small Lagos studio into one of West Africa's most celebrated interior design and bespoke furniture houses."
        image="/images/hero/hero1.jpg"
      />

      <section className="site-section bg-sand-50">
        <div className="site-container grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="site-kicker mb-8 flex items-center gap-4 text-brand-600">
              <span className="h-px w-10 bg-brand-500" />
              Who we are
            </p>
            <RevealLines
              className="site-heading mb-10 max-w-[14ch]"
              lines={["A studio rooted", "in African elegance."]}
            />
            <Reveal className="space-y-6">
              <p className="site-copy">
                We believe great design has the power to transform how you feel
                in a space — and how you feel about life. Every project we take
                on is an opportunity to create something meaningful.
              </p>
              <p className="site-copy">
                Our approach blends global design sensibilities with the warmth,
                texture, and vibrancy of African aesthetics to deliver interiors
                that are both timeless and deeply personal.
              </p>
              <p className="site-copy">
                From intimate apartments to expansive commercial spaces, we
                bring the same commitment to excellence, sustainability, and
                client collaboration to every project.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-20">
            <ParallaxImage
              src="/images/hero/hero3.jpg"
              alt="Kitchen and dining interior by Kaytee Furnitures & Interior"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-4/5"
            />
          </div>
        </div>
      </section>

      {/* Values — numbered manifesto */}
      <section className="site-section bg-white">
        <div className="site-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="site-kicker mb-6 flex items-center gap-4 text-brand-600">
              <span className="h-px w-10 bg-brand-500" />
              What drives us
            </p>
            <RevealLines className="site-heading" lines={["Our values"]} />
          </div>
          <ul className="border-t border-sand-300 lg:col-span-8">
            {VALUES.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                className="grid grid-cols-1 gap-4 border-b border-sand-300 py-10 sm:grid-cols-[5rem_1fr] xl3:py-14"
              >
                <span className="font-hero text-4xl leading-none text-outline text-brand-500 xl3:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-3 font-display text-3xl font-light text-charcoal xl3:text-4xl">
                    {v.title}
                  </h3>
                  <p className="site-copy max-w-xl">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Founder */}
      <section className="site-section-tight bg-charcoal text-white">
        <div className="site-container grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="relative aspect-4/5 max-w-sm overflow-hidden bg-charcoal-light lg:col-span-4 xl3:max-w-md">
            <Image
              src="/images/ceo1.jpg"
              alt="Kayode Aina, founder and creative director"
              fill
              sizes="(max-width: 1024px) 80vw, 30vw"
              className="object-cover"
            />
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <p className="site-kicker mb-8 text-brand-300">
              Founder &amp; Creative Director
            </p>
            <p className="font-display text-[clamp(1.8rem,3vw,3rem)] font-light leading-[1.2] xl3:text-[3.4rem]">
              Kayode Aina has spent 15 years transforming spaces across West
              Africa and beyond.
            </p>
            <Link href="/consultation" className="link-draw mt-10 text-white">
              Work with us <RiArrowRightUpLine className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
