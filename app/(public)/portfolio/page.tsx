import { getPortfolioItems } from "@/actions/portfolio";
import { ProjectMediaViewer } from "@/components/portfolio/ProjectMediaViewer";
import { Pagination } from "@/components/ui/pagination";
import { PORTFOLIO_MOCK } from "@/lib/portfolio-data";
import { PORTFOLIO_CATEGORIES } from "@/lib/utils/constants";
import { motion } from "motion/react";
import type { Metadata } from "next";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";
import { PageHero } from "../../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "200+ award-winning interior design projects across Nigeria and beyond.",
};

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const category = sp.category;
  const page = Number(sp.page) || 1;

  const {
    data: dbItems,
    total,
    pages,
  } = await getPortfolioItems({ category, page, limit: 12 }).catch(() => ({
    data: [],
    total: PORTFOLIO_MOCK.length,
    pages: 1,
  }));

  const allItems = dbItems.length > 0 ? dbItems : PORTFOLIO_MOCK;
  const filtered =
    category && category !== "All"
      ? allItems.filter((i) =>
          Array.isArray(i.category)
            ? i.category.includes(category)
            : i.category === category,
        )
      : allItems;

  const featured = filtered.filter((i) => i.featured).slice(0, 3);
  const rest = filtered.filter((i) => !i.featured || filtered.indexOf(i) >= 3);

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        eyebrow="Portfolio"
        lines={["Work made", "to be lived in."]}
        intro="A selection of completed interiors and bespoke furniture projects across Lagos — before, after, and everything in between."
        image="/images/hero/hero1.jpg"
      />

      {/* ── Filter bar ── */}
      <div className="sticky top-0 z-30 border-b border-sand-200 bg-white/92 backdrop-blur-md">
        <div className="site-container flex items-center justify-between gap-6 py-4 xl3:py-5">
          <div
            role="tablist"
            aria-label="Filter by room"
            className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto"
          >
            {PORTFOLIO_CATEGORIES.map((cat) => {
              const active = (cat === "All" && !category) || cat === category;
              return (
                <Link
                  key={cat}
                  href={
                    cat === "All"
                      ? "/portfolio"
                      : `/portfolio?category=${encodeURIComponent(cat)}`
                  }
                  // className={`shrink-0 px-4 py-1.5 rounded-full font-sans text-sm transition-all duration-200 ${
                  //   active
                  //     ? "bg-charcoal text-white shadow-sm"
                  //     : "text-charcoal-muted hover:text-charcoal hover:bg-sand-100"
                  // }`}
                  className={`relative shrink-0 px-3 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] transition-colors xl3:text-[13px] ${active ? "text-charcoal" : "text-charcoal-muted hover:text-charcoal"}`}
                >
                  {cat}
                  {active && (
                    <motion.span
                      layoutId="cat-underline"
                      className="absolute inset-x-3 bottom-0 h-px bg-brand-600"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <section className="bg-white">
        <div className="site-container py-16 sm:py-20">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-charcoal-muted mb-3">
                No projects in this category yet.
              </p>
              <Link
                href="/portfolio"
                className="font-sans text-sm text-brand-600 hover:underline"
              >
                View all projects
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <p className="font-sans text-[10px] text-charcoal-muted uppercase tracking-[0.22em]">
                  {category ? category : "Selected work"}
                </p>
                <p className="font-sans text-[10px] text-charcoal-muted/60 uppercase tracking-[0.22em]">
                  {filtered.length} project{filtered.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="divide-y divide-sand-200">
                {filtered.map((item, i) => {
                  const beforeFiles = item.media?.before ?? [];
                  const afterFiles = item.media?.after ?? [];
                  return (
                    <div
                      key={item._id}
                      className={`group flex flex-col ${
                        i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                      } items-center gap-8 lg:gap-16 py-14 lg:py-20`}
                    >
                      {/* Media */}

                      <div
                        className={`relative w-full lg:w-7/12 shrink-0 overflow-hidden aspect-4/3.5 md:aspect-4/3 `}
                      >
                        <ProjectMediaViewer media={afterFiles} />
                      </div>
                      <Link
                        href={`/portfolio/${item.slug}`}
                        className="w-full lg:w-5/12"
                      >
                        {/* Content */}
                        <div>
                          <p className="font-sans text-[10px] text-brand-600 uppercase tracking-[0.26em] mb-4 flex flex-wrap items-center gap-x-2">
                            {String(i + 1).padStart(2, "0")} — {item.category}
                            {item.featured && (
                              <span className="text-charcoal-muted">
                                · Featured
                              </span>
                            )}
                          </p>
                          <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] text-charcoal leading-[1.05] mb-4 group-hover:text-charcoal-light/80 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="font-sans text-sm text-charcoal-muted uppercase tracking-wider mb-8">
                            {item.location}
                            {item.location && item.year ? " · " : ""}
                            {item.year}
                          </p>
                          <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium text-charcoal tracking-[0.14em] uppercase border-b border-charcoal/30 pb-1 group-hover:border-brand-600 group-hover:text-brand-700 transition-colors">
                            View project
                            <RiArrowRightUpLine className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {pages > 1 && (
                <div className="mt-4">
                  <Pagination page={page} pages={pages} total={total} />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Bottom CTA band ── */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-sans text-[11px] text-brand-400 tracking-[0.25em] uppercase mb-4">
            Start your project
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] text-white mb-5 leading-tight">
            Ready to see your name in our portfolio?
          </h2>
          <p className="font-sans text-white/50 mb-10 leading-relaxed">
            Book a free discovery call — no commitment, no pressure — and
            let&apos;s talk about what&apos;s possible for your space.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-sans font-medium text-sm px-8 py-4 rounded-xl transition-colors"
          >
            Book your free consultation
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
