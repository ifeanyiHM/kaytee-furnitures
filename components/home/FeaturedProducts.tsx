import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import type { ProductType } from "@/types";

export function FeaturedProducts({ products }: { products: ProductType[] }) {
  return (
    <section className="site-section-tight bg-white">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="site-label text-brand-600 tracking-[0.2em] mb-3">
              Shop the look
            </p>
            <h2 className="site-heading">Curated furniture &amp; décor</h2>
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
                  <p className="font-sans text-[10px] xxl:text-[11px] xl2:text-[12px] xl3:text-[12px] xl4:text-[13px] text-brand-400 uppercase tracking-widest mb-1">
                    {item.cat}
                  </p>
                  <h3 className="font-display text-lg xxl:text-[1.35rem] xl2:text-[1.5rem] xl3:text-[1.7rem] xl4:text-[1.8rem] text-charcoal mb-2">
                    {item.name}
                  </h3>
                  <p className="font-sans font-medium text-charcoal text-sm xxl:text-[15px] xl2:text-[15px] xl3:text-base xl4:text-base">
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
