import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { getUserOrders } from "@/actions/orders";
import { getUserBookings } from "@/actions/bookings";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/utils/constants";
import { RiShoppingBag2Line, RiCalendarLine, RiHeartLine, RiArrowRightLine } from "react-icons/ri";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await auth();
  const [{ data: orders }, bookings] = await Promise.all([
    getUserOrders(1, 3).catch(() => ({ data: [] })),
    getUserBookings().catch(() => []),
  ]);

  const tiles = [
    { icon: RiShoppingBag2Line, label: "Total orders", value: orders.length.toString(), href: "/orders" },
    { icon: RiCalendarLine, label: "Active bookings", value: bookings.filter((b) => !["COMPLETED", "CANCELLED"].includes(b.status)).length.toString(), href: "/bookings" },
    { icon: RiHeartLine, label: "Saved items", value: "—", href: "/wishlist" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-charcoal">Welcome back{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}!</h1>
        <p className="font-sans text-charcoal-muted mt-1">Here's a summary of your account activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} className="bg-white border border-sand-200 rounded-xl p-5 hover:border-brand-400 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
                <t.icon className="w-4 h-4 text-brand-600" />
              </div>
              <RiArrowRightLine className="w-4 h-4 text-charcoal-muted" />
            </div>
            <p className="font-display text-2xl text-charcoal">{t.value}</p>
            <p className="font-sans text-xs text-charcoal-muted mt-0.5">{t.label}</p>
          </Link>
        ))}
      </div>

      {orders.length > 0 && (
        <div className="bg-white border border-sand-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg text-charcoal">Recent orders</h2>
            <Link href="/orders" className="font-sans text-sm text-brand-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order._id} className="flex items-center justify-between py-3 border-b border-sand-100 last:border-0">
                <div>
                  <p className="font-sans text-sm font-medium text-charcoal">{order.orderNumber}</p>
                  <p className="font-sans text-xs text-charcoal-muted">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-sans text-xs px-2.5 py-0.5 rounded-full ${ORDER_STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                    {ORDER_STATUS_LABELS[order.status] || order.status}
                  </span>
                  <span className="font-sans text-sm font-medium text-charcoal">{formatCurrency(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
