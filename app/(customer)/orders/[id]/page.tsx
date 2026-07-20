import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getOrderById } from "@/actions/orders";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/utils/constants";

export const metadata: Metadata = { title: "Order Details" };

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderById(id).catch(() => null);
  if (!order) notFound();

  const addr = order.shippingAddress as { firstName?: string; lastName?: string; street?: string; city?: string; state?: string };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/orders" className="font-sans text-sm text-charcoal-muted hover:text-charcoal">← Orders</Link>
        <span className="text-charcoal-muted">/</span>
        <span className="font-sans text-sm text-charcoal">{order.orderNumber}</span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl text-charcoal">{order.orderNumber}</h1>
          <p className="font-sans text-sm text-charcoal-muted">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`font-sans text-sm px-3 py-1 rounded-full ${ORDER_STATUS_COLORS[order.status]}`}>{ORDER_STATUS_LABELS[order.status]}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-sand-200 rounded-xl p-6">
          <h2 className="font-display text-lg text-charcoal mb-4">Items</h2>
          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative w-16 h-16 rounded overflow-hidden bg-sand-100 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-sans text-sm font-medium text-charcoal">{item.name}</p>
                  {item.color && <p className="font-sans text-xs text-charcoal-muted">{item.color}</p>}
                  <p className="font-sans text-xs text-charcoal-muted">Qty: {item.quantity}</p>
                </div>
                <p className="font-sans text-sm font-medium text-charcoal shrink-0">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-sand-200 rounded-xl p-5">
            <h3 className="font-display text-base text-charcoal mb-3">Summary</h3>
            <div className="space-y-2 font-sans text-sm">
              <div className="flex justify-between"><span className="text-charcoal-muted">Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-charcoal-muted">Shipping</span><span>{order.shipping === 0 ? "Free" : formatCurrency(order.shipping)}</span></div>
              <div className="flex justify-between"><span className="text-charcoal-muted">VAT</span><span>{formatCurrency(order.tax)}</span></div>
              <div className="border-t border-sand-200 pt-2 flex justify-between font-semibold">
                <span>Total</span><span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-sand-200 rounded-xl p-5">
            <h3 className="font-display text-base text-charcoal mb-3">Delivery address</h3>
            <p className="font-sans text-sm text-charcoal">{addr.firstName} {addr.lastName}</p>
            <p className="font-sans text-sm text-charcoal-muted">{addr.street}</p>
            <p className="font-sans text-sm text-charcoal-muted">{addr.city}, {addr.state}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
