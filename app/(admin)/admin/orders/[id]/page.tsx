import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/utils/constants";
import { AdminOrderStatusForm } from "@/components/admin/order-status-form";

export const metadata: Metadata = { title: "Order Details — Admin" };

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const raw = await Order.findById(id).populate("userId", "name email").lean();
  if (!raw) notFound();
  const order = JSON.parse(JSON.stringify(raw));
  const addr = order.shippingAddress as { firstName?: string; lastName?: string; street?: string; city?: string; state?: string; phone?: string };
  const user = order.userId as { name?: string; email?: string } | null;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/orders" className="font-sans text-sm text-charcoal-muted hover:text-charcoal">← Orders</Link>
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
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-sand-200 rounded-xl p-6">
            <h2 className="font-display text-lg text-charcoal mb-4">Items ordered</h2>
            <div className="space-y-4">
              {order.items.map((item: { image: string; name: string; color?: string; price: number; quantity: number }, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="relative w-14 h-14 rounded overflow-hidden bg-sand-100 shrink-0">
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
            <div className="border-t border-sand-100 mt-4 pt-4 space-y-2 font-sans text-sm">
              <div className="flex justify-between text-charcoal-muted"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
              <div className="flex justify-between text-charcoal-muted"><span>Shipping</span><span>{order.shipping === 0 ? "Free" : formatCurrency(order.shipping)}</span></div>
              <div className="flex justify-between text-charcoal-muted"><span>VAT</span><span>{formatCurrency(order.tax)}</span></div>
              <div className="flex justify-between font-semibold text-charcoal text-base pt-1 border-t border-sand-100"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-sand-200 rounded-xl p-5">
            <h3 className="font-display text-base text-charcoal mb-3">Customer</h3>
            <p className="font-sans text-sm font-medium text-charcoal">{user?.name || "Guest"}</p>
            <p className="font-sans text-sm text-charcoal-muted">{user?.email}</p>
          </div>
          <div className="bg-white border border-sand-200 rounded-xl p-5">
            <h3 className="font-display text-base text-charcoal mb-3">Delivery address</h3>
            <p className="font-sans text-sm text-charcoal">{addr.firstName} {addr.lastName}</p>
            <p className="font-sans text-sm text-charcoal-muted">{addr.street}</p>
            <p className="font-sans text-sm text-charcoal-muted">{addr.city}, {addr.state}</p>
            {addr.phone && <p className="font-sans text-sm text-charcoal-muted">{addr.phone}</p>}
          </div>
          <div className="bg-white border border-sand-200 rounded-xl p-5">
            <h3 className="font-display text-base text-charcoal mb-3">Update status</h3>
            <AdminOrderStatusForm orderId={order._id} currentStatus={order.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
