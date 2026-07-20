"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiArrowRightUpLine,
} from "react-icons/ri";
import type { PortfolioItemType } from "@/types";
import { Media } from "../ui/Media";

const PROJECTS = [
  {
    title: "The Lagos Penthouse",
    category: "Living Room",
    location: "Eko Atlantic, Lagos",
    before:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85&auto=format&fit=crop",
    slug: "lagos-penthouse",
  },
  {
    title: "Abuja Family Villa",
    category: "Bedroom",
    location: "Maitama, Abuja",
    before:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85&auto=format&fit=crop",
    slug: "abuja-villa",
  },
  {
    title: "Lekki Modern Loft",
    category: "Kitchen",
    location: "Lekki Phase 1, Lagos",
    before:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85&auto=format&fit=crop",
    slug: "lekki-loft",
  },
  {
    title: "Ikoyi Heritage Residence",
    category: "Dining Room",
    location: "Old Ikoyi, Lagos",
    before:
      "https://images.unsplash.com/photo-1561753757-d8880c5a3551?w=1200&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=85&auto=format&fit=crop",
    slug: "ikoyi-residence",
  },
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
      <span className="absolute top-4 left-4 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-white bg-charcoal/60 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none">
        Before
      </span>
      <span className="absolute top-4 right-4 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-white bg-charcoal/60 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none">
        After
      </span>
    </div>
  );
}

export function PortfolioPreview({ items }: { items: PortfolioItemType[] }) {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-brand-600" />
              <p className="font-sans text-[11px] font-medium text-brand-600 tracking-[0.28em] uppercase">
                Our work
              </p>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal leading-[1.05] tracking-tight">
              Before &amp; after.
            </h2>
            <p className="font-sans text-charcoal-muted mt-3 max-w-md leading-relaxed text-sm">
              Drag the slider to see exactly how we transform a space — from
              what was, to what it became.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-charcoal border border-sand-300 hover:border-brand-600 hover:text-brand-700 px-5 py-2.5 rounded-full transition-all self-start lg:self-auto shrink-0"
          >
            View all projects
            <RiArrowRightUpLine className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Slider panel */}
          <div
            className="relative rounded-2xl overflow-hidden bg-sand-100"
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
              <p className="font-sans text-[10px] text-brand-300 uppercase tracking-widest mb-1">
                {project.category}
              </p>
              <div className="flex items-end justify-between">
                <h3 className="font-display text-2xl text-white">
                  {project.title}
                </h3>
                <p className="font-sans text-xs text-white/50">
                  {project.location}
                </p>
              </div>
            </div>
          </div>

          {/* Project selector list */}
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[10px] text-charcoal-muted uppercase tracking-[0.2em] mb-2 px-1">
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
                      className={`font-sans text-[10px] uppercase tracking-wider mb-0.5 ${active === i ? "text-brand-600" : "text-charcoal-muted"}`}
                    >
                      {p.category}
                    </p>
                    <p
                      className={`font-display text-base leading-snug truncate ${active === i ? "text-charcoal" : "text-charcoal-muted"}`}
                    >
                      {p.title}
                    </p>
                    <p className="font-sans text-[11px] text-charcoal-muted/60 mt-0.5 truncate">
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
              <p className="font-display text-lg text-charcoal mb-1">
                Ready to transform your space?
              </p>
              <p className="font-sans text-xs text-charcoal-muted leading-relaxed mb-4">
                Book a free consultation and let's talk about your project.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-800 text-white font-sans text-xs font-medium tracking-wide px-4 py-2.5 rounded-lg transition-colors"
              >
                Book free consultation
                <RiArrowRightLine className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom thumbnail strip */}
        <div className="mt-8 grid grid-cols-4 gap-3">
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

// "use client";
// import { useState, useRef, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   RiArrowRightLine,
//   RiArrowLeftLine,
//   RiArrowRightUpLine,
//   RiPlayCircleLine,
// } from "react-icons/ri";
// import type { PortfolioItemType } from "@/types";

// type MediaItem =
//   | { type: "image"; src: string }
//   | { type: "video"; src: string; poster?: string };

// interface Project {
//   title: string;
//   category: string;
//   location: string;
//   before: MediaItem;
//   after: MediaItem;
//   slug: string;
//   thumb: string;
// }

