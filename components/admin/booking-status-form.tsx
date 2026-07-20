"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBookingStatus } from "@/actions/bookings";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BOOKING_STATUS_LABELS } from "@/lib/utils/constants";

const statuses = Object.keys(BOOKING_STATUS_LABELS);

export function AdminBookingStatusForm({ bookingId, currentStatus, currentNotes }: { bookingId: string; currentStatus: string; currentNotes?: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes || "");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  async function handleUpdate() {
    setLoading(true);
    await updateBookingStatus(bookingId, status, notes);
    setSaved(true);
    router.refresh();
    setLoading(false);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="bg-white border border-sand-200 rounded-xl p-5 space-y-4">
      <h3 className="font-display text-base text-charcoal">Manage booking</h3>
      <div className="space-y-1.5">
        <label className="block font-sans text-sm font-medium text-charcoal">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="w-full h-10 px-3 border border-sand-200 rounded font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400">
          {statuses.map((s) => <option key={s} value={s}>{BOOKING_STATUS_LABELS[s]}</option>)}
        </select>
      </div>
      <Textarea label="Internal notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
        placeholder="Add notes for your team..." />
      <Button onClick={handleUpdate} loading={loading} className="w-full">
        {saved ? "Saved!" : "Update booking"}
      </Button>
    </div>
  );
}
