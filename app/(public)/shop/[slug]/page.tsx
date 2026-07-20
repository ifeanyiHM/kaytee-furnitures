import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/actions/products";
import { formatCurrency } from "@/lib/utils/format";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  return product ? { title: product.metaTitle || product.name, description: product.metaDesc || product.description.slice(0, 160) } : { title: "Product not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();

  const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : null;

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex gap-2 font-sans text-sm text-charcoal-muted mb-8">
          <Link href="/shop" className="hover:text-charcoal">Shop</Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-sand-100">
              <Image src={product.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"} alt={product.name} fill className="object-cover" priority />
              {discount && <span className="absolute top-4 left-4 bg-brand-600 text-white text-sm font-medium px-3 py-1 rounded">-{discount}%</span>}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-sand-100">
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="font-sans text-xs text-brand-600 uppercase tracking-widest mb-2">
              {(product.category as { name?: string })?.name || "Furniture"}
            </p>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal leading-tight mb-4">{product.name}</h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl text-charcoal">{formatCurrency(product.price)}</span>
              {product.comparePrice && <span className="font-sans text-lg text-charcoal-muted line-through">{formatCurrency(product.comparePrice)}</span>}
            </div>
            <p className="font-sans text-charcoal-muted leading-relaxed mb-8">{product.description}</p>

            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="font-sans text-sm font-medium text-charcoal mb-2">Available colours</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((c) => <span key={c} className="px-3 py-1 border border-sand-200 rounded-full font-sans text-sm text-charcoal">{c}</span>)}
                </div>
              </div>
            )}

            <div className="mb-8">
              <p className="font-sans text-sm text-charcoal-muted">
                {product.stock > 0 ? (<><span className="text-green-600 font-medium">In stock</span> · {product.stock} available</>) : <span className="text-red-500 font-medium">Out of stock</span>}
              </p>
            </div>

            <AddToCartButton productId={product._id} stock={product.stock} />

            {product.materials.length > 0 && (
              <div className="mt-8 pt-8 border-t border-sand-200">
                <h3 className="font-sans text-sm font-medium text-charcoal mb-3">Materials</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.materials.map((m) => <span key={m} className="font-sans text-xs bg-sand-100 text-charcoal-muted px-2.5 py-1 rounded">{m}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
