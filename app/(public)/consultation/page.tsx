import type { Metadata } from "next";
import { getServices } from "@/actions/bookings";
import { ConsultationExperience } from "@/components/booking/ConsultationExperience";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Start a Project — Book a Consultation",
  description:
    "Book a free consultation with Kaytee Furnitures & Interior. Tell us about your space and we'll reach out personally within 24 hours.",
  alternates: { canonical: "/consultation" },
};

const STEPS = [
  { n: "01", label: "Submit your brief", sub: "Two minutes, no commitment" },
  { n: "02", label: "We call within 24 hours", sub: "Your dedicated design lead" },
  { n: "03", label: "Receive your quote", sub: "Itemised, clear, obligation-free" },
  { n: "04", label: "Consultation begins", sub: "Virtual or in person" },
];

export default async function ConsultationPage() {
  const services = await getServices().catch(() => []);

  return (
    <>
      <PageHero
        eyebrow="Start a project"
        lines={["Your space starts", "with one call."]}
        intro="Tell us about your project. We review it, then reach out personally — no scripts, no sales pressure."
        image="/images/hero/hero2.jpg"
      />

      <section className="site-section bg-sand-50">
        <div className="site-container grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="site-kicker mb-10 flex items-center gap-4 text-brand-600"><span className="h-px w-10 bg-brand-500" />What happens next</p>
            <ol className="border-t border-sand-300">
              {STEPS.map((s) => (
                <li key={s.n} className="grid grid-cols-[3rem_1fr] border-b border-sand-300 py-6 xl3:py-8">
                  <span className="font-hero text-2xl text-brand-500 xl3:text-3xl">{s.n}</span>
                  <div>
                    <p className="font-display text-xl text-charcoal xl3:text-2xl">{s.label}</p>
                    <p className="site-label mt-1.5">{s.sub}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <p className="site-copy mb-1">Prefer to call?</p>
              <a href="tel:+2348079197554" className="font-display text-2xl text-charcoal transition-colors hover:text-brand-600">+234 807 919 7554</a>
              <p className="site-label mt-1">Mon–Fri · 9am–5pm WAT</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <div className="border border-sand-300 bg-white p-6 sm:p-10 xl3:p-14">
              <ConsultationExperience services={services} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
