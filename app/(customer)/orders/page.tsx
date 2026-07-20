import type { Metadata } from "next";
import Link from "next/link";
import { getUserOrders } from "@/actions/orders";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/utils/constants";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { RiShoppingBag2Line } from "react-icons/ri";

export const metadata: Metadata = { title: "My Orders" };

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const { data: orders, total, pages } = await getUserOrders(page, 10).catch(() => ({ data: [], total: 0, pages: 0 }));

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal mb-6">My orders</h1>
      {orders.length === 0 ? (
        <EmptyState icon={<RiShoppingBag2Line className="w-10 h-10" />} title="No orders yet"
          description="When you place an order it will appear here."
          action={<Link href="/shop" className="font-sans text-sm text-brand-600 hover:underline">Browse the shop</Link>} />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link key={order._id} href={`/orders/${order._id}`}
              className="block bg-white border border-sand-200 rounded-xl p-5 hover:border-brand-400 hover:shadow-sm transition-all">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-sans font-medium text-charcoal">{order.orderNumber}</p>
                  <p className="font-sans text-xs text-charcoal-muted mt-0.5">{formatDate(order.createdAt)} · {order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-sans text-xs px-2.5 py-0.5 rounded-full ${ORDER_STATUS_COLORS[order.status] || "bg-gray-100"}`}>
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                  <span className="font-sans font-semibold text-charcoal">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </Link>
          ))}
          <div className="pt-4"><Pagination page={page} pages={pages} total={total} /></div>
        </div>
      )}
    </div>
  );
}
