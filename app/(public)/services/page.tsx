import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { getFeaturedPortfolio } from "@/lib/portfolio";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Interior Design",
  description:
    "Explore Kaytee Furnitures & Interior's considered approach to residential interior design in Lagos, Nigeria.",
  alternates: { canonical: "/services" },
};

const elements = [
  {
    number: "01",
    title: "Understanding the space",
    description:
      "We begin with your brief, the character of the property and the way each room needs to work. This gives the project a clear purpose from the outset.",
  },
  {
    number: "02",
    title: "Developing the direction",
    description:
      "We shape a cohesive design language through layouts, colour, materials, finishes and the details that bring the concept together.",
  },
  {
    number: "03",
    title: "Bringing the design together",
    description:
      "Furniture, lighting and accessories are considered as part of the whole interior. Visualisations and specifications are developed where the project requires them.",
  },
  {
    number: "04",
    title: "Completing the picture",
    description:
      "Where implementation is part of the agreed scope, we coordinate the relevant details and work towards a considered, cohesive finished space.",
  },
];

const spaces = [
  "Living rooms",
  "Bedrooms",
  "Kitchens",
  "Dining spaces",
  "Full residences",
];

export default function ServicesPage() {
  const projects = getFeaturedPortfolio(3);

  return (
    <>
      <PageHero
        eyebrow="Our service · Interior design"
        lines={["Spaces shaped", "around living."]}
        intro="A considered approach to interior design, bringing space, material, light and detail together in a way that feels distinctly yours."
        image="/images/hero/hero2.jpg"
        alt="Refined interior space by Kaytee Furnitures & Interior"
      />

      <section id="interior-design" className="site-section bg-sand-50">
        <div className="site-container grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="site-kicker mb-7 flex items-center gap-4 text-brand-600">
              <span className="h-px w-10 bg-brand-500" />
              One considered service
            </p>
            <h2 className="site-heading max-w-[11ch]">
              Interior design, from the whole to the smallest detail.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <p className="site-copy text-charcoal-muted">
              We see interior design as the work of making every part of a space
              feel connected. The layout, finishes, furniture, lighting and
              styling are not separate offerings; they are decisions within one
              design process.
            </p>
            <p className="site-copy mt-6 text-charcoal-muted">
              The exact scope is shaped around the property and your brief. Some
              projects call for a focused room transformation, while others
              require a more complete approach across the home.
            </p>
            <div className="mt-9 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {spaces.map((space, index) => (
                <div
                  key={space}
                  className="group flex items-center gap-4 border-t border-sand-300 py-4"
                >
                  <span className="font-sans text-[10px] tracking-[0.16em] text-brand-500">
                    0{index + 1}
                  </span>

                  <span className="font-display text-xl text-charcoal transition-colors duration-300 group-hover:text-brand-600 sm:text-2xl">
                    {space}
                  </span>

                  <span className="ml-auto text-sm text-sand-400 transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-container">
          <div className="mb-14 max-w-2xl">
            <p className="site-kicker mb-6 flex items-center gap-4 text-brand-600">
              <span className="h-px w-10 bg-brand-500" />
              Within the design
            </p>
            <h2 className="site-heading">One vision, thoughtfully resolved.</h2>
            <p className="site-copy mt-5 max-w-xl text-charcoal-muted">
              Depending on the brief, an interior design project may bring
              together the following considerations.
            </p>
          </div>
          <div className="grid gap-0 border-t border-sand-300 md:grid-cols-2">
            {[
              [
                "Space planning",
                "Room layouts, circulation and furniture placement.",
              ],
              [
                "Concept development",
                "Mood, colour direction and a cohesive visual language.",
              ],
              [
                "Materials & finishes",
                "Textures, surfaces and details selected to work together.",
              ],
              [
                "Furniture & lighting",
                "Pieces and lighting choices considered in the context of the whole space.",
              ],
              [
                "Design visualisation",
                "Drawings or 3D views where they are useful to the project.",
              ],
              [
                "Styling & coordination",
                "The finishing details and implementation support agreed for the project.",
              ],
            ].map(([title, description], index) => (
              <article
                key={title}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-sand-300 py-7 md:py-9 md:pr-10 md:even:pl-10 md:even:border-l"
              >
                <span className="pt-1 font-sans text-[10px] tracking-[0.2em] text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-light text-charcoal">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-charcoal-muted">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section bg-brand-50">
        <div className="site-container grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="site-kicker mb-6 flex items-center gap-4 text-brand-600">
              <span className="h-px w-10 bg-brand-500" />
              Our approach
            </p>
            <h2 className="site-heading">
              A clear process. A considered result.
            </h2>
            <p className="site-copy mt-6 text-charcoal-muted">
              Every project is different, but our approach keeps the work
              collaborative, intentional and grounded in your brief.
            </p>
          </div>
          <ol className="border-t border-brand-200 lg:col-span-7 lg:col-start-6">
            {elements.map((item) => (
              <li
                key={item.number}
                className="grid gap-3 border-b border-brand-200 py-7 sm:grid-cols-[4rem_1fr] sm:gap-6"
              >
                <span className="font-hero text-3xl text-brand-600">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-light text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-charcoal-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="site-section bg-white">
          <div className="site-container">
            <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="site-kicker mb-5 flex items-center gap-4 text-brand-600">
                  <span className="h-px w-10 bg-brand-500" />
                  Selected work
                </p>
                <h2 className="site-heading">A look at what we create.</h2>
              </div>
              <Link href="/portfolio" className="link-draw text-charcoal">
                View the portfolio <RiArrowRightUpLine className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => {
                const cover =
                  project.media?.after?.[0] ?? project.media?.before?.[0];
                if (!cover) return null;
                return (
                  <Link
                    key={project.slug}
                    href={`/portfolio/${project.slug}`}
                    className="group"
                  >
                    <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-sand-100">
                      <Image
                        src={cover.src}
                        alt={cover.alt ?? project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="site-label mb-2 text-brand-600">
                      {project.location}
                    </p>
                    <h3 className="font-display text-2xl font-light text-charcoal transition-colors group-hover:text-brand-700">
                      {project.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
