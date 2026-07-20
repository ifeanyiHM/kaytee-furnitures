"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RiPaletteLine,
  RiLayoutGridLine,
  RiStoreLine,
  RiSmartphoneLine,
  RiBuildingLine,
  RiLightbulbLine,
  RiAddLine,
  RiArrowRightUpLine,
} from "react-icons/ri";

const iconMap: Record<string, React.ElementType> = {
  "interior-design": RiPaletteLine,
  "space-planning": RiLayoutGridLine,
  "furniture-procurement": RiStoreLine,
  "virtual-consultation": RiSmartphoneLine,
  "renovation-management": RiBuildingLine,
  "lighting-design": RiLightbulbLine,
};

type Service = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  priceFrom?: number;
  duration?: string;
  image?: string;
};

export function ServicesAccordion({ services }: { services: Service[] }) {
  const [open, setOpen] = useState(-1);

  // Reads the current URL hash and opens the matching panel. Runs on
  // first load AND every time the hash changes afterward — the bug was
  // that this only ever ran once, on mount, so clicking a different
  // #slug link while already on /services never updated anything.
  const syncFromHash = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      setOpen(-1);
      return;
    }
    const index = services.findIndex((s) => s.slug === hash);
    if (index === -1) return;

    setOpen(index);
    requestAnimationFrame(() => {
      document
        .getElementById(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [services]);

  useEffect(() => {
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [syncFromHash]);

  // Manual accordion clicks also keep the URL in sync — using
  // replaceState (not push) means there's always exactly one hash in
  // the address bar, never a leftover from whatever was open before.
  function toggle(i: number, slug: string) {
    const willOpen = open !== i;
    setOpen(willOpen ? i : -1);
    const url = willOpen
      ? `${window.location.pathname}#${slug}`
      : window.location.pathname;
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="border-t border-sand-200">
      {services.map((service, i) => {
        const Icon = iconMap[service.slug] || RiPaletteLine;
        const isOpen = open === i;

        return (
          <div
            key={service._id}
            id={service.slug}
            className="border-b border-sand-200"
          >
            <button
              type="button"
              onClick={() => toggle(i, service.slug)}
              aria-expanded={isOpen}
              className="group w-full flex items-center gap-5 sm:gap-8 py-8 sm:py-10 text-left"
            >
              <p
                className="font-display text-2xl sm:text-3xl leading-none shrink-0 w-10 sm:w-14 transition-colors duration-300"
                style={{
                  WebkitTextStroke: isOpen ? "0" : "1px #a07848",
                  color: isOpen ? "#8c6a3f" : "transparent",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>

              <Icon
                className={`w-5 h-5 shrink-0 hidden sm:block transition-colors duration-300 ${
                  isOpen ? "text-brand-600" : "text-charcoal-muted/50"
                }`}
              />

              <div className="flex-1 min-w-0">
                <h2
                  className={`font-display text-2xl sm:text-3xl leading-tight transition-colors duration-300 ${
                    isOpen ? "text-charcoal" : "text-charcoal/80"
                  }`}
                >
                  {service.name}
                </h2>
                {!isOpen && (
                  <p className="font-sans text-sm text-charcoal-muted mt-1.5 truncate max-w-lg">
                    {service.description}
                  </p>
                )}
              </div>

              <RiAddLine
                className={`w-5 h-5 text-charcoal-muted shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-45 text-brand-600" : "group-hover:rotate-90"
                }`}
              />
            </button>

            <div
              className="grid transition-all duration-500 ease-in-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-14 pb-12 sm:pb-14 pl-0 sm:pl-15">
                  <div className="relative w-full aspect-4/3 overflow-hidden bg-charcoal">
                    {service.image && (
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="font-sans text-charcoal-muted leading-relaxed mb-6 max-w-lg">
                      {service.description}
                    </p>

                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                      {service.features.slice(0, 6).map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2.5 font-sans text-sm text-charcoal"
                        >
                          <span className="w-1 h-1 bg-brand-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/consultation"
                      className="inline-flex items-center gap-2 font-sans text-[11px] font-medium text-charcoal tracking-[0.14em] uppercase border-b border-charcoal/30 pb-1 hover:border-brand-600 hover:text-brand-700 transition-colors w-fit"
                    >
                      Book a consultation
                      <RiArrowRightUpLine className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
