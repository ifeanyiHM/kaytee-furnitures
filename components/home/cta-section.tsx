import Link from "next/link";
import Image from "next/image";
import { RiArrowRightLine, RiCalendarLine, RiImageLine } from "react-icons/ri";

const TRUST_ITEMS = [
  { value: "Free", label: "Initial consultation" },
  { value: "48h", label: "Response time" },
  { value: "Zero", label: "Obligation" },
];

export function CtaSection() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA block — asymmetric split */}
        <div className="grid lg:grid-cols-2 lg:min-h-160">
          {/* Left — text content */}
          <div className="flex flex-col justify-center py-20 lg:py-28 lg:pr-16">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-px bg-brand-600" />
              <p className="font-sans text-[11px] font-medium text-brand-600 tracking-[0.28em] uppercase">
                Start your project
              </p>
            </div>

            {/* <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] text-charcoal leading-[1.05] mb-6"> */}
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal leading-[1.05] tracking-tight mb-6">
              Let's design your dream space together
            </h2>

            {/* Trust strip */}
            {/* <div className="flex gap-8 mb-12 pb-10 border-b border-sand-200">
              {TRUST_ITEMS.map((item) => (
                <div key={item.label}>
                  <p className="font-display text-2xl text-brand-600">
                    {item.value}
                  </p>
                  <p className="font-sans text-xs text-charcoal-muted mt-0.5">
                    {item.label}
                  </p>
                </div>
              ))}
            </div> */}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/consultation"
                className="group inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-800 text-white font-sans font-medium text-sm px-7 py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <RiCalendarLine className="w-4 h-4" />
                Book free consultation
                <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              {/* <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2.5 bg-sand-50 hover:bg-sand-100 text-charcoal font-sans font-medium text-sm px-7 py-4 rounded-xl border border-sand-200 hover:border-sand-300 transition-all duration-200"
              >
                <RiImageLine className="w-4 h-4 text-charcoal-muted" />
                Explore our work
              </Link> */}
            </div>
          </div>

          {/* Right — stacked image collage */}
          <div className="relative hidden lg:block">
            {/* Full-height primary image */}
            <div className="absolute inset-0">
              <Image
                src="https://i.pinimg.com/1200x/4c/8d/35/4c8d35315deec0f736c5076c2347b608.jpg"
                alt="Luxe Interiors project"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-linear-to-l from-transparent via-transparent to-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// export function CtaSection() {
//   return (
//     <section className="relative py-32 overflow-hidden">
//       <Image src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80"
//         alt="Beautiful interior design" fill className="object-cover" sizes="100vw" />
//       <div className="absolute inset-0 bg-charcoal/75" />
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <p className="font-sans text-xs text-brand-400 tracking-[0.25em] uppercase mb-4">Ready to begin?</p>
//         <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white leading-tight mb-6 max-w-3xl mx-auto">
//           Let's design your dream space together
//         </h2>
//         <p className="font-sans text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
//           Book a free consultation and take the first step towards a home that truly reflects who you are.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link href="/consultation">
//             <Button size="lg">Book your free consultation</Button>
//           </Link>
//           <Link href="/portfolio">
//             <Button size="lg" variant="ghost-light">Explore our portfolio</Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
