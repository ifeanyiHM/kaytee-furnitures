"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { RiStarFill, RiDoubleQuotesL } from "react-icons/ri";
import type { TestimonialType } from "@/types";

const PLACEHOLDERS: TestimonialType[] = [
  {
    _id: "1",
    name: "Adaeze Okonkwo",
    role: "Homeowner",
    company: "Lekki, Lagos",
    content:
      "Luxe Interiors transformed our apartment into an absolute masterpiece. Every detail was thoughtfully considered and the result exceeded our expectations completely. I walk into my living room every morning and feel genuinely grateful.",
    rating: 5,
    featured: true,
    approved: true,
    image: "",
    projectRef: "The Lekki Apartment",
  },
  {
    _id: "2",
    name: "Emeka Nwachukwu",
    role: "CEO",
    company: "TechBridge Nigeria",
    content:
      "They redesigned our Victoria Island office and it's completely transformed our team's energy and productivity. Professional, deeply creative, and delivered on time and within budget. Our clients comment on the space every single visit.",
    rating: 5,
    featured: true,
    approved: true,
    image: "",
    projectRef: "VI Corporate Office",
  },
  {
    _id: "3",
    name: "Funmi Adeleke",
    role: "Creative Director",
    company: "Studio FA, Abuja",
    content:
      "From the initial consultation to the final reveal, the experience was seamless and genuinely enjoyable. I now have a bedroom that feels like a five-star suite. The attention to texture, light, and proportion is on another level entirely.",
    rating: 5,
    featured: true,
    approved: true,
    image: "",
    projectRef: "Abuja Master Suite",
  },
  {
    _id: "4",
    name: "Chidi Okafor",
    role: "Architect",
    company: "Okafor & Associates",
    content:
      "As an architect I have very exacting standards. Luxe Interiors is one of the few studios I trust to take our structural work and elevate it with interiors that genuinely match the intent. A rare partnership.",
    rating: 5,
    featured: true,
    approved: true,
    image: "",
    projectRef: "GRA Ikeja Residence",
  },
];

