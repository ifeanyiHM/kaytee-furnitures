import { getPortfolioItems } from "@/lib/portfolio";
import { ProjectMediaViewer } from "@/components/portfolio/ProjectMediaViewer";
import { PageHero } from "@/components/ui/PageHero";
import { Pagination } from "@/components/ui/pagination";
import { PORTFOLIO_CATEGORIES } from "@/lib/utils/constants";
import type { PortfolioItemType } from "@/types";
import type { Metadata } from "next";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "200+ award-winning interior design projects across Nigeria and beyond.",
};

const getCategories = (item: PortfolioItemType): string[] => {
  if (Array.isArray(item.category)) {
    return item.category;
  }

  return item.category ? [item.category] : [];
};

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}) {
  const sp = await searchParams;

  const category =
    sp.category && sp.category !== "All" ? sp.category : undefined;

  const requestedPage = Number(sp.page);

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const limit = 12;

  const { data: items, total, pages } = getPortfolioItems({
    category,
    page,
    limit,
  });

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Portfolio"
        lines={["Work made", "to be lived in."]}
        intro="A selection of completed interiors and bespoke furniture projects across Lagos — before, after, and everything in between."
        image="/images/hero/hero1.jpg"
      />

      {/* Filter bar */}
      <div className="sticky top-0 z-30 border-b border-sand-200 bg-white/92 backdrop-blur-md">
        <div className="site-container flex items-center justify-between gap-6 py-4 xl3:py-5">
          <div
            role="group"
            aria-label="Filter projects by category"
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
                  aria-current={active ? "page" : undefined}
                  className={`
                    relative shrink-0 px-3 py-2
                    font-sans text-[11px] font-medium
                    uppercase tracking-[0.16em]
                    transition-colors
                    xl3:text-[13px]
                    ${
                      active
                        ? "text-charcoal"
                        : "text-charcoal-muted hover:text-charcoal"
                    }
                    after:absolute after:inset-x-3 after:bottom-0
                    after:h-px after:bg-brand-600
                    after:transition-transform after:duration-300
                    ${active ? "after:scale-x-100" : "after:scale-x-0"}
                  `}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects */}
      <section className="bg-white">
        <div className="site-container py-16 sm:py-20">
          {items.length === 0 ? (
            <div className="py-24 text-center">
              <p className="mb-3 font-display text-2xl text-charcoal-muted">
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
              {/* Project count */}
              <div className="mb-2 flex items-center justify-between">
                <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-charcoal-muted">
                  {category ?? "Selected work"}
                </p>

                <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-charcoal-muted/60">
                  {total} project{total === 1 ? "" : "s"}
                </p>
              </div>

              {/* Project list */}
              <div className="divide-y divide-sand-200">
                {items.map((item, i) => {
                  const afterFiles = item.media?.after ?? [];

                  const itemCategories = getCategories(item);

                  return (
                    <div
                      key={item._id ?? item.slug}
                      className={`
                        group flex flex-col items-center
                        gap-8 py-14
                        lg:gap-16 lg:py-20
                        ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}
                      `}
                    >
                      {/* Media */}
                      <div
                        className="
                          relative aspect-4/3.5 w-full shrink-0
                          overflow-hidden
                          md:aspect-4/3
                          lg:w-7/12
                        "
                      >
                        <ProjectMediaViewer media={afterFiles} />
                      </div>

                      {/* Content */}
                      <Link
                        href={`/portfolio/${item.slug}`}
                        className="w-full lg:w-5/12"
                      >
                        <div>
                          <p className="mb-4 flex flex-wrap items-center gap-x-2 font-sans text-[10px] uppercase tracking-[0.26em] text-brand-600">
                            {String((page - 1) * limit + i + 1).padStart(
                              2,
                              "0",
                            )}
                            {" — "}
                            {itemCategories.join(", ")}

                            {item.featured && (
                              <span className="text-charcoal-muted">
                                · Featured
                              </span>
                            )}
                          </p>

                          <h3
                            className="
                              mb-4 font-display
                              text-[clamp(1.75rem,3vw,2.75rem)]
                              leading-[1.05] text-charcoal
                              transition-colors duration-300
                              group-hover:text-charcoal-light/80
                            "
                          >
                            {item.title}
                          </h3>

                          <p className="mb-8 font-sans text-sm uppercase tracking-wider text-charcoal-muted">
                            {item.location}
                            {item.location && item.year ? " · " : ""}
                            {item.year}
                          </p>

                          <span
                            className="
                              inline-flex items-center gap-2
                              border-b border-charcoal/30 pb-1
                              font-sans text-[11px] font-medium
                              uppercase tracking-[0.14em]
                              text-charcoal
                              transition-colors
                              group-hover:border-brand-600
                              group-hover:text-brand-700
                            "
                          >
                            View project
                            <RiArrowRightUpLine
                              className="
                                h-3.5 w-3.5
                                transition-transform duration-300
                                group-hover:translate-x-0.5
                                group-hover:-translate-y-0.5
                              "
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="mt-4">
                  <Pagination page={page} pages={pages} total={total} />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-charcoal py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.25em] text-brand-400">
            Start your project
          </p>

          <h2 className="mb-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-white">
            Ready to see your name in our portfolio?
          </h2>

          <p className="mb-10 font-sans leading-relaxed text-white/50">
            Book a free discovery call — no commitment, no pressure — and
            let&apos;s talk about what&apos;s possible for your space.
          </p>

          <Link
            href="/consultation"
            className="
              inline-flex items-center gap-2.5
              rounded-xl bg-brand-600 px-8 py-4
              font-sans text-sm font-medium text-white
              transition-colors hover:bg-brand-700
            "
          >
            Book your free consultation
            <RiArrowRightLine className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
