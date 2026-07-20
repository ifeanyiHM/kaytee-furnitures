import type { Metadata } from "next";
import Image from "next/image";
import { getServices } from "@/actions/bookings";
import { ConsultationExperience } from "@/components/booking/ConsultationExperience";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book your free interior design consultation with Luxe Interiors.",
};

export default async function ConsultationPage() {
  const services = await getServices().catch(() => []);

  return (
    <>
      {/* ── Full-viewport split hero ── */}
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left — dark editorial panel */}
        <div className="relative lg:w-[42%] bg-charcoal flex flex-col justify-between pt-32 pb-12 px-8 lg:px-14 min-h-[50vh] lg:min-h-screen">
          {/* Background image at low opacity */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover opacity-20"
              sizes="42vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-sm">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-brand-400" />
              <p className="font-sans text-[10px] text-brand-400 tracking-[0.3em] uppercase font-medium">
                Free consultation
              </p>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,4vw,3.3rem)] text-white leading-[0.95] tracking-tight mb-8">
              Your space starts
              <br />
              with
              <span className="text-brand-400"> one call.</span>
            </h1>

            <p className="font-sans text-white/50 leading-relaxed text-base max-w-xs">
              Tell us about your project. We review it, then reach out
              personally — no scripts, no sales pressure.
            </p>
          </div>

          {/* What happens next — vertical timeline */}
          <div className="relative z-10 mt-14 lg:mt-0">
            <p className="font-sans text-[10px] text-white/30 uppercase tracking-[0.22em] mb-6">
              What happens next
            </p>
            <div className="space-y-0">
              {[
                {
                  n: "01",
                  label: "Submit your brief",
                  sub: "2 minutes, no commitment",
                },
                {
                  n: "02",
                  label: "We call within 24h",
                  sub: "Your dedicated design lead",
                },
                {
                  n: "03",
                  label: "Receive your quote",
                  sub: "Itemised, clear, obligation-free",
                },
                {
                  n: "04",
                  label: "Consultation begins",
                  sub: "Virtual or in-person",
                },
              ].map((item, i, arr) => (
                <div key={item.n} className="flex gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-6 h-6 rounded-full border border-brand-600/50 bg-brand-600/10 flex items-center justify-center">
                      <span className="font-sans text-[9px] text-brand-400 font-medium">
                        {item.n}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-px flex-1 bg-white/8 my-1.5 min-h-5" />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className="font-sans text-sm text-white/80 font-medium leading-snug">
                      {item.label}
                    </p>
                    <p className="font-sans text-[11px] text-white/30 mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact escape hatch */}
            <div className="mt-8 pt-8 border-t border-white/8">
              <p className="font-sans text-xs text-white/30 mb-1.5">
                Prefer to call directly?
              </p>
              <a
                href="tel:+2348012345678"
                className="font-display text-base text-white/60 hover:text-white transition-colors"
              >
                +234 801 234 5678
              </a>
              <p className="font-sans text-[10px] text-white/25 mt-1">
                Mon–Fri · 9am–6pm WAT
              </p>
            </div>
          </div>
        </div>

        {/* Right — form panel */}
        <div className="flex-1 bg-brand-50 flex items-start justify-center pt-12 lg:pt-0 lg:items-center px-6 py-12 lg:py-0">
          <div className="w-full max-w-lg">
            <ConsultationExperience services={services} />
          </div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section className="bg-white border-t border-sand-200 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:divide-x divide-sand-200">
            {[
              {
                quote:
                  "The consultation alone changed how we saw the space entirely.",
                name: "Adaeze O.",
                loc: "Lekki, Lagos",
              },
              {
                quote:
                  "Within 24 hours we had a call, within 48 a quote. Exactly what they promised.",
                name: "Emeka N.",
                loc: "Victoria Island",
              },
              {
                quote:
                  "No pressure, no hard sell — just a genuinely useful conversation.",
                name: "Funmi A.",
                loc: "Maitama, Abuja",
              },
            ].map((t) => (
              <div key={t.name} className="sm:px-8 first:pl-0 last:pr-0">
                <p className="font-display text-base text-charcoal italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-sans text-sm font-medium text-charcoal">
                  {t.name}
                </p>
                <p className="font-sans text-xs text-charcoal-muted">{t.loc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