// const PROJECTS: Project[] = [
//   {
//     title: "The Lagos Penthouse",
//     category: "Living Room",
//     location: "Eko Atlantic, Lagos",
//     before: {
//       type: "image",
//       src: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1400&q=85&auto=format&fit=crop",
//     },
//     after: {
//       type: "video",
//       src: "https://videos.pexels.com/video-files/7578544/7578544-uhd_2560_1440_25fps.mp4",
//       poster:
//         "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85&auto=format&fit=crop",
//     },
//     slug: "lagos-penthouse",
//     thumb:
//       "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80&auto=format&fit=crop",
//   },
//   {
//     title: "Abuja Family Villa",
//     category: "Bedroom",
//     location: "Maitama, Abuja",
//     before: {
//       type: "video",
//       src: "https://videos.pexels.com/video-files/6394040/6394040-uhd_2560_1440_25fps.mp4",
//       poster:
//         "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&q=85&auto=format&fit=crop",
//     },
//     after: {
//       type: "image",
//       src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=85&auto=format&fit=crop",
//     },
//     slug: "abuja-villa",
//     thumb:
//       "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80&auto=format&fit=crop",
//   },
//   {
//     title: "Lekki Modern Loft",
//     category: "Kitchen",
//     location: "Lekki Phase 1, Lagos",
//     before: {
//       type: "image",
//       src: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1400&q=85&auto=format&fit=crop",
//     },
//     after: {
//       type: "video",
//       src: "https://videos.pexels.com/video-files/5624982/5624982-uhd_2560_1440_25fps.mp4",
//       poster:
//         "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85&auto=format&fit=crop",
//     },
//     slug: "lekki-loft",
//     thumb:
//       "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80&auto=format&fit=crop",
//   },
//   {
//     title: "Ikoyi Heritage Residence",
//     category: "Dining Room",
//     location: "Old Ikoyi, Lagos",
//     before: {
//       type: "video",
//       src: "https://videos.pexels.com/video-files/7587596/7587596-uhd_2560_1440_25fps.mp4",
//       poster:
//         "https://images.unsplash.com/photo-1561753757-d8880c5a3551?w=1400&q=85&auto=format&fit=crop",
//     },
//     after: {
//       type: "image",
//       src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1400&q=85&auto=format&fit=crop",
//     },
//     slug: "ikoyi-residence",
//     thumb:
//       "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&q=80&auto=format&fit=crop",
//   },
// ];

// /* ─── Media renderer ──────────────────────────────────────────────────── */
// function MediaPanel({
//   media,
//   label,
//   labelVariant,
//   style,
// }: {
//   media: MediaItem;
//   label: string;
//   labelVariant: "before" | "after";
//   style?: React.CSSProperties;
// }) {
//   const labelCls =
//     labelVariant === "before"
//       ? "bg-charcoal/60 backdrop-blur-sm text-white"
//       : "bg-brand-600/80 backdrop-blur-sm text-white";

//   return (
//     <div className="absolute inset-0 overflow-hidden" style={style}>
//       {/* Inner wrapper keeps the image/video at full width even when clipped */}
//       <div
//         className="absolute inset-0"
//         style={
//           style?.width
//             ? { width: `${(100 / parseFloat(style.width as string)) * 100}%` }
//             : undefined
//         }
//       >
//         {media.type === "video" ? (
//           <video
//             src={media.src}
//             poster={media.poster}
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//         ) : (
//           <Image
//             src={media.src}
//             alt={label}
//             fill
//             className="object-cover"
//             sizes="(max-width:768px) 100vw, 60vw"
//             priority
//           />
//         )}
//       </div>

//       {/* Label */}
//       <span
//         className={`absolute top-4 ${labelVariant === "before" ? "left-4" : "right-4"} font-sans text-[10px] font-medium tracking-[0.2em] uppercase px-2.5 py-1 rounded-full pointer-events-none flex items-center gap-1.5 ${labelCls}`}
//         style={
//           labelVariant === "after" && style?.width
//             ? {
//                 right: `calc(${100 - parseFloat(style.width as string)}% + 1rem)`,
//                 left: "auto",
//               }
//             : undefined
//         }
//       >
//         {media.type === "video" && (
//           <RiPlayCircleLine className="w-3 h-3 opacity-80" />
//         )}
//         {label}
//       </span>
//     </div>
//   );
// }

