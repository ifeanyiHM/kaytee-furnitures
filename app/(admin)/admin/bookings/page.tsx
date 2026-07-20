import type { Metadata } from "next";
import Link from "next/link";
import { adminGetBookings } from "@/actions/bookings";
import { formatDate } from "@/lib/utils/format";
import { BOOKING_STATUS_LABELS } from "@/lib/utils/constants";
import { Pagination } from "@/components/ui/pagination";

export const metadata: Metadata = { title: "Bookings — Admin" };

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800", REVIEWED: "bg-blue-100 text-blue-800",
  ACCEPTED: "bg-green-100 text-green-800", IN_PROGRESS: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-gray-100 text-gray-700", CANCELLED: "bg-red-100 text-red-700",
};

export default async function AdminBookingsPage({ searchParams }: { searchParams: Promise<{ page?: string; status?: string }> }) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const { data: bookings, total, pages } = await adminGetBookings(page, 20, sp.status).catch(() => ({ data: [], total: 0, pages: 0 }));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-charcoal">Bookings</h1>
        <p className="font-sans text-sm text-charcoal-muted mt-1">{total} total consultation requests</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {[undefined, ...Object.keys(BOOKING_STATUS_LABELS)].map((s) => (
          <Link key={s || "all"} href={s ? `/admin/bookings?status=${s}` : "/admin/bookings"}
            className={`shrink-0 px-4 py-1.5 rounded-full font-sans text-sm transition-colors ${
              sp.status === s || (!sp.status && !s) ? "bg-brand-600 text-white" : "bg-white border border-sand-200 text-charcoal-muted hover:text-charcoal"
            }`}>
            {s ? BOOKING_STATUS_LABELS[s] : "All"}
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {bookings.map((booking) => {
          const service = booking.service as { name?: string } | undefined;
          return (
            <Link key={booking._id} href={`/admin/bookings/${booking._id}`}
              className="block bg-white border border-sand-200 rounded-xl p-5 hover:border-brand-400 hover:shadow-sm transition-all">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-sans font-medium text-charcoal">{booking.firstName} {booking.lastName}</p>
                  <p className="font-sans text-sm text-charcoal-muted">{booking.email} · {booking.phone}</p>
                  <p className="font-sans text-xs text-brand-600 mt-1">{service?.name || "Interior Design"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs text-charcoal-muted">{formatDate(booking.createdAt)}</span>
                  <span className={`font-sans text-xs px-2.5 py-0.5 rounded-full ${statusColors[booking.status]}`}>{BOOKING_STATUS_LABELS[booking.status]}</span>
                </div>
              </div>
              {booking.description && <p className="font-sans text-sm text-charcoal-muted mt-2 line-clamp-1">{booking.description}</p>}
              {booking.budget && <p className="font-sans text-xs text-charcoal-muted mt-1">Budget: {booking.budget}</p>}
            </Link>
          );
        })}
        {bookings.length === 0 && <div className="text-center py-12 bg-white border border-sand-200 rounded-xl font-sans text-charcoal-muted">No bookings found.</div>}
      </div>
      {pages > 1 && <div className="mt-6"><Pagination page={page} pages={pages} total={total} /></div>}
    </div>
  );
}
