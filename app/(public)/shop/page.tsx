import type { Metadata } from "next";
import Link from "next/link";
import { getProducts, getCategories } from "@/actions/products";
import { ProductCard } from "@/components/shop/product-card";
import { Pagination } from "@/components/ui/pagination";
import { PRODUCT_SORT_OPTIONS } from "@/lib/utils/constants";

export const metadata: Metadata = { title: "Shop", description: "Browse our curated collection of premium furniture and décor." };

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; sort?: string; search?: string; page?: string }> }) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;

  const [{ data: products, total, pages }, categories] = await Promise.all([
    getProducts({ categorySlug: sp.category, search: sp.search, sort: sp.sort, page, limit: 12 }).catch(() => ({ data: [], total: 0, pages: 1 })),
    getCategories().catch(() => []),
  ]);

  return (
    <>
      <section className="pt-32 pb-8 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs text-brand-400 tracking-[0.25em] uppercase mb-3">Our collection</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white">Shop furniture &amp; décor</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex gap-2 flex-wrap">
            <Link href="/shop" className={`px-4 py-1.5 rounded-full font-sans text-sm transition-colors ${!sp.category ? "bg-brand-600 text-white" : "bg-sand-100 text-charcoal-muted hover:text-charcoal"}`}>
              All
            </Link>
            {(categories as { _id: string; name: string; slug: string }[]).map((cat) => (
              <Link key={cat._id} href={`/shop?category=${cat.slug}`}
                className={`px-4 py-1.5 rounded-full font-sans text-sm transition-colors ${sp.category === cat.slug ? "bg-brand-600 text-white" : "bg-sand-100 text-charcoal-muted hover:text-charcoal"}`}>
                {cat.name}
              </Link>
            ))}
          </div>
          <form className="flex items-center gap-3">
            <input type="search" name="search" defaultValue={sp.search} placeholder="Search products…"
              className="h-9 px-3 border border-sand-200 rounded font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 w-48" />
            <select name="sort" defaultValue={sp.sort || "newest"}
              className="h-9 px-3 border border-sand-200 rounded font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400">
              {PRODUCT_SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <button type="submit" className="h-9 px-4 bg-brand-600 text-white rounded font-sans text-sm hover:bg-brand-800 transition-colors">Filter</button>
          </form>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
              {products.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
            <Pagination page={page} pages={pages} total={total} />
          </>
        ) : (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-charcoal mb-3">No products found</p>
            <p className="font-sans text-charcoal-muted mb-6">Try adjusting your filters or search term.</p>
            <Link href="/shop" className="font-sans text-sm text-brand-600 hover:underline">Clear filters</Link>
          </div>
        )}
      </div>
    </>
  );
}
