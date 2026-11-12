const principles = [
  {
    number: "01",
    title: "Thoughtful by nature",
    description:
      "We begin by understanding the people, routines and possibilities behind every space.",
  },
  {
    number: "02",
    title: "Personal by design",
    description:
      "Each direction responds to the brief rather than following a fixed look or formula.",
  },
  {
    number: "03",
    title: "Considered in detail",
    description:
      "Materials, proportions, lighting and finishing touches are brought together with care.",
  },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-20 lg:py-24 xl3:py-32">
      <div className="absolute left-0 top-0 hidden h-24 w-24 border-l border-t border-brand-400/20 lg:block" />
      <div className="absolute bottom-0 right-0 hidden h-24 w-24 border-b border-r border-brand-400/20 lg:block" />
      <div className="site-container">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <p className="site-label mb-5 tracking-[0.24em] text-brand-300">
            The way we see it
          </p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.08] text-white">
            Good design is felt
            <br className="hidden sm:block" /> in the details.
          </h2>
        </div>
        <div className="grid border-t border-white/15 md:grid-cols-3">
          {principles.map((principle) => (
            <article
              key={principle.number}
              className="border-b border-white/15 py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <p className="mb-8 font-sans text-[10px] tracking-[0.22em] text-brand-300">
                {principle.number}
              </p>
              <h3 className="font-display text-2xl font-light text-white xl3:text-3xl">
                {principle.title}
              </h3>
              <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-white/50">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