// /* ─── Before/After slider ─────────────────────────────────────────────── */
// function BeforeAfterSlider({
//   before,
//   after,
//   title,
// }: {
//   before: MediaItem;
//   after: MediaItem;
//   title: string;
// }) {
//   const [pos, setPos] = useState(50);
//   const [dragging, setDragging] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const move = useCallback((clientX: number) => {
//     if (!containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
//     const pct = Math.min(
//       96,
//       Math.max(4, ((clientX - rect.left) / rect.width) * 100),
//     );
//     setPos(pct);
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full h-full select-none cursor-col-resize"
//       onMouseMove={(e) => dragging && move(e.clientX)}
//       onMouseUp={() => setDragging(false)}
//       onMouseLeave={() => setDragging(false)}
//       onTouchMove={(e) => move(e.touches[0].clientX)}
//       onTouchEnd={() => setDragging(false)}
//     >
//       {/* After — full width base */}
//       <MediaPanel media={after} label="After" labelVariant="after" />

//       {/* Before — clipped to slider position */}
//       <MediaPanel
//         media={before}
//         label="Before"
//         labelVariant="before"
//         style={{ width: `${pos}%` }}
//       />

//       {/* Divider line */}
//       <div
//         className="absolute top-0 bottom-0 w-px bg-white pointer-events-none z-10"
//         style={{ left: `${pos}%` }}
//       />

//       {/* Handle */}
//       <div
//         className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2"
//         style={{ left: `${pos}%` }}
//         onMouseDown={(e) => {
//           e.preventDefault();
//           setDragging(true);
//         }}
//         onTouchStart={() => setDragging(true)}
//       >
//         <div className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center gap-0.5 cursor-col-resize ring-2 ring-white/30">
//           <RiArrowLeftLine className="w-3.5 h-3.5 text-charcoal" />
//           <RiArrowRightLine className="w-3.5 h-3.5 text-charcoal" />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── Section ─────────────────────────────────────────────────────────── */
// export function PortfolioPreview({ items: _ }: { items: PortfolioItemType[] }) {
//   const [active, setActive] = useState(0);
//   const project = PROJECTS[active];

//   return (
//     <section className="py-32 bg-white overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
//           <div>
//             <div className="flex items-center gap-3 mb-5">
//               <div className="w-8 h-px bg-brand-600" />
//               <p className="font-sans text-[11px] font-medium text-brand-600 tracking-[0.28em] uppercase">
//                 Our work
//               </p>
//             </div>
//             <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-charcoal leading-[1.05]">
//               Before &amp; after.
//             </h2>
//             <p className="font-sans text-charcoal-muted mt-3 max-w-md leading-relaxed text-sm">
//               Drag the slider to see exactly how we transform a space — some
//               reveals include walkthrough video.
//             </p>
//           </div>
//           <Link
//             href="/portfolio"
//             className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-charcoal border border-sand-300 hover:border-brand-600 hover:text-brand-700 px-5 py-2.5 rounded-full transition-all self-start lg:self-auto shrink-0"
//           >
//             View all projects
//             <RiArrowRightUpLine className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//           </Link>
//         </div>

//         {/* Main layout */}
//         <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
//           {/* Slider panel */}
//           <div
//             className="relative rounded-2xl overflow-hidden bg-sand-100"
//             style={{ aspectRatio: "16/10" }}
//           >
//             <BeforeAfterSlider
//               key={active}
//               before={project.before}
//               after={project.after}
//               title={project.title}
//             />
//             {/* Caption bar */}
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent pt-16 px-6 pb-5 pointer-events-none z-10">
//               <p className="font-sans text-[10px] text-brand-300 uppercase tracking-widest mb-1">
//                 {project.category}
//               </p>
//               <div className="flex items-end justify-between">
//                 <h3 className="font-display text-2xl text-white">
//                   {project.title}
//                 </h3>
//                 <p className="font-sans text-xs text-white/50">
//                   {project.location}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Selector sidebar */}
//           <div className="flex flex-col gap-2">
//             <p className="font-sans text-[10px] text-charcoal-muted uppercase tracking-[0.2em] mb-2 px-1">
//               Select a project
//             </p>

