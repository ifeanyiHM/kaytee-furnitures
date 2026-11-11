"use client";
import { RevealLines } from "@/components/motion/Reveal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowDownLine, RiArrowRightUpLine } from "react-icons/ri";

const SLIDES = [
  { src: "/images/hero/hero1.jpg", room: "Living Room", place: "Ikoyi" },
  {
    src: "/images/hero/hero2.jpg",
    room: "Living Room",
    place: "Victoria Island",
  },
  { src: "/images/hero/hero3.jpg", room: "Kitchen & Dining", place: "Lekki" },
];
const SLIDE_DURATION = 7000;

export function HeroSection() {
  const [active, setActive] = useState(0);

  // Re-keyed on `active` so any manual jump restarts the timer.
  useEffect(() => {
    const t = setTimeout(
      () => setActive((i) => (i + 1) % SLIDES.length),
      SLIDE_DURATION,
    );
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0 -z-10">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1600 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            <div
              className={`absolute inset-0 ${i === active ? "hero-slide-active" : ""}`}
            >
              <Image
                src={slide.src}
                alt={`${slide.room}, ${slide.place} — interior by Kaytee Furnitures & Interior`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/20 to-charcoal/55" />
      </div>

      <div className="site-container pb-10 pt-40 xl1:pb-14 xl3:pb-16">
        <p className="site-kicker hero-reveal mb-7 flex items-center gap-4 text-brand-200 opacity-0 xl3:mb-10">
          <span className="h-px w-10 bg-brand-400" />
          Interior design &amp; bespoke furniture — Lagos
        </p>

        <RevealLines
          as="h1"
          immediate
          delay={0.15}
          className="display-hero text-white"
          lines={["Interiors considered", "down to the", "last chair."]}
        />

        <div className="mt-12 flex flex-col gap-10 xl3:mt-16 lg:flex-row lg:items-end lg:justify-between">
          <div
            className="hero-reveal flex flex-col gap-4 opacity-0 sm:flex-row"
            style={{ animationDelay: "0.9s" }}
          >
            <Link href="/portfolio" className="site-button-primary">
              View our work <RiArrowRightUpLine className="h-4 w-4" />
            </Link>
            <Link href="/consultation" className="site-button-secondary">
              Start a project
            </Link>
          </div>

          {/* Slide index — doubles as manual control */}
          {/* <div
            className="hero-reveal opacity-0 lg:mr-44"
            style={{ animationDelay: "1.1s" }}
          >
            <p className="mb-3 font-display text-lg text-white/85 xl3:text-2xl">
              {SLIDES[active].room},{" "}
              <span className="text-white/50">{SLIDES[active].place}</span>
            </p>
            <div
              className="flex gap-2"
              role="group"
              aria-label="Choose hero image"
            >
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${s.room}, ${s.place}`}
                  aria-current={i === active}
                  className="group relative h-6 w-14 xl3:w-20"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px bg-white/25" />
                  <span
                    key={i === active ? `on-${active}` : "off"}
                    className="absolute left-0 top-1/2 h-px bg-white origin-left"
                    style={
                      i === active
                        ? {
                            width: "100%",
                            animation: `heroBar ${SLIDE_DURATION}ms linear forwards`,
                          }
                        : { width: 0 }
                    }
                  />
                </button>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      <div className="site-container hidden pb-8 lg:block">
        <p className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.3em] text-white/45">
          <RiArrowDownLine className="h-3.5 w-3.5" /> Scroll
        </p>
      </div>
      <style>{`@keyframes heroBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}@media (prefers-reduced-motion:reduce){[style*="heroBar"]{animation:none!important}}`}</style>
    </section>
  );
}
