"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { ORDER_STATUS_LABELS } from "@/lib/utils/constants";

const statuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export function AdminOrderStatusForm({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  async function handleUpdate() {
    setLoading(true);
    await updateOrderStatus(orderId, status);
    setSaved(true);
    router.refresh();
    setLoading(false);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-3">
      <select value={status} onChange={(e) => setStatus(e.target.value)}
        className="w-full h-10 px-3 border border-sand-200 rounded font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400">
        {statuses.map((s) => <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>)}
      </select>
      <Button onClick={handleUpdate} loading={loading} className="w-full">
        {saved ? "Saved!" : "Update status"}
      </Button>
    </div>
  );
}
