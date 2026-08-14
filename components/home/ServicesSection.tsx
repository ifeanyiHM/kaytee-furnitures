import Link from "next/link";
import Image from "next/image";
import {
  RiPaletteLine,
  RiLayoutGridLine,
  RiStoreLine,
  RiSmartphoneLine,
  RiBuildingLine,
  RiLightbulbLine,
  RiArrowRightLine,
} from "react-icons/ri";

const services = [
  {
    icon: RiPaletteLine,
    title: "Interior Design",
    tag: "Full service",
    desc: "End-to-end design from mood board to final styling — every detail considered, nothing left to chance.",
    href: "/services/interior-design",
    image:
      "https://i.pinimg.com/1200x/1b/ac/10/1bac109b1b2cb3b67be991ff80a0dc5d.jpg",
    stat: "200+",
    statLabel: "projects delivered",
  },
  {
    icon: RiLayoutGridLine,
    title: "Space Planning",
    tag: "Strategic",
    desc: "Intelligent layouts that unlock your space's potential — functional, beautiful, and precisely drawn.",
    href: "/services/space-planning",
    image:
      "https://i.pinimg.com/736x/86/3f/dc/863fdc5138f2ff6181abe06259325e92.jpg",
    stat: "98%",
    statLabel: "client satisfaction",
  },
  {
    icon: RiStoreLine,
    title: "Furniture Procurement",
    tag: "Curated",
    desc: "Access to a network of premium suppliers. We source, negotiate, deliver, and install on your behalf.",
    href: "/services/furniture-procurement",
    image:
      "https://i.pinimg.com/1200x/c3/38/8a/c3388a246ab83cfecc8b572bea7a6700.jpg",
    stat: "50+",
    statLabel: "supplier network",
  },
  {
    icon: RiSmartphoneLine,
    title: "Virtual Consultation",
    tag: "Remote",
    desc: "Same expert advice, no commute. A focused video session with a mood board and product shortlist.",
    href: "/services/virtual-consultation",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    stat: "48h",
    statLabel: "turnaround time",
  },
  {
    icon: RiBuildingLine,
    title: "Renovation Management",
    tag: "Managed",
    desc: "From first demo to final coat — we coordinate every contractor, timeline, and budget milestone.",
    href: "/services/renovation-management",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1200&auto=format&fit=crop",
    stat: "12+",
    statLabel: "years experience",
  },
  {
    icon: RiLightbulbLine,
    title: "Lighting Design",
    tag: "Ambient",
    desc: "Layered schemes that shift with the light of day — task, accent, and architectural lighting unified.",
    href: "/services/lighting-design",
    image:
      "https://i.pinimg.com/1200x/64/e4/08/64e4087d8dfc7db8bccf7eca46d0135e.jpg",
    stat: "3D",
    statLabel: "lighting simulation",
  },
];

export function ServicesSection() {
  return (
    <section className="site-section bg-white overflow-hidden">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-brand-600" />
              <p className="site-label text-brand-600 tracking-[0.28em]">
                What we offer
              </p>
            </div>
            <h2 className="site-heading">
              Six disciplines.
              <br />
              <span className="text-brand-600">One studio.</span>
            </h2>
          </div>
          <p className="font-sans text-sm xxl:text-[15px] xl2:text-[15px] xl3:text-base xl4:text-base text-charcoal-muted max-w-xs leading-relaxed lg:text-right">
            From a single room refresh to a full turnkey build — we scale to
            every project without compromising quality.
          </p>
        </div>

        {/* Service rows */}
        <div className="space-y-3">
          {services.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              className="group flex flex-col sm:flex-row items-stretch border border-strike hover:border-strike-hover bg-white hover:bg-brand-50/30 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Image — alternates left/right */}
              <div
                className={`relative w-full sm:w-48 lg:w-64 xxl:w-72 xl2:w-80 xl3:w-96 xl4:w-md shrink-0 overflow-hidden ${i % 2 !== 0 ? "sm:order-last" : "sm:order-first"}`}
              >
                <div className="aspect-video sm:aspect-auto sm:h-full min-h-36 xxl:min-h-40">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    // sizes="(max-width: 640px) 100vw, (max-width: 1440px) 288px, (max-width: 1536px) 320px, (max-width: 1680px) 384px, (max-width: 1920px) 448px, 448px"
                  />
                  {/* Subtle warm scrim on mobile so text on top of image reads */}
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/30 to-transparent sm:hidden" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 px-6 py-5 lg:px-8 lg:py-6">
                {/* Index + icon */}
                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 shrink-0">
                  <span className="font-sans text-[11px] xxl:text-[12px] xl2:text-[12px] xl3:text-[13px] xl4:text-[13px] text-charcoal-muted/50 tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-9 h-9 rounded border border-brand-200 bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 group-hover:border-brand-400 transition-colors">
                    <s.icon className="w-4 h-4 text-brand-600" />
                  </div>
                </div>

                {/* Vertical rule */}
                <div className="hidden sm:block w-px self-stretch bg-sand-200" />

                {/* Title + description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-display text-xl xxl:text-[1.4rem] xl2:text-[1.5rem] xl3:text-[1.7rem] xl4:text-[1.9rem] text-charcoal transition-colors">
                      {s.title}
                    </h3>
                    <span className="site-tag hidden sm:inline-block text-charcoal-light/70">
                      {s.tag}
                    </span>
                  </div>
                  <p className="font-sans text-sm xxl:text-[15px] xl2:text-[16px] xl3:text-base xl4:text-lg text-charcoal-muted leading-relaxed line-clamp-2">
                    {s.desc}
                  </p>
                </div>

                {/* Stat — large screens only */}
                <div className="hidden lg:flex flex-col items-end shrink-0 border-l border-sand-200 pl-8 xxl:pl-10 xl2:pl-10 xl3:pl-12 xl4:pl-12">
                  <span className="font-display text-3xl xxl:text-[2.1rem] xl2:text-[2.25rem] xl3:text-[2.5rem] xl4:text-[2.75rem] text-charcoal/80 leading-none">
                    {s.stat}
                  </span>
                  <span className="font-sans text-[11px] xxl:text-[12px] xl2:text-[12px] xl3:text-[13px] xl4:text-[13px] text-charcoal-muted mt-1 whitespace-nowrap">
                    {s.statLabel}
                  </span>
                </div>

                {/* Arrow */}
                <div className="shrink-0 w-8 h-8 rounded-full border border-border-charcoal-light/50 flex items-center justify-center group-hover:border-charcoal-light/70 group-hover:bg-charcoal-light/70 transition-all duration-200 ml-auto sm:ml-0">
                  <RiArrowRightLine className="w-3.5 h-3.5 text-charcoal-muted group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer strip */}
        <div className="mt-16 pt-10 border-t border-sand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-sans text-sm xxl:text-[15px] xl2:text-[15px] xl3:text-base xl4:text-base text-charcoal-muted max-w-sm leading-relaxed">
            Every engagement starts with a free discovery call — no commitment,
            no pressure.
          </p>
          <Link
            href="/consultation"
            className="group inline-flex items-center gap-3 font-sans text-sm xxl:text-[15px] xl2:text-[15px] xl3:text-base xl4:text-base font-medium text-charcoal border border-sand-300 hover:border-brand-600 hover:text-brand-700 hover:bg-brand-50 px-6 xxl:px-7 xl2:px-7 xl3:px-8 xl4:px-8 py-3 xxl:py-3.5 xl2:py-3.5 xl3:py-4 xl4:py-4 rounded-full transition-all duration-200"
          >
            Book your free call
            <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
