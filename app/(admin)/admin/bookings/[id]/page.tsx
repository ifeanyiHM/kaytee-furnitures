import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import { Booking } from "@/lib/models/Booking";
import { formatDate } from "@/lib/utils/format";
import { AdminBookingStatusForm } from "@/components/admin/booking-status-form";

export const metadata: Metadata = { title: "Booking Detail — Admin" };

export default async function AdminBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const raw = await Booking.findById(id).populate("serviceId", "name").lean();
  if (!raw) notFound();
  const booking = JSON.parse(JSON.stringify(raw));
  const service = booking.serviceId as { name?: string } | null;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/bookings" className="font-sans text-sm text-charcoal-muted hover:text-charcoal">← Bookings</Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-sand-200 rounded-xl p-6">
            <h1 className="font-display text-2xl text-charcoal mb-1">{booking.firstName} {booking.lastName}</h1>
            <p className="font-sans text-sm text-charcoal-muted mb-5">{formatDate(booking.createdAt)}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                ["Email", booking.email], ["Phone", booking.phone],
                ["Service", service?.name], ["Budget", booking.budget],
                ["Space size", booking.spaceSize], ["Timeline", booking.timeline],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={k}>
                  <p className="font-sans text-xs text-charcoal-muted uppercase tracking-wider mb-0.5">{k}</p>
                  <p className="font-sans text-sm text-charcoal">{v}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="font-sans text-xs text-charcoal-muted uppercase tracking-wider mb-2">Project description</p>
              <p className="font-sans text-sm text-charcoal leading-relaxed bg-sand-50 rounded-lg p-4">{booking.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <AdminBookingStatusForm bookingId={booking._id} currentStatus={booking.status} currentNotes={booking.adminNotes} />
        </div>
      </div>
    </div>
  );
}
