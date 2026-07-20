import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCart } from "@/actions/cart";
import { getAddresses } from "@/actions/user";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CheckoutForm } from "@/components/shop/checkout-form";
import { formatCurrency } from "@/lib/utils/format";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD, TAX_RATE } from "@/lib/utils/constants";
import Image from "next/image";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/checkout");

  const [cart, addresses] = await Promise.all([
    getCart().catch(() => null),
    getAddresses().catch(() => []),
  ]);

  const items = (cart as { items: { productId: { _id: string; name: string; images: string[]; price: number }; quantity: number }[] } | null)?.items || [];
  if (!items.length) redirect("/cart");

  const subtotal = items.reduce((s: number, i) => s + (i.productId?.price || 0) * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-sand-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl text-charcoal mb-8">Checkout</h1>
          <div className="grid lg:grid-cols-2 gap-8">
            <CheckoutForm addresses={addresses} total={total} />
            <div className="bg-white rounded-xl border border-sand-200 p-6 h-fit">
              <h2 className="font-display text-lg text-charcoal mb-4">Order summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.productId?._id} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-sand-100 shrink-0">
                      <Image src={item.productId?.images?.[0] || ""} alt={item.productId?.name || ""} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm text-charcoal line-clamp-1">{item.productId?.name}</p>
                      <p className="font-sans text-xs text-charcoal-muted">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-sans text-sm text-charcoal shrink-0">{formatCurrency((item.productId?.price || 0) * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-sand-200 pt-4 space-y-2 font-sans text-sm">
                <div className="flex justify-between"><span className="text-charcoal-muted">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-charcoal-muted">Shipping</span><span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span></div>
                <div className="flex justify-between"><span className="text-charcoal-muted">VAT (7.5%)</span><span>{formatCurrency(tax)}</span></div>
                <div className="border-t border-sand-200 pt-2 flex justify-between font-semibold text-charcoal">
                  <span>Total</span><span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
