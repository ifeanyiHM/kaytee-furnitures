"use client";
import { useState, useEffect, useRef, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    src: "/images/hero/hero1.jpg",
    room: "Living Room",
    place: "Ikoyi",
  },
  {
    src: "/images/hero/hero2.jpg",
    room: "Living Room",
    place: "Victoria Island",
  },
  {
    src: "/images/hero/hero3.jpg",
    room: "Kitchen & Dining",
    place: "Lekki",
  },
];

const SLIDE_DURATION = 7000;

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const goTo = (i: SetStateAction<number>) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setActive(i);
    timerRef.current = setInterval(() => {
      setActive((cur) => (cur + 1) % SLIDES.length);
    }, SLIDE_DURATION);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-charcoal">
      {/* Carousel */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1400 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            <div
              className={`absolute inset-0 ${i === active ? "hero-slide-active" : ""}`}
              style={{ transform: i === active ? undefined : "scale(1.06)" }}
            >
              <Image
                src={slide.src}
                alt={`${slide.room}, ${slide.place} — Kaytee Furnitures`}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        ))}
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/55 via-charcoal/15 to-charcoal/10" />
        {/* <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/10 to-transparent" /> */}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pt-28">
        <div
          className={`flex items-center gap-3 mb-7 ${mounted ? "hero-reveal" : "opacity-0"}`}
        >
          <span className="inline-block w-8 h-px bg-brand-400" />
          <p className="font-sans text-[10px] font-medium tracking-[0.32em] uppercase text-brand-200">
            Interior Design &amp; Bespoke Furniture — Lagos, Nigeria
          </p>
          <span className="inline-block w-8 h-px bg-brand-400" />
        </div>

        <h1
          className={`font-hero text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[1.05] tracking-tight text-white max-w-4xl ${mounted ? "hero-reveal" : "opacity-0"}`}
          style={{
            animationDelay: "0.1s",
            // textShadow: "0 4px 28px rgba(0,0,0,0.35)",
          }}
        >
          Interiors considered
          <br />
          down to the last chair.
          {/* <span className="text-brand-300">chair.</span> */}
        </h1>

        {/* <p
          className={`font-display italic text-lg sm:text-xl text-sand-100/75 max-w-md mt-6 ${mounted ? "hero-reveal" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          Bespoke furniture and full interior design, built room by room across
          Lagos.
        </p> */}

        <div
          className={`flex flex-col sm:flex-row items-center gap-4 mt-10 ${mounted ? "hero-reveal" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          <Link href="/consultation">
            <button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium rounded-sm transition-colors">
              Book a consultation
            </button>
          </Link>
          <Link href="/portfolio">
            <button className="backdrop-blur-sm border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium rounded-sm transition-colors">
              View our work
            </button>
          </Link>
        </div>
      </div>

      {/* Editorial footer: stats + room folio */}
      {/* <div className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
          <div className="flex items-center gap-10">
            {[
              ["200+", "Projects"],
              ["12 yrs", "Experience"],
              ["98%", "Satisfaction"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-[24px] font-light text-white leading-none">
                  {n}
                </p>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/40 mt-1">
                  {l}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-brand-300">
                {String(active + 1).padStart(2, "0")} —{" "}
                {SLIDES.length.toString().padStart(2, "0")}
              </p>
              <p className="font-display text-[15px] text-white/85 leading-tight">
                {SLIDES[active].room},{" "}
                <span className="text-white/50">{SLIDES[active].place}</span>
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              {SLIDES.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Show ${slide.room}, ${slide.place}`}
                  aria-current={i === active}
                  className="group py-1"
                >
                  <span
                    className={`block h-px transition-all duration-300 ${
                      i === active
                        ? "w-8 bg-brand-300"
                        : "w-4 bg-white/25 group-hover:bg-white/50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "../ui/button";

// export function HeroSection() {
//   return (
//     <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center">
//       {/* Background */}
//       <Image
//         src="/images/heroImage.jpg"
//         alt="Luxurious interior"
//         fill
//         priority
//         className="object-cover"
//         sizes="100vw"
//       />
//       <div
//         className="absolute inset-0"
//         // style={{
//         //   background:
//         //     "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.65) 100%)",
//         //   filter: "brightness(0.7) contrast(1.1)",
//         // }}
//       />

//       {/* Center content */}
//       <div className="relative z-10 flex flex-col items-center px-6 max-w-3xl mx-auto mt-20">
//         <p className="font-sans text-[10px] font-bold tracking-[0.28em] uppercase text-[#1e4541] mb-0 flex items-end gap-3">
//           <span className="inline-block w-8 h-px bg-[#1e4541]" />
//           Award-winning design studio · Lagos, Nigeria
//           <span className="inline-block w-8 h-px bg-[#1e4541]" />
//         </p>
//         <h1
//           className="font-hero text-[clamp(3rem,50vw,4.75rem)] font-normal leading-[1.03] tracking-tight text-white mb-7"
//           style={{
//             textShadow: "0 3px 20px rgba(0, 0, 0, 0.45)",
//           }}
//         >
//           Beautiful interiors{" "}
//           <em className="not-italic text-brand-400">crafted </em>
//           around your lifestyle.
//         </h1>
//         <div className="w-12 h-px bg-[#1e4541]/60 mb-6" />
//         {/* <p className="font-sans text-sm font-light leading-relaxed text-white/65 max-w-md mb-9">
//           We transform houses into homes — bespoke interior design and curated
//           furniture for those who believe where you live shapes how you live.
//         </p> */}
//         <div className="flex items-center gap-5">
//           <Link href="/consultation">
//             <button className="backdrop-blur-sm border border-white/30 bg-white/8 text-white px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase font-light rounded-sm">
//               Book a consultation
//             </button>
//           </Link>

//           <Link
//             href="/portfolio"
//             // className="text-[#1e4541] text-[11px] tracking-[0.18em] uppercase font-light border-b border-[#1e4541]/40 pb-0.5"
//           >
//             <Button size="lg">View our work </Button>
//           </Link>
//         </div>
//         {/* <div className="flex items-center gap-5">
//           <div className="flex items-center gap-6">
//             <Link href="/consultation">
//               <button className="bg-[#1A1714] text-[#F2EDE6] px-7 py-3.5 text-xs tracking-widest uppercase font-sans rounded-sm">
//                 Book a consultation
//               </button>
//             </Link>
//             <Link
//               href="/portfolio"
//               className="text-[#8B7355] text-xs tracking-widest uppercase border-b border-[#D4C5B0] pb-0.5"
//             >
//               View our work →
//             </Link>
//           </div>
//         </div> */}
//       </div>

//       {/* Stats */}
//       <div className="absolute bottom-9 left-12 right-12 z-10 flex justify-center gap-14 pt-6 border-t border-white/10">
//         {[
//           ["200+", "Projects"],
//           ["12 yrs", "Experience"],
//           ["98%", "Satisfaction"],
//         ].map(([n, l]) => (
//           <div key={l}>
//             <p className="font-display text-[30px] font-light text-white leading-none">
//               {n}
//             </p>
//             <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/40 mt-1.5">
//               {l}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
