import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-card";
import type { ProductType } from "@/types";

export function FeaturedProducts({ products }: { products: ProductType[] }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="font-sans text-xs text-brand-600 tracking-[0.2em] uppercase mb-3">
              Shop the look
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal leading-tight">
              Curated furniture &amp; décor
            </h2>
          </div>
          <Link href="/shop">
            <Button variant="outline">Browse all products</Button>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Marble Coffee Table",
                price: 285000,
                img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
                cat: "Living Room",
              },
              {
                name: "Linen Accent Chair",
                price: 145000,
                img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
                cat: "Seating",
              },
              {
                name: "Oak Dining Table",
                price: 420000,
                img: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=600&q=80",
                cat: "Dining",
              },
              {
                name: "Velvet Sofa 3-Seat",
                price: 650000,
                img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
                cat: "Seating",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="group bg-white border border-sand-200 rounded overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-sand-100">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="font-sans text-xs text-brand-400 uppercase tracking-widest mb-1">
                    {item.cat}
                  </p>
                  <h3 className="font-display text-lg text-charcoal mb-2">
                    {item.name}
                  </h3>
                  <p className="font-sans font-medium text-charcoal">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
