"use client";
import type { PortfolioItemType } from "@/types";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
} from "react-icons/ri";
import { Media } from "../ui/Media";

const PROJECTS = [
  {
    title: "Classic Bedroom Renovation",
    category: "Bedroom",
    location: "Ikeja, Lagos",
    before: "/images/portfolio/port11/before.jpg",
    after: "/images/portfolio/port11/after.jpg",
    slug: "classic-bedroom-renovation",
  },
  {
    title: "Modern Sitting Room Makeover",
    category: "Living Room",
    location: "Lekki Phase 1, Lagos",
    before: "/images/portfolio/port9/before.jpg",
    after: "/images/portfolio/port9/after.jpg",
    slug: "modern-sitting-room-makeover",
  },
  {
    title: "Dining Room Renovation",
    category: "Dining Room",
    location: "Old Ikoyi, Lagos",
    before: "/images/portfolio/port10/dining_before.jpg",
    after: "/images/portfolio/port10/dining_after.jpg",
    slug: "dining-room-renovation",
  },
  {
    title: "Luxury Kitchen Renovation",
    category: "Kitchen",
    location: "Maitama, Abuja",
    before: "/images/portfolio/port8/before3.jpg",
    after: "/images/portfolio/port8/after3.jpg",
    slug: "luxury-kitchen-renovation",
  },
  // {
  //   title: "Kitchen Renovation",
  //   category: "Kitchen",
  //   location: "Eko Atlantic, Lagos",
  //   before: "/images/portfolio/port7/before.jpg",
  //   after: "/images/portfolio/port7/after.jpg",
  //   slug: "kitchen-renovation",
  // },
];

