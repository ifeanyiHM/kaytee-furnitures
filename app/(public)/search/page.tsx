import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/shop/product-card";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const query = sp.q || "";
  const { data: products } = await getProducts({ search: query, limit: 24 }).catch(() => ({ data: [] }));

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-charcoal mb-2">Search results</h1>
        <p className="font-sans text-charcoal-muted mb-10">{query ? `Results for "${query}"` : "Enter a search term"}</p>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <p className="font-sans text-charcoal-muted">No products found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
}
