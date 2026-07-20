import type { Metadata } from "next";
import { getUserBookings } from "@/actions/bookings";
import { formatDate } from "@/lib/utils/format";
import { BOOKING_STATUS_LABELS } from "@/lib/utils/constants";
import { EmptyState } from "@/components/ui/empty-state";
import { RiCalendarLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Bookings" };

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800", REVIEWED: "bg-blue-100 text-blue-800",
  ACCEPTED: "bg-green-100 text-green-800", IN_PROGRESS: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-gray-100 text-gray-800", CANCELLED: "bg-red-100 text-red-800",
};

export default async function BookingsPage() {
  const bookings = await getUserBookings().catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-charcoal">My bookings</h1>
        <Link href="/consultation"><Button size="sm">New consultation</Button></Link>
      </div>

      {bookings.length === 0 ? (
        <EmptyState icon={<RiCalendarLine className="w-10 h-10" />} title="No bookings yet"
          description="Book a free consultation with our design team."
          action={<Link href="/consultation"><Button>Book a consultation</Button></Link>} />
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white border border-sand-200 rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-sans font-medium text-charcoal">{(booking.service as { name?: string })?.name || "Interior Design"}</p>
                  <p className="font-sans text-xs text-charcoal-muted mt-0.5">{formatDate(booking.createdAt)}</p>
                  {booking.budget && <p className="font-sans text-xs text-charcoal-muted mt-1">Budget: {booking.budget}</p>}
                </div>
                <span className={`font-sans text-xs px-2.5 py-0.5 rounded-full ${statusColors[booking.status] || "bg-gray-100 text-gray-700"}`}>
                  {BOOKING_STATUS_LABELS[booking.status] || booking.status}
                </span>
              </div>
              <p className="font-sans text-sm text-charcoal-muted mt-3 line-clamp-2">{booking.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
