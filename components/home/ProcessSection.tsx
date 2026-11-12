"use client";

import Image from "next/image";
import { useState } from "react";

const steps = [
  {
    num: "01",
    title: "Initial Consultation",
    label: "DISCOVERY",
    tagline: "Understanding your vision.",
    desc: "We begin with a detailed discussion about your vision, lifestyle, budget, and timeline to understand exactly what you need.",
    image:
      "https://i.pinimg.com/736x/0d/e6/8a/0de68a44cdc59f579184ce503d2c61b7.jpg",
  },
  {
    num: "02",
    title: "Concept & Design",
    label: "CREATIVE DIRECTION",
    tagline: "Bringing your ideas to life.",
    desc: "Our designers craft a bespoke concept with mood boards, floor plans, 3D renderings, and material selections for your approval.",
    image:
      "https://i.pinimg.com/1200x/8e/43/1e/8e431ee3367463573ad2e0701d8de78d.jpg",
  },
  {
    num: "03",
    title: "Procurement & Build",
    label: "CRAFTSMANSHIP",
    tagline: "Every detail, thoughtfully executed.",
    desc: "We source and procure all furniture, materials, and fixtures, then manage the build process with trusted contractors.",
    image:
      "https://i.pinimg.com/736x/21/67/73/21677319732c039add87c0d6dc1ebb9f.jpg",
  },
  {
    num: "04",
    title: "Final Reveal",
    label: "THE TRANSFORMATION",
    tagline: "A space that feels like yours.",
    desc: "Your space is styled and staged to perfection. We walk you through every detail and ensure you're thrilled with the result.",
    image:
      "https://i.pinimg.com/736x/4e/7f/a2/4e7fa2d8779b14f84585540b1a92de49.jpg",
  },
];

