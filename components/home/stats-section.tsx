const stats = [
  {
    value: "200+",
    label: "Projects completed",
    desc: "Across residential and commercial spaces",
  },
  {
    value: "12+",
    label: "Years of expertise",
    desc: "Creating beautiful interiors since 2012",
  },
  {
    value: "50+",
    label: "Design awards",
    desc: "Recognised for excellence and innovation",
  },
  {
    value: "98%",
    label: "Client satisfaction",
    desc: "Based on post-project survey results",
  },
];

export function StatsSection() {
  return (
    <section className="relative py-20 lg:py-24 bg-charcoal overflow-hidden">
      {/* Faint brass corner rule — echoes the hero/services grid language */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-brand-400/20 hidden lg:block" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-brand-400/20 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-sans text-[11px] font-medium text-brand-300 tracking-[0.24em] uppercase text-center lg:text-left mb-12">
          By the numbers
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center lg:text-left py-8 px-2 lg:px-8 lg:first:pl-0 border-b border-white/10 lg:border-b-0 lg:border-r lg:border-r-white/10 lg:last:border-r-0"
            >
              <p className="font-hero text-[clamp(2.5rem,5vw,3.75rem)] text-white leading-none mb-3">
                {stat.value}
              </p>
              <p className="font-sans font-medium text-white text-sm tracking-wide mb-1.5">
                {stat.label}
              </p>
              <p className="font-sans text-white/40 text-xs leading-relaxed hidden lg:block max-w-[16rem]">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
