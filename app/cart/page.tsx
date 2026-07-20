import Link from "next/link";
import Image from "next/image";
import { getCart } from "@/actions/cart";
import { formatCurrency } from "@/lib/utils/format";
import { CartActions } from "@/components/shop/CartActions";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/lib/utils/constants";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default async function CartPage() {
  const cart = (await getCart().catch(() => null)) as {
    items: {
      productId: {
        _id: string;
        name: string;
        images: string[];
        price: number;
        slug: string;
      };
      quantity: number;
      color?: string;
    }[];
  } | null;
  const items = cart?.items || [];
  const subtotal = items.reduce(
    (sum: number, item) => sum + (item.productId?.price || 0) * item.quantity,
    0,
  );
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-sand-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl text-charcoal mb-8">
            Your cart
          </h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-sand-200 p-16 text-center">
              <p className="font-display text-2xl text-charcoal mb-2">
                Your cart is empty
              </p>
              <p className="font-sans text-charcoal-muted mb-6">
                Add some beautiful furniture to get started.
              </p>
              <Link href="/shop">
                <Button>Browse the shop</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.productId?._id}
                    className="bg-white rounded-xl border border-sand-200 p-4 flex gap-4"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-sand-100 shrink-0">
                      <Image
                        src={
                          item.productId?.images?.[0] ||
                          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80"
                        }
                        alt={item.productId?.name || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${item.productId?.slug}`}
                        className="font-display text-base text-charcoal hover:text-brand-600 line-clamp-1"
                      >
                        {item.productId?.name}
                      </Link>
                      {item.color && (
                        <p className="font-sans text-xs text-charcoal-muted mt-0.5">
                          {item.color}
                        </p>
                      )}
                      <p className="font-sans font-medium text-charcoal mt-1">
                        {formatCurrency(item.productId?.price || 0)}
                      </p>
                    </div>
                    <CartActions
                      productId={item.productId?._id}
                      quantity={item.quantity}
                    />
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-sand-200 p-6 h-fit space-y-4">
                <h2 className="font-display text-xl text-charcoal">
                  Order summary
                </h2>
                <div className="space-y-2 font-sans text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : formatCurrency(shipping)}
                    </span>
                  </div>
                  {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
                    <p className="text-xs text-brand-600">
                      Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)}{" "}
                      more for free shipping
                    </p>
                  )}
                </div>
                <div className="border-t border-sand-200 pt-3 flex justify-between font-sans font-semibold text-charcoal">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Proceed to checkout
                  </Button>
                </Link>
                <Link
                  href="/shop"
                  className="block text-center font-sans text-sm text-charcoal-muted hover:text-charcoal"
                >
                  ← Continue shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
