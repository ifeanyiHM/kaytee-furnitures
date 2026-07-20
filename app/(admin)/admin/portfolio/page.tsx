import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPortfolioItems } from "@/actions/portfolio";
import { deletePortfolioItem, updatePortfolioItem } from "@/actions/portfolio";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { AdminPortfolioActions } from "@/components/admin/PortfolioActions";
import { RiAddLine } from "react-icons/ri";
import { MediaFile, PortfolioItemType } from "@/types";

export const metadata: Metadata = { title: "Portfolio — Admin" };

export default async function AdminPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  // Admin can see all including unpublished
  const {
    data: items,
    total,
    pages,
  } = await getPortfolioItems({ page, limit: 12 }).catch(() => ({
    data: [],
    total: 0,
    pages: 0,
  }));

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Portfolio</h1>
          <p className="font-sans text-sm text-charcoal-muted mt-1">
            {total} projects
          </p>
        </div>
        <Link href="/admin/portfolio/new">
          <Button>
            <RiAddLine className="w-4 h-4" />
            Add project
          </Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => {
          function getCoverFile(
            item: PortfolioItemType,
          ): MediaFile | undefined {
            return item.media?.after?.[0] ?? item.media?.before?.[0];
          }
          const cover = getCoverFile(item);
          return (
            <div
              key={item._id}
              className="bg-white border border-sand-200 rounded-xl overflow-hidden group"
            >
              <div className="relative aspect-video bg-sand-100">
                <Image
                  src={
                    cover?.src ||
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=640&q=60"
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {item.published && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <AdminPortfolioActions
                      itemId={item._id}
                      published={item.published}
                    />
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-sans text-xs text-brand-600 uppercase tracking-widest mb-0.5">
                  {item.category}
                </p>
                <p className="font-display text-base text-charcoal line-clamp-1">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`font-sans text-xs px-2 py-0.5 rounded-full ${item.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                  >
                    {item.published ? "Published" : "Draft"}
                  </span>
                  {item.featured && (
                    <span className="font-sans text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="col-span-3 text-center py-12 font-sans text-charcoal-muted">
            No portfolio items yet.
          </p>
        )}
      </div>
      {pages > 1 && (
        <div className="mt-6">
          <Pagination page={page} pages={pages} total={total} />
        </div>
      )}
    </div>
  );
}
