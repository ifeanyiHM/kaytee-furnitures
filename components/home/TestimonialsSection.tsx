"use client";
import type { TestimonialType } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

/** Renders only real, approved testimonials from the database — nothing is invented. */
export function TestimonialsSection({
  testimonials,
}: {
  testimonials: TestimonialType[];
}) {
  const [i, setI] = useState(0);
  if (testimonials.length === 0) return null;
  const t = testimonials[i];
  const go = (d: number) =>
    setI((n) => (n + d + testimonials.length) % testimonials.length);

  return (
    <section className="site-section bg-sand-100">
      <div className="site-container grid grid-cols-1 gap-10 lg:grid-cols-12">
        <p className="site-kicker flex items-center gap-4 text-brand-600 lg:col-span-3">
          <span className="h-px w-10 bg-brand-500" />
          Kind words
        </p>
        <div className="lg:col-span-8">
          <div aria-live="polite" className="min-h-72">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="font-display text-[clamp(1.6rem,3vw,2.8rem)] font-light leading-tight text-charcoal xl3:text-[3.4rem]">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-sans text-sm font-medium text-charcoal">
                    {t.name}
                  </p>
                  <p className="site-label mt-1">
                    {[t.role, t.company].filter(Boolean).join(", ")}
                    {t.projectRef ? ` — ${t.projectRef}` : ""}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          {testimonials.length > 1 && (
            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center border border-charcoal/30 transition-colors hover:bg-charcoal hover:text-white"
              >
                <RiArrowLeftLine />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-12 w-12 items-center justify-center border border-charcoal/30 transition-colors hover:bg-charcoal hover:text-white"
              >
                <RiArrowRightLine />
              </button>
              <span className="ml-3 font-sans text-xs text-charcoal-muted">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
