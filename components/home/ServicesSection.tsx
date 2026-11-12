import Image from "next/image";
import Link from "next/link";
import { RiArrowRightUpLine, RiCheckLine } from "react-icons/ri";

const designElements = [
  {
    number: "01",
    title: "Space & flow",
    description:
      "Layouts shaped around the way you move, gather, rest and live in each room.",
    image:
      "https://i.pinimg.com/736x/86/3f/dc/863fdc5138f2ff6181abe06259325e92.jpg",
    alt: "Thoughtfully planned contemporary interior space",
  },
  {
    number: "02",
    title: "Materials & detail",
    description:
      "A considered mix of finishes, textures and colours that gives every space its character.",
    image:
      "https://i.pinimg.com/1200x/c3/38/8a/c3388a246ab83cfecc8b572bea7a6700.jpg",
    alt: "Interior material and finish selection",
  },
  {
    number: "03",
    title: "Furniture & lighting",
    description:
      "Furniture, lighting and finishing touches selected to work together as one composition.",
    image:
      "https://i.pinimg.com/1200x/64/e4/08/64e4087d8dfc7db8bccf7eca46d0135e.jpg",
    alt: "Carefully styled interior with considered lighting",
  },
];

const inclusions = [
  "Design concept and visual direction",
  "Space planning and layout development",
  "Material, colour and finish selection",
  "Furniture, lighting and accessory direction",
  "Design visualisation where required",
  "Styling and implementation coordination, as agreed",
];

export function ServicesSection() {
  return (
    <section className="site-section overflow-hidden bg-white">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-600" />
              <p className="site-label tracking-[0.28em] text-brand-600">
                What we do
              </p>
            </div>
            <h2 className="site-heading max-w-[13ch]">
              One service.
              <br />
              <span className="text-brand-600">Every detail in view.</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-charcoal-muted lg:col-span-5 lg:justify-self-end lg:text-right xl3:text-base">
            We provide considered interior design for spaces that feel as good
            to live in as they look. Every decision belongs to one thoughtful,
            cohesive vision.
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-2xl border border-sand-200 bg-sand-50 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[22rem] sm:min-h-[30rem] lg:min-h-[42rem]">
            <Image
              src="https://i.pinimg.com/1200x/1b/ac/10/1bac109b1b2cb3b67be991ff80a0dc5d.jpg"
              alt="Refined contemporary interior designed with a warm, natural palette"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-charcoal/50 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 font-sans text-[10px] uppercase tracking-[0.24em] text-white/80 sm:bottom-8 sm:left-8">
              Interior design · Lagos, Nigeria
            </p>
          </div>

          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12 xl3:p-16">
            <div>
              <p className="site-label mb-5 tracking-[0.24em] text-brand-600">
                Our service
              </p>
              <h3 className="font-display text-4xl font-light leading-[1.05] text-charcoal sm:text-5xl xl3:text-6xl">
                Interior
                <br />
                Design
              </h3>
              <p className="mt-7 max-w-lg font-sans text-sm leading-[1.9] text-charcoal-muted xl3:text-base">
                From the first conversation to the finishing touches, we bring
                together the elements that make a space feel complete. Our work
                is shaped around your needs, the character of your property and
                the way you want to experience it.
              </p>
            </div>

            <div className="mt-10 border-t border-sand-300 pt-7">
              <p className="site-label mb-5 text-charcoal-muted">
                A considered design can include
              </p>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <RiCheckLine className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span className="font-sans text-xs leading-relaxed text-charcoal/75 xl3:text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="link-draw mt-9 inline-flex text-charcoal"
              >
                Explore our approach <RiArrowRightUpLine className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-7 sm:grid-cols-3 lg:mt-20 lg:gap-8">
          {designElements.map((item) => (
            <article key={item.number} className="group">
              <div className="relative mb-5 aspect-[5/4] overflow-hidden bg-sand-100">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-start gap-4">
                <span className="pt-1 font-sans text-[10px] tracking-[0.2em] text-brand-600">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-light text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-charcoal-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
