import type { Metadata } from "next";
import Link from "next/link";
import { getAdminStats } from "@/actions/admin";
import { adminGetOrders } from "@/actions/orders";
import { adminGetBookings } from "@/actions/bookings";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, BOOKING_STATUS_LABELS } from "@/lib/utils/constants";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const [stats, { data: recentOrders }, { data: recentBookings }] = await Promise.all([
    getAdminStats().catch(() => null),
    adminGetOrders(1, 5).catch(() => ({ data: [] })),
    adminGetBookings(1, 5).catch(() => ({ data: [] })),
  ]);

  const tiles = [
    { label: "Total revenue", value: formatCurrency(stats?.revenue || 0), change: "+12% this month", color: "text-brand-600" },
    { label: "Total orders", value: stats?.totalOrders?.toString() || "0", change: "+8 this week" },
    { label: "Pending bookings", value: stats?.pendingBookings?.toString() || "0", change: "Awaiting review" },
    { label: "Active products", value: stats?.totalProducts?.toString() || "0", change: `${stats?.totalCustomers || 0} customers` },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-charcoal">Dashboard</h1>
        <p className="font-sans text-charcoal-muted text-sm mt-1">Overview of your business performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {tiles.map((tile) => (
          <div key={tile.label} className="bg-white border border-sand-200 rounded-xl p-5">
            <p className="font-sans text-xs text-charcoal-muted uppercase tracking-widest mb-1">{tile.label}</p>
            <p className={`font-display text-3xl text-charcoal mt-1 ${tile.color || ""}`}>{tile.value}</p>
            <p className="font-sans text-xs text-charcoal-muted mt-1">{tile.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-sand-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg text-charcoal">Recent orders</h2>
            <Link href="/admin/orders" className="font-sans text-xs text-brand-600 hover:underline">View all</Link>
          </div>
          {recentOrders.length === 0 ? <p className="font-sans text-sm text-charcoal-muted">No orders yet</p> : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link key={order._id} href={`/admin/orders/${order._id}`}
                  className="flex items-center justify-between py-2 border-b border-sand-100 last:border-0 hover:bg-sand-50 -mx-2 px-2 rounded transition-colors">
                  <div>
                    <p className="font-sans text-sm font-medium text-charcoal">{order.orderNumber}</p>
                    <p className="font-sans text-xs text-charcoal-muted">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${ORDER_STATUS_COLORS[order.status]}`}>{ORDER_STATUS_LABELS[order.status]}</span>
                    <span className="font-sans text-sm font-medium">{formatCurrency(order.total)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-sand-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg text-charcoal">Recent bookings</h2>
            <Link href="/admin/bookings" className="font-sans text-xs text-brand-600 hover:underline">View all</Link>
          </div>
          {recentBookings.length === 0 ? <p className="font-sans text-sm text-charcoal-muted">No bookings yet</p> : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <Link key={booking._id} href={`/admin/bookings/${booking._id}`}
                  className="flex items-center justify-between py-2 border-b border-sand-100 last:border-0 hover:bg-sand-50 -mx-2 px-2 rounded transition-colors">
                  <div>
                    <p className="font-sans text-sm font-medium text-charcoal">{booking.firstName} {booking.lastName}</p>
                    <p className="font-sans text-xs text-charcoal-muted">{formatDate(booking.createdAt)}</p>
                  </div>
                  <span className="font-sans text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                    {BOOKING_STATUS_LABELS[booking.status]}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