function BeforeAfterSlider({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );
    setPos(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none cursor-col-resize overflow-hidden"
      onMouseMove={(e) => dragging && move(e.clientX)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* After (base layer) */}
      <div className="absolute inset-0">
        <Media
          src={after}
          alt={`${title} — after`}
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Before (clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <div
          className="absolute inset-0"
          style={{ width: `${(100 / pos) * 100}%` }}
        >
          <Media
            src={before}
            alt={`${title} — before`}
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/90 pointer-events-none"
        style={{ left: `${pos}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
        style={{ left: `${pos}%` }}
        onMouseDown={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onTouchStart={() => setDragging(true)}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center gap-0.5 cursor-col-resize">
          <RiArrowLeftLine className="w-3 h-3 text-charcoal" />
          <RiArrowRightLine className="w-3 h-3 text-charcoal" />
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 font-sans text-[10px] xxl:text-[11px] xl2:text-[12px] xl3:text-[12px] xl4:text-[13px] font-medium tracking-[0.2em] uppercase text-white bg-charcoal/60 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none">
        Before
      </span>
      <span className="absolute top-4 right-4 font-sans text-[10px] xxl:text-[11px] xl2:text-[12px] xl3:text-[12px] xl4:text-[13px] font-medium tracking-[0.2em] uppercase text-white bg-charcoal/60 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none">
        After
      </span>
    </div>
  );
}

export function PortfolioPreview({ items }: { items: PortfolioItemType[] }) {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  return (
    <section className="site-section w-full max-w-full overflow-x-clip bg-white">
      <div className="site-container w-full min-w-0 max-w-full">
        {/* Header */}

        <div className="flex w-full min-w-0 flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-brand-600" />
              <p className="site-label text-brand-600 tracking-[0.28em]">
                Our work
              </p>
            </div>
            <h2 className="site-heading">Before &amp; after.</h2>
            <p className="site-copy text-charcoal-muted mt-3 max-w-md">
              Drag the slider to see exactly how we transform a space — from
              what was, to what it became.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 font-sans text-sm xxl:text-[15px] xl2:text-[15px] xl3:text-base xl4:text-base font-medium text-charcoal border border-sand-300 hover:border-brand-600 hover:text-brand-700 px-5 xxl:px-6 xl2:px-6 xl3:px-7 xl4:px-7 py-2.5 xxl:py-3 xl2:py-3 xl3:py-3.5 xl4:py-3.5 rounded-full transition-all self-start lg:self-auto shrink-0"
          >
            View all projects
            <RiArrowRightUpLine className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Main layout */}

        <div className="grid w-full min-w-0 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
          {/* Slider panel */}
          <div
            className="relative w-full min-w-0 max-w-full rounded-2xl overflow-hidden bg-sand-100"
            style={{ aspectRatio: "16/10" }}
          >
            <BeforeAfterSlider
              key={active}
              before={project.before}
              after={project.after}
              title={project.title}
            />
            {/* Project caption bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-charcoal/80 to-transparent pt-16 px-6 pb-5 pointer-events-none">
              <p className="font-sans text-[10px] xxl:text-[11px] xl2:text-[12px] xl3:text-[12px] xl4:text-[13px] text-brand-300 uppercase tracking-widest mb-1">
                {project.category}
              </p>
              <div className="flex items-end justify-between">
                <h3 className="font-display text-2xl xxl:text-[2.2rem] xl2:text-[2.35rem] xl3:text-[2.6rem] xl4:text-[2.9rem] text-white">
                  {project.title}
                </h3>
                <p className="font-sans text-xs xxl:text-[13px] xl2:text-[13px] xl3:text-[14px] xl4:text-[15px] text-white/50">
                  {project.location}
                </p>
              </div>
            </div>
          </div>

          {/* Project selector list */}
          <div className="flex min-w-0 w-full flex-col gap-2">
            <p className="font-sans text-[10px] xxl:text-[11px] xl2:text-[12px] xl3:text-[12px] xl4:text-[13px] text-charcoal-muted uppercase tracking-[0.2em] mb-2 px-1">
              Select a project
            </p>
            {PROJECTS.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => setActive(i)}
                className={`group text-left rounded-xl overflow-hidden border transition-all duration-200 ${
                  active === i
                    ? "border-strike-hover shadow-sm"
                    : "border-strike hover:border-brand-100"
                }`}
              >
                <div className="flex items-center gap-4 p-3">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-sand-100">
                    <Media
                      src={p.after}
                      alt={p.title}
                      className={`object-cover transition-all duration-300 ${active === i ? "opacity-100" : "opacity-90 group-hover:opacity-100"}`}
                      sizes="64px"
                    />
                  </div>
                  {/* Meta */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-sans text-[10px] xxl:text-[11px] xl2:text-[12px] xl3:text-[12px] xl4:text-[13px] uppercase tracking-wider mb-0.5 ${active === i ? "text-brand-600" : "text-charcoal-muted"}`}
                    >
                      {p.category}
                    </p>
                    <p
                      className={`font-sans text-base xxl:text-[1.15rem] xl2:text-[1.25rem] xl3:text-[1.4rem] xl4:text-[1.5rem] leading-snug truncate ${active === i ? "text-charcoal" : "text-charcoal-muted"}`}
                    >
                      {p.title}
                    </p>
                    <p className="font-sans text-[11px] xxl:text-[12px] xl2:text-[12px] xl3:text-[13px] xl4:text-[13px] text-charcoal-muted/60 mt-0.5 truncate">
                      {p.location}
                    </p>
                  </div>
                  {/* Active indicator */}
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${active === i ? "bg-brand-600" : "bg-sand-200 group-hover:bg-sand-300"}`}
                  />
                </div>
                {/* Active progress bar */}
                {active === i && <div className="h-0.5 bg-strike w-full" />}
              </button>
            ))}

            {/* CTA card */}
            <div className="mt-4 bg-brand-50 border border-strike rounded-xl p-5">
              <p className="font-sans text-lg xxl:text-[1.5rem] xl2:text-[1.7rem] xl3:text-[1.9rem] xl4:text-[2.1rem] text-charcoal mb-1">
                Ready to transform your space?
              </p>
              <p className="font-sans text-xs xxl:text-[13px] xl2:text-[13px] xl3:text-[14px] xl4:text-[15px] text-charcoal-muted leading-relaxed mb-4">
                Tell us about your space and what you would like to create.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-800 text-white font-sans text-xs xxl:text-[13px] xl2:text-[13px] xl3:text-[14px] xl4:text-[15px] font-medium tracking-wide px-4 xxl:px-5 xl2:px-5 xl3:px-6 xl4:px-6 py-2.5 xxl:py-3 xl2:py-3 xl3:py-3.5 xl4:py-3.5 rounded-lg transition-colors"
              >
                Start a project
                <RiArrowRightLine className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom thumbnail strip */}

        <div className="mt-8 grid w-full min-w-0 grid-cols-2 sm:grid-cols-4 gap-3">
          {PROJECTS.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                active === i
                  ? "ring-2 ring-strike ring-offset-2"
                  : "opacity-90 hover:opacity-100"
              }`}
              style={{ aspectRatio: "4/3" }}
            >
              <Media
                src={p.after}
                alt={p.title}
                className="object-cover"
                sizes="(max-width:768px) 25vw, 180px"
              />
              <div
                className={`absolute inset-0 transition-colors ${active === i ? "bg-brand-900/10" : "bg-charcoal/20"}`}
              />
              <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2">
                <p className="font-sans text-[9px] text-white truncate leading-tight">
                  {p.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
