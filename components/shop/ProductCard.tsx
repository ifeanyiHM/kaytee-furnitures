"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { formatCurrency } from "@/lib/utils/format";
import { toggleWishlist } from "@/actions/cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { ProductType } from "@/types";

export function ProductCard({
  product,
  wishlisted = false,
}: {
  product: ProductType;
  wishlisted?: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(wishlisted);
  const [loading, setLoading] = useState(false);

  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : null;

  async function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }
    setLoading(true);
    await toggleWishlist(product._id);
    setSaved((p) => !p);
    setLoading(false);
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block rounded overflow-hidden bg-white border border-sand-200 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-sand-100">
        <Image
          src={
            product.images[0] ||
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
          }
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {discount && (
            <span className="bg-brand-600 text-white text-xs font-medium px-2 py-0.5 rounded">
              -{discount}%
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-charcoal text-white text-xs font-medium px-2 py-0.5 rounded">
              Sold out
            </span>
          )}
          {product.featured && (
            <span className="bg-brand-400 text-white text-xs font-medium px-2 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>
        <button
          onClick={handleWishlist}
          disabled={loading}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {saved ? (
            <RiHeart3Fill className="w-4 h-4 text-red-500" />
          ) : (
            <RiHeart3Line className="w-4 h-4 text-charcoal" />
          )}
        </button>
      </div>
      <div className="p-4">
        <p className="font-sans text-xs text-brand-400 uppercase tracking-widest mb-1">
          {(product.category as { name?: string })?.name || "Furniture"}
        </p>
        <h3 className="font-display text-lg text-charcoal leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-sans font-medium text-charcoal">
            {formatCurrency(product.price)}
          </span>
          {product.comparePrice && (
            <span className="font-sans text-sm text-charcoal-muted line-through">
              {formatCurrency(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
