"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Section = { id: string; title: string };

export function LegalToc({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((best, e) =>
          e.boundingClientRect.top < best.boundingClientRect.top ? e : best,
        );
        setActive(topmost.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-28">
      <p className="font-sans text-[10px] text-charcoal-muted uppercase tracking-[0.2em] mb-5">
        On this page
      </p>
      <div className="relative pl-4">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-sand-300" />
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className={`relative block py-1.5 font-sans text-sm leading-relaxed transition-colors duration-200 ${
                isActive
                  ? "text-brand-600 font-medium"
                  : "text-charcoal-muted hover:text-charcoal"
              }`}
            >
              {isActive && (
                <span className="absolute -left-4 top-0 bottom-0 w-px bg-brand-500" />
              )}
              {String(i + 1).padStart(2, "0")}. {s.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