export function ProcessSection() {
  const [active, setActive] = useState(0);

  const currentStep = steps[active];
  const progress = (active / (steps.length - 1)) * 100;

  const goToStep = (index: number) => {
    setActive(Math.max(0, Math.min(index, steps.length - 1)));
  };

  return (
    <section className="site-section-tight w-full max-w-full overflow-x-clip bg-brand-50">
      <div className="site-container w-full min-w-0 max-w-full">
        {/* Section heading */}
        <div className="mb-12 lg:mb-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-600" />
              <p className="site-label tracking-[0.24em] text-brand-600">
                HOW WE WORK
              </p>
            </div>

            <h2 className="site-heading mb-4">A seamless design journey.</h2>

            <p className="site-copy max-w-lg text-charcoal-muted">
              Great spaces don't happen by chance. Every detail is thoughtfully
              considered, from the first conversation to the moment you step
              into your transformed space.
            </p>
          </div>

          <p className="hidden shrink-0 pb-1 font-sans text-xs tracking-[0.16em] text-charcoal-muted uppercase lg:block">
            04 steps · One beautiful outcome
          </p>
        </div>

        {/* Process navigation */}
        <div className="mb-8 w-full min-w-0 overflow-x-auto overscroll-x-contain pb-3 scrollbar-none">
          <div className="relative mx-auto flex w-full min-w-[520px] justify-between sm:min-w-0">
            {/* Progress track */}
            <div className="absolute left-[12.5%] right-[12.5%] top-[17px] h-px bg-charcoal/15">
              <div
                className="h-full bg-brand-600 transition-all duration-700 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {steps.map((step, index) => {
              const isActive = active === index;
              const isComplete = active > index;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => goToStep(index)}
                  aria-current={isActive ? "step" : undefined}
                  className="group relative z-10 flex min-w-0 flex-col items-center gap-3 px-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-4"
                >
                  <span
                    className={`flex h-[35px] w-[35px] items-center justify-center rounded-full border text-[11px] font-medium transition-all duration-300 ${
                      isActive
                        ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20"
                        : isComplete
                          ? "border-brand-600 bg-brand-50 text-brand-700"
                          : "border-charcoal/20 bg-brand-50 text-charcoal-muted group-hover:border-brand-600 group-hover:text-brand-600"
                    }`}
                  >
                    {step.num}
                  </span>

                  <span
                    className={`whitespace-nowrap font-sans text-[10px] tracking-[0.12em] uppercase transition-colors duration-300 sm:text-[11px] ${
                      isActive
                        ? "font-semibold text-brand-700"
                        : "text-charcoal-muted group-hover:text-charcoal"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured process panel */}
        <div className="grid w-full min-w-0 grid-cols-1 overflow-hidden border border-charcoal/10 bg-[#FDFCFA] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {/* Image showcase */}
          <div className="relative min-w-0">
            <div className="group relative aspect-[4/3] w-full overflow-hidden bg-charcoal lg:aspect-[5/4]">
              {/* Crossfading images */}
              {steps.map((step, index) => (
                <div
                  key={step.image}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    active === index ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={active !== index}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
                  />
                </div>
              ))}

              {/* Image overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-charcoal/10" />

              {/* Image top label */}
              <div className="absolute left-5 top-5 flex items-center gap-2 border border-white/30 bg-charcoal/25 px-3 py-2 backdrop-blur-md sm:left-7 sm:top-7">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
                <span className="font-sans text-[9px] tracking-[0.2em] text-white uppercase sm:text-[10px]">
                  The Kaytee experience
                </span>
              </div>

              {/* Image bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                <div>
                  <p className="mb-2 font-sans text-[10px] tracking-[0.22em] text-white/70 uppercase">
                    Stage {currentStep.num}
                  </p>
                  <p className="font-hero text-2xl leading-tight text-white sm:text-3xl lg:text-4xl">
                    {currentStep.tagline}
                  </p>
                </div>

                <span className="shrink-0 font-hero text-5xl leading-none text-white/50 sm:text-6xl">
                  {currentStep.num}
                </span>
              </div>
            </div>
          </div>

          {/* Editorial content panel */}
          <div className="flex min-w-0 flex-col justify-between p-6 sm:p-9 lg:p-10 xl:p-12">
            <div>
              <div className="mb-10 flex items-center justify-between">
                <span className="font-sans text-[10px] tracking-[0.2em] text-brand-600 uppercase">
                  {currentStep.label}
                </span>

                <span className="font-sans text-xs tabular-nums text-charcoal-muted">
                  {currentStep.num} / 04
                </span>
              </div>

              {/* Animated content */}
              <div
                key={active}
                className="animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                <p className="mb-5 font-hero text-6xl leading-none text-brand-600/20 sm:text-7xl lg:text-8xl">
                  {currentStep.num}
                </p>

                <h3 className="mb-5 font-hero text-3xl leading-tight text-charcoal sm:text-4xl xl:text-5xl">
                  {currentStep.title}
                </h3>

                <div className="mb-6 h-px w-12 bg-brand-600" />

                <p className="site-copy max-w-md leading-relaxed text-charcoal-muted">
                  {currentStep.desc}
                </p>
              </div>
            </div>

            {/* Navigation footer */}
            <div className="mt-12 border-t border-charcoal/10 pt-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-sans text-[10px] tracking-[0.16em] text-charcoal-muted uppercase">
                  Explore our process
                </span>

                <span className="font-sans text-xs tabular-nums text-charcoal-muted">
                  {Math.round(((active + 1) / steps.length) * 100)}%
                </span>
              </div>

              <div className="mb-7 h-[2px] w-full bg-charcoal/10">
                <div
                  className="h-full bg-brand-600 transition-all duration-700 ease-out"
                  style={{
                    width: `${((active + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => goToStep(active - 1)}
                  disabled={active === 0}
                  className="flex items-center gap-2 font-sans text-xs tracking-wide text-charcoal transition-colors hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <span className="text-lg">←</span>
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {steps.map((step, index) => (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => goToStep(index)}
                      aria-label={`Go to ${step.title}`}
                      aria-current={active === index ? "step" : undefined}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        active === index
                          ? "w-7 bg-brand-600"
                          : "w-1.5 bg-charcoal/20 hover:bg-brand-600/60"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => goToStep(active + 1)}
                  disabled={active === steps.length - 1}
                  className="flex items-center gap-2 font-sans text-xs tracking-wide text-charcoal transition-colors hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Next
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-8 flex flex-col gap-2 border-t border-charcoal/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-hero text-lg text-charcoal sm:text-xl">
            Thoughtfully designed. Beautifully delivered.
          </p>

          <p className="font-sans text-[10px] tracking-[0.16em] text-charcoal-muted uppercase">
            Kaytee Furnitures & Interior
          </p>
        </div>
      </div>
    </section>
  );
}
