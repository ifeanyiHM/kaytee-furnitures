import type { Metadata } from "next";
import Link from "next/link";
import { adminGetOrders } from "@/actions/orders";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/utils/constants";
import { Pagination } from "@/components/ui/pagination";

export const metadata: Metadata = { title: "Orders — Admin" };

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ page?: string; status?: string }> }) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const { data: orders, total, pages } = await adminGetOrders(page, 20, sp.status).catch(() => ({ data: [], total: 0, pages: 0 }));

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Orders</h1>
          <p className="font-sans text-sm text-charcoal-muted mt-1">{total} total orders</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {[undefined, "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
          <Link key={s || "all"} href={s ? `/admin/orders?status=${s}` : "/admin/orders"}
            className={`shrink-0 px-4 py-1.5 rounded-full font-sans text-sm transition-colors ${
              sp.status === s || (!sp.status && !s) ? "bg-brand-600 text-white" : "bg-white border border-sand-200 text-charcoal-muted hover:text-charcoal"
            }`}>
            {s ? ORDER_STATUS_LABELS[s] : "All"}
          </Link>
        ))}
      </div>

      <div className="bg-white border border-sand-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-sand-200 bg-sand-50">
            <tr>
              {["Order", "Customer", "Date", "Items", "Total", "Status"].map((h) => (
                <th key={h} className="text-left font-sans text-xs text-charcoal-muted uppercase tracking-wider px-4 py-3 hidden first:table-cell sm:table-cell">{h}</th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {orders.map((order) => {
              const user = (order as unknown as { user?: { name?: string; email?: string } }).user;
              return (
                <tr key={order._id} className="hover:bg-sand-50 transition-colors">
                  <td className="px-4 py-3 font-sans text-sm font-medium text-charcoal">{order.orderNumber}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="font-sans text-sm text-charcoal">{user?.name || "Guest"}</p>
                    <p className="font-sans text-xs text-charcoal-muted">{user?.email}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell font-sans text-sm text-charcoal-muted">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell font-sans text-sm text-charcoal">{order.items.length}</td>
                  <td className="px-4 py-3 font-sans text-sm font-semibold text-charcoal">{formatCurrency(order.total)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`font-sans text-xs px-2 py-0.5 rounded-full ${ORDER_STATUS_COLORS[order.status]}`}>{ORDER_STATUS_LABELS[order.status]}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/orders/${order._id}`} className="font-sans text-xs text-brand-600 hover:underline">View</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {orders.length === 0 && <div className="text-center py-12 font-sans text-charcoal-muted">No orders found.</div>}
      </div>
      {pages > 1 && <div className="mt-6"><Pagination page={page} pages={pages} total={total} /></div>}
    </div>
  );
}
