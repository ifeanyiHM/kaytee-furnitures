"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "Initial Consultation",
    desc: "We begin with a detailed discussion about your vision, lifestyle, budget, and timeline to understand exactly what you need.",
    image:
      "https://i.pinimg.com/736x/0d/e6/8a/0de68a44cdc59f579184ce503d2c61b7.jpg",
  },
  {
    num: "02",
    title: "Concept & Design",
    desc: "Our designers craft a bespoke concept with mood boards, floor plans, 3D renderings, and material selections for your approval.",
    image:
      "https://i.pinimg.com/1200x/8e/43/1e/8e431ee3367463573ad2e0701d8de78d.jpg",
  },
  {
    num: "03",
    title: "Procurement & Build",
    desc: "We source and procure all furniture, materials, and fixtures, then manage the build process with trusted contractors.",
    image:
      "https://i.pinimg.com/736x/21/67/73/21677319732c039add87c0d6dc1ebb9f.jpg",
  },
  {
    num: "04",
    title: "Final Reveal",
    desc: "Your space is styled and staged to perfection. We walk you through every detail and ensure you're thrilled with the result.",
    image:
      "https://i.pinimg.com/736x/4e/7f/a2/4e7fa2d8779b14f84585540b1a92de49.jpg",
  },
];

export function ProcessSection() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick whichever observed step is most centered right now, rather
        // than just the last entry in this batch — this is what keeps the
        // active step stable and correct while scrolling quickly.
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const mostVisible = visible.reduce((best, e) =>
          e.intersectionRatio > best.intersectionRatio ? e : best,
        );
        setActive(
          Number((mostVisible.target as HTMLButtonElement).dataset.index),
        );
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    const nodes = refs.current.filter(
      (el): el is HTMLButtonElement => el !== null,
    );
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-brand-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="font-sans text-[11px] font-medium text-brand-600 tracking-[0.24em] uppercase mb-3">
            How we work
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal leading-[1.05] tracking-tight mb-4">
            A seamless design journey
          </h2>
          <p className="font-sans text-charcoal-muted leading-relaxed max-w-lg">
            From first hello to final reveal, our process is designed to be as
            enjoyable and stress-free as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-x-16">
          {/* Sticky media panel — crossfades to match the active step */}
          <div className="hidden lg:block relative">
            <div className="sticky top-28 h-130 overflow-hidden bg-charcoal">
              {steps.map((step, i) => (
                <div
                  key={step.image}
                  className="absolute inset-0 transition-opacity duration-900 ease-in-out"
                  style={{ opacity: i === active ? 1 : 0 }}
                  aria-hidden={i !== active}
                >
                  <div
                    className={
                      i === active
                        ? "absolute inset-0 hero-slide-active"
                        : "absolute inset-0"
                    }
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      priority={i === 0}
                      className="object-cover"
                      sizes="40vw"
                    />
                  </div>
                </div>
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/10 to-transparent" />

              {/* Live step caption */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-300 mb-2">
                  Step {steps[active].num} of 0{steps.length}
                </p>
                <p className="font-hero text-2xl text-white leading-snug">
                  {steps[active].title}
                </p>
              </div>

              {/* Progress spine, right edge of panel */}
              <div className="absolute top-8 bottom-8 right-6 w-px bg-white/15">
                <div
                  className="absolute top-0 left-0 w-px bg-brand-300 transition-all duration-500 ease-out"
                  style={{
                    height: `${((active + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step list — each row carries its own thumbnail */}
          <div className="relative">
            {steps.map((step, i) => (
              <button
                key={step.num}
                type="button"
                data-index={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                onClick={(e) => {
                  setActive(i);
                  e.currentTarget.blur();
                }}
                aria-pressed={i === active}
                className="group relative flex w-full text-left gap-5 sm:gap-8 py-10 border-b border-[#bfbfbf50] last:border-b-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-sand-50 rounded-sm"
              >
                {/* Ghost numeral */}
                <p
                  className="font-hero text-[clamp(2.5rem,6vw,4.5rem)] leading-none shrink-0 w-[1.2em] sm:w-[1.4em] transition-colors duration-500"
                  style={{
                    WebkitTextStroke:
                      i === active ? "1px #1e1e1e" : "1px #585757",
                    color: "transparent",
                  }}
                >
                  {step.num}
                </p>

                <div className="flex-1 flex items-start justify-between gap-5">
                  <div className="pt-2">
                    <h3
                      className={`font-display text-xl sm:text-2xl mb-3 transition-colors duration-300 ${
                        i === active
                          ? "text-charcoal"
                          : "text-charcoal/70 group-hover:text-charcoal"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm text-charcoal-muted leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>

                  {/* Thumbnail — visible at every breakpoint, doubles up on
                      mobile where the sticky panel is hidden */}
                  <div
                    className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 overflow-hidden transition-all duration-500 ${
                      i === active
                        ? "opacity-100 ring-1 ring-brand-400"
                        : "opacity-50 lg:opacity-40 group-hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