//             {PROJECTS.map((p, i) => (
//               <button
//                 key={p.slug}
//                 onClick={() => setActive(i)}
//                 className={`group text-left rounded-xl overflow-hidden border transition-all duration-200 ${
//                   active === i
//                     ? "border-brand-400 shadow-sm"
//                     : "border-sand-200 hover:border-sand-300"
//                 }`}
//               >
//                 <div className="flex items-center gap-4 p-3">
//                   {/* Thumbnail with media type badge */}
//                   <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-sand-100">
//                     <Image
//                       src={p.thumb}
//                       alt={p.title}
//                       fill
//                       className={`object-cover transition-all duration-300 ${active === i ? "opacity-100" : "opacity-70 group-hover:opacity-90"}`}
//                       sizes="64px"
//                     />
//                     {/* Video badge on projects that have video */}
//                     {(p.before.type === "video" ||
//                       p.after.type === "video") && (
//                       <div className="absolute bottom-1 right-1 bg-charcoal/70 rounded px-1 py-0.5 flex items-center gap-0.5">
//                         <RiPlayCircleLine className="w-2.5 h-2.5 text-white" />
//                       </div>
//                     )}
//                   </div>
//                   {/* Meta */}
//                   <div className="flex-1 min-w-0">
//                     <p
//                       className={`font-sans text-[10px] uppercase tracking-wider mb-0.5 ${active === i ? "text-brand-600" : "text-charcoal-muted"}`}
//                     >
//                       {p.category}
//                     </p>
//                     <p
//                       className={`font-display text-base leading-snug truncate ${active === i ? "text-charcoal" : "text-charcoal-muted"}`}
//                     >
//                       {p.title}
//                     </p>
//                     {/* Media type indicators */}
//                     <div className="flex items-center gap-1.5 mt-1">
//                       <span className="font-sans text-[9px] text-charcoal-muted/50 uppercase tracking-wider">
//                         {p.before.type === "video" ? "▶ Video" : "◼ Image"} →{" "}
//                         {p.after.type === "video" ? "▶ Video" : "◼ Image"}
//                       </span>
//                     </div>
//                   </div>
//                   <div
//                     className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${active === i ? "bg-brand-600" : "bg-sand-200 group-hover:bg-sand-300"}`}
//                   />
//                 </div>
//                 {active === i && <div className="h-0.5 bg-brand-400 w-full" />}
//               </button>
//             ))}

//             {/* CTA card */}
//             <div className="mt-4 bg-brand-50 border border-brand-100 rounded-xl p-5">
//               <p className="font-display text-lg text-charcoal mb-1">
//                 Ready to transform your space?
//               </p>
//               <p className="font-sans text-xs text-charcoal-muted leading-relaxed mb-4">
//                 Book a free consultation and let&apos;s talk about your project.
//               </p>
//               <Link
//                 href="/consultation"
//                 className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-800 text-white font-sans text-xs font-medium tracking-wide px-4 py-2.5 rounded-lg transition-colors"
//               >
//                 Book free consultation
//                 <RiArrowRightLine className="w-3.5 h-3.5" />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Thumbnail strip */}
//         <div className="mt-8 grid grid-cols-4 gap-3">
//           {PROJECTS.map((p, i) => (
//             <button
//               key={p.slug}
//               onClick={() => setActive(i)}
//               className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
//                 active === i
//                   ? "ring-2 ring-brand-400 ring-offset-2"
//                   : "opacity-60 hover:opacity-90"
//               }`}
//               style={{ aspectRatio: "4/3" }}
//             >
//               <Image
//                 src={p.thumb}
//                 alt={p.title}
//                 fill
//                 className="object-cover"
//                 sizes="(max-width:768px) 25vw, 180px"
//               />
//               <div
//                 className={`absolute inset-0 transition-colors ${active === i ? "bg-brand-900/10" : "bg-charcoal/20"}`}
//               />
//               {/* Video indicator badge */}
//               {(p.before.type === "video" || p.after.type === "video") && (
//                 <div className="absolute top-2 left-2 bg-charcoal/60 backdrop-blur-sm rounded-full p-1">
//                   <RiPlayCircleLine className="w-3 h-3 text-white" />
//                 </div>
//               )}
//               <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2">
//                 <p className="font-sans text-[9px] text-white truncate leading-tight">
//                   {p.title}
//                 </p>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