const PROJECT_IMAGES: Record<string, string> = {
  "The Lekki Apartment": "/images/portfolio/port5/wardrobe1.jpg",
  "VI Corporate Office": "/images/portfolio/port3/port.jpg",
  "Abuja Master Suite": "/images/portfolio/port1/bariga-one-bed1.jpg",
  "GRA Ikeja Residence": "/images/portfolio/port4/ajah.jpg",
};

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: TestimonialType[];
}) {
  const display = testimonials.length > 0 ? testimonials : PLACEHOLDERS;
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function goTo(i: number) {
    if (i === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 280);
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive((cur) => (cur + 1) % display.length);
        setAnimating(false);
      }, 280);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [display.length]);

  function restart(i: number) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goTo(i);
    intervalRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive((cur) => (cur + 1) % display.length);
        setAnimating(false);
      }, 280);
    }, 6000);
  }

  const t = display[active];
  const projectImage =
    typeof t.projectRef === "string" ? PROJECT_IMAGES[t.projectRef] : null;

  return (
    <section className="py-32 bg-charcoal overflow-hidden relative">
      {/* Decorative background quote mark */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        <RiDoubleQuotesL className="w-64 h-64 text-white/2.5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-brand-400" />
              <p className="font-sans text-[11px] font-medium text-brand-400 tracking-[0.28em] uppercase">
                Client love
              </p>
            </div>

            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white leading-[1.05] tracking-tight">
              Heard from the people <br className="hidden lg:block" />
              <span className="text-brand-400">who live in it.</span>
            </h2>
          </div>

          {/* Aggregate rating */}
          <div className="flex items-center gap-5 border border-white/10 rounded-2xl px-6 py-4 self-start lg:self-auto shrink-0">
            <div>
              <p className="font-display text-4xl text-white leading-none">
                5.0
              </p>
              <div className="flex gap-0.5 mt-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <RiStarFill key={i} className="w-3.5 h-3.5 text-brand-400" />
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="font-sans text-sm font-medium text-white">
                {display.length * 12}+ reviews
              </p>
              <p className="font-sans text-xs text-white/40 mt-0.5">
                Verified clients
              </p>
            </div>
          </div>
        </div>

        {/* Main testimonial stage */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — quote */}
          <div>
            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {Array.from({ length: t.rating }).map((_, i) => (
                <RiStarFill key={i} className="w-5 h-5 text-brand-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="transition-all duration-300"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(10px)" : "translateY(0)",
              }}
            >
              <p className="font-display text-[clamp(1.35rem,2.5vw,1.85rem)] text-white leading-normal italic mb-10">
                &ldquo;{t.content}&rdquo;
              </p>
            </blockquote>

            {/* Attribution */}
            <div
              className="flex items-center gap-4 transition-all duration-300"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(8px)" : "translateY(0)",
              }}
            >
              {/* {t.image ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-600/50 shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-display text-lg text-white">
                    {t.name[0]}
                  </span>
                </div>
              )} */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-600/50 shrink-0">
                <Image
                  src={
                    t.image ||
                    "https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
                  }
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="font-sans font-semibold text-white text-sm">
                  {t.name}
                </p>
                <p className="font-sans text-xs text-white/50 mt-0.5">
                  {t.role}
                  {t.company ? ` · ${t.company}` : ""}
                </p>
                {/* {t.projectRef && (
                  <p className="font-sans text-[10px] text-brand-400 mt-1 uppercase tracking-wider">
                    Project: {t.projectRef}
                  </p>
                )} */}
              </div>
            </div>

            {/* Selector dots / tabs */}
            <div className="flex items-center gap-3 mt-12">
              {display.slice(0, 4).map((item, i) => (
                <button
                  key={item._id}
                  onClick={() => restart(i)}
                  aria-label={`View testimonial from ${item.name}`}
                  className="group flex items-center gap-2 transition-all"
                >
                  {/* Progress bar style indicator */}
                  <span
                    className={`block h-0.5 rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-10 bg-brand-400"
                        : "w-4 bg-white/20 group-hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
              <span className="font-sans text-[10px] text-white/30 ml-1 tracking-wider">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(Math.min(display.length, 4)).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right — project image + mini reviewer stack */}
          <div className="relative">
            {/* Project image */}
            <div
              className="relative rounded-2xl overflow-hidden bg-charcoal-light transition-all duration-300"
              style={{
                aspectRatio: "4/3",
                opacity: animating ? 0.4 : 1,
                transform: animating ? "scale(0.99)" : "scale(1)",
              }}
            >
              {projectImage ? (
                <Image
                  src={projectImage}
                  alt={t.projectRef || t.name}
                  fill
                  key={active}
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-brand-900/30 to-charcoal-light flex items-center justify-center">
                  <RiDoubleQuotesL className="w-24 h-24 text-white/10" />
                </div>
              )}
              {/* Overlay with project label */}
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/70 via-transparent to-transparent" />
              {/* {t.projectRef && (
                <div className="absolute bottom-5 left-5">
                  <p className="font-sans text-[10px] text-brand-300 uppercase tracking-widest mb-1">
                    Featured project
                  </p>
                  <p className="font-display text-xl text-white">
                    {t.projectRef}
                  </p>
                </div>
              )} */}

              {/* Corner accent */}
              <div className="absolute top-4 right-4 border border-brand-400/30 rounded-lg px-3 py-1.5 backdrop-blur-sm bg-charcoal/40">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <RiStarFill
                      key={i}
                      className="w-2.5 h-2.5 text-brand-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating reviewer thumbnails */}
            {/* <div className="absolute -bottom-5 -left-5 flex items-center">
              <div className="flex -space-x-2.5">
                {display.slice(0, 4).map((item, i) => (
                  <button
                    key={item._id}
                    onClick={() => restart(i)}
                    className={`relative w-10 h-10 rounded-full overflow-hidden ring-2 transition-all duration-200 ${
                      i === active
                        ? "ring-brand-400 scale-110 z-10"
                        : "ring-charcoal hover:ring-white/40 hover:scale-105"
                    }`}
                    style={{ zIndex: i === active ? 10 : 4 - i }}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-700 flex items-center justify-center">
                        <span className="font-display text-sm text-white">
                          {item.name[0]}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <span className="font-sans text-xs text-white/40 ml-4">
                {display.length * 12}+ happy clients
              </span>
            </div> */}
          </div>
        </div>

        {/* Bottom marquee strip */}
        {/* <div className="mt-24 pt-10 border-t border-white/8">
          <div className="flex items-center gap-10 overflow-hidden">
            {[
              "Lekki Penthouse",
              "VI Corporate HQ",
              "Abuja Master Suite",
              "Ikoyi Heritage Home",
              "GRA Smart Residence",
              "Banana Island Villa",
            ].map((name) => (
              <span
                key={name}
                className="font-display text-lg text-white/15 whitespace-nowrap shrink-0 italic"
              >
                {name}
              </span>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
