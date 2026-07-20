import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPortfolioItemBySlug, getPortfolioItems } from "@/actions/portfolio";
import { PORTFOLIO_MOCK } from "@/lib/portfolio-data";
import {
  RiArrowLeftLine,
  RiArrowRightUpLine,
  RiCheckLine,
} from "react-icons/ri";
import { MediaFile, PortfolioItemType } from "@/types";
import { ProjectMediaViewer } from "@/components/portfolio/project-media-viewer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item =
    (await getPortfolioItemBySlug(slug).catch(() => null)) ??
    PORTFOLIO_MOCK.find((p) => p.slug === slug);
  if (!item) return { title: "Project not found" };
  return {
    title: item.title || item.title,
    description: item.description || item.description,
  };
}

/** Picks a single representative file for a project — used for the hero
 *  background and for related-project thumbnails. Prefers the finished
 *  ("after") shot; falls back to a "before" shot if that's all there is. */
function getCoverFile(item: PortfolioItemType): MediaFile | undefined {
  return item.media?.after?.[0] ?? item.media?.before?.[0];
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbItem = await getPortfolioItemBySlug(slug).catch(() => null);
  const item = dbItem ?? PORTFOLIO_MOCK.find((p) => p.slug === slug);
  if (!item) notFound();

  const { data: relatedDb } = await getPortfolioItems({
    category: item.category,
    limit: 3,
  }).catch(() => ({ data: [] }));
  const related = (relatedDb.length > 0 ? relatedDb : PORTFOLIO_MOCK)
    .filter((p) => p.slug !== slug && p.category === item.category)
    .slice(0, 3);

  const cover = getCoverFile(item);
  const beforeFiles = item.media?.before ?? [];
  const afterFiles = item.media?.after ?? [];
  const hasBeforeAfter = beforeFiles.length > 0 && afterFiles.length > 0;

  // Spec-band entries — same hairline-divided treatment as the homepage
  // stats section, used here for facts instead of a boxed sidebar card.
  const facts = (
    [
      ["Category", item.category],
      ["Style", item.style],
      ["Location", item.location],
      ["Year", item.year?.toString()],
      ["Area", item.area],
      ["Duration", item.duration],
    ] as [string, string | undefined][]
  ).filter(([, v]) => v);

  return (
    <>
      {/* ── Lean hero — title only, meta lives in the spec band below ── */}
      <div className="relative h-[70vh] min-h-105 max-h-180 bg-charcoal overflow-hidden">
        {cover?.type === "video" ? (
          <video
            src={cover.src}
            poster={cover.poster}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        ) : cover ? (
          <Image
            src={cover.src}
            alt={item.title}
            fill
            className="object-cover opacity-75"
            priority
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/15 to-charcoal/40" />

        <div className="absolute top-0 left-0 right-0 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-sans text-xs text-white/50 hover:text-white transition-colors tracking-wider uppercase"
          >
            <RiArrowLeftLine className="w-3.5 h-3.5" />
            Portfolio
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <p className="font-sans text-[10px] text-brand-400 uppercase tracking-[0.28em] mb-4">
            {item.category}
          </p>
          <h1 className="font-hero text-[clamp(2.25rem,6vw,5rem)] text-white leading-[0.98] tracking-tight max-w-4xl">
            {item.title}
          </h1>
        </div>
      </div>

      {/* ── Spec band ── */}
      <div className="bg-charcoal border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y divide-x divide-white/10 lg:divide-y-0">
            {facts.map(([k, v]) => (
              <div key={k} className="py-6 px-6 first:pl-0">
                <p className="font-sans text-[9px] text-white/40 uppercase tracking-[0.2em] mb-1.5">
                  {k}
                </p>
                <p className="font-hero text-lg text-white">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <article className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Description + highlights */}
          <div className="grid lg:grid-cols-[1fr_360px] gap-16 py-20 border-b border-sand-200">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-brand-600" />
                <p className="font-sans text-[11px] text-brand-600 tracking-[0.26em] uppercase font-medium">
                  The project
                </p>
              </div>
              <p className="font-hero text-[clamp(1.4rem,2.5vw,1.9rem)] text-charcoal leading-relaxed mb-8">
                {item.description}
              </p>
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-xs text-charcoal-muted capitalize before:content-['—'] before:mr-2 before:text-brand-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {item.highlights && item.highlights.length > 0 && (
              <div className="lg:border-l lg:border-sand-200 lg:pl-16">
                <p className="font-sans text-[11px] text-charcoal-muted tracking-[0.22em] uppercase mb-6">
                  Project highlights
                </p>
                <ul className="space-y-4">
                  {item.highlights.map((h: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <RiCheckLine className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                      <span className="font-sans text-sm text-charcoal-muted leading-relaxed">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* The space — every "after" file, images and videos together */}
          {afterFiles.length > 0 && (
            <div className="py-20 border-b border-sand-200">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-brand-600" />
                <p className="font-sans text-[11px] text-brand-600 tracking-[0.26em] uppercase font-medium">
                  The space
                </p>
              </div>
              <ProjectMediaViewer media={afterFiles} />
            </div>
          )}

          {/* Before & After — two independent viewers side by side, rather
              than a single paired drag-slider, since the data is now two
              free-standing arrays rather than matched before/after pairs. */}
          {hasBeforeAfter && (
            <div className="py-20 border-b border-sand-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-brand-600" />
                <p className="font-sans text-[11px] text-brand-600 tracking-[0.26em] uppercase font-medium">
                  Before &amp; after
                </p>
              </div>
              <p className="font-sans text-charcoal-muted text-sm mb-10 max-w-lg">
                Browse each side independently — every file, image or video, is
                listed below its frame.
              </p>
              <div className="lg:grid lg:grid-cols-2 gap-10 lg:gap-12">
                <div>
                  <p className="font-sans text-[10px] text-charcoal-muted uppercase tracking-[0.22em] mb-4">
                    Before
                  </p>
                  <ProjectMediaViewer media={beforeFiles} />
                </div>
                <div>
                  <p className="font-sans text-[10px] text-brand-600 uppercase tracking-[0.22em] mb-4">
                    After
                  </p>
                  <ProjectMediaViewer media={afterFiles} />
                </div>
              </div>
            </div>
          )}

          {/* Challenge + Solution — single column, hairline-divided */}
          {(item.challenge || item.solution) && (
            <div className="py-20 border-b border-sand-200">
              <div className="grid lg:grid-cols-2">
                {item.challenge && (
                  <div className="lg:pr-16 lg:border-r lg:border-sand-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-px bg-brand-600" />
                      <p className="font-sans text-[11px] text-brand-600 tracking-[0.26em] uppercase font-medium">
                        The challenge
                      </p>
                    </div>
                    <p className="font-sans text-charcoal-muted leading-relaxed text-base">
                      {item.challenge}
                    </p>
                  </div>
                )}
                {item.solution && (
                  <div className="lg:pl-16 mt-14 lg:mt-0">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-px bg-brand-600" />
                      <p className="font-sans text-[11px] text-brand-600 tracking-[0.26em] uppercase font-medium">
                        Our solution
                      </p>
                    </div>
                    <p className="font-sans text-charcoal-muted leading-relaxed text-base">
                      {item.solution}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Related projects — same numbered-row index as /portfolio */}
          {related.length > 0 && (
            <div className="py-20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-brand-600" />
                  <p className="font-sans text-[11px] text-brand-600 tracking-[0.26em] uppercase font-medium">
                    Related projects
                  </p>
                </div>
                <Link
                  href="/portfolio"
                  className="font-sans text-xs text-charcoal-muted hover:text-charcoal transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                >
                  View all <RiArrowRightUpLine className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="border-t border-sand-200">
                {related.map((rel, i) => {
                  const relCover = getCoverFile(rel);
                  const relThumbSrc =
                    relCover?.type === "video"
                      ? relCover.poster
                      : relCover?.src;

                  return (
                    <Link
                      key={rel._id}
                      href={`/portfolio/${rel.slug}`}
                      className="group grid grid-cols-[2.5rem_1fr_3.5rem] sm:grid-cols-[3.5rem_1fr_5rem_4rem] items-center gap-x-5 sm:gap-x-8 py-7 border-b border-sand-200 hover:bg-sand-50 transition-colors duration-300"
                    >
                      <p className="font-hero text-xl text-charcoal-muted/50 group-hover:text-brand-500 transition-colors duration-300">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <div className="min-w-0">
                        <h4 className="font-hero text-lg sm:text-xl text-charcoal leading-tight truncate group-hover:text-brand-700 transition-colors duration-300">
                          {rel.title}
                        </h4>
                        <p className="font-sans text-[11px] text-charcoal-muted uppercase tracking-[0.16em] mt-1">
                          {rel.category}
                        </p>
                      </div>
                      <p className="hidden sm:block font-sans text-xs text-charcoal-muted/60 tracking-wider text-right">
                        {rel.year ?? ""}
                      </p>
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden justify-self-end bg-charcoal">
                        {relThumbSrc && (
                          <Image
                            src={relThumbSrc}
                            alt=""
                            fill
                            className="object-cover grayscale-40 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                            sizes="64px"
                          />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Full-width CTA */}
        <div className="bg-charcoal py-24">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="font-sans text-[11px] text-brand-400 tracking-[0.28em] uppercase mb-5">
              Inspired by this project?
            </p>
            <h2 className="font-hero text-[clamp(2rem,4vw,3.25rem)] text-white leading-tight mb-5">
              Let&apos;s create something as remarkable for your space.
            </h2>
            <p className="font-sans text-white/50 text-sm leading-relaxed mb-10 max-w-md mx-auto">
              Book a free 30-minute consultation and let&apos;s explore
              what&apos;s possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-sans text-[11px] font-medium tracking-[0.14em] uppercase px-8 py-4 rounded-sm transition-colors"
              >
                Book free consultation
                <RiArrowRightUpLine className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-sans text-[11px] tracking-[0.14em] uppercase px-8 py-4 rounded-sm transition-colors"
              >
                Back to portfolio
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
