import type { Metadata } from "next";
import { getWishlist } from "@/actions/cart";
import { ProductCard } from "@/components/shop/ProductCard";
import { EmptyState } from "@/components/ui/empty-state";
import { RiHeartLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Wishlist" };

export default async function WishlistPage() {
  const items = (await getWishlist().catch(() => [])) as {
    productId: {
      _id: string;
      name: string;
      slug: string;
      price: number;
      images: string[];
      status: string;
      stock: number;
      featured: boolean;
      tags: string[];
      materials: string[];
      colors: string[];
      categoryId: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal mb-6">Wishlist</h1>
      {items.length === 0 ? (
        <EmptyState
          icon={<RiHeartLine className="w-10 h-10" />}
          title="Your wishlist is empty"
          description="Save products you love by clicking the heart icon."
          action={
            <Link href="/shop">
              <Button>Browse products</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <ProductCard
              key={item.productId?._id}
              product={
                { ...item.productId, category: undefined } as Parameters<
                  typeof ProductCard
                >[0]["product"]
              }
              wishlisted={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
