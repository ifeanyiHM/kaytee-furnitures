"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { initiateCheckout } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/format";
import type { AddressType } from "@/types";
import Link from "next/link";

export function CheckoutForm({ addresses, total }: { addresses: AddressType[]; total: number }) {
  const [selectedAddress, setSelectedAddress] = useState(addresses.find((a) => a.isDefault)?._id || addresses[0]?._id || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handlePay() {
    if (!selectedAddress) { setError("Please select a delivery address"); return; }
    setLoading(true);
    setError("");
    const result = await initiateCheckout(selectedAddress);
    if (!result.success || !result.data) { setError(result.error || "Payment initiation failed"); setLoading(false); return; }
    window.location.href = result.data.authorizationUrl;
  }

  return (
    <div className="bg-white rounded-xl border border-sand-200 p-6 space-y-6">
      <div>
        <h2 className="font-display text-lg text-charcoal mb-4">Delivery address</h2>
        {addresses.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-sand-300 rounded-lg">
            <p className="font-sans text-sm text-charcoal-muted mb-3">No saved addresses</p>
            <Link href="/addresses" className="font-sans text-sm text-brand-600 hover:underline">Add a delivery address</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <label key={addr._id} className={`flex gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddress === addr._id ? "border-brand-600 bg-brand-50" : "border-sand-200 hover:border-brand-300"}`}>
                <input type="radio" name="address" value={addr._id} checked={selectedAddress === addr._id} onChange={() => setSelectedAddress(addr._id!)} className="mt-0.5 accent-brand-600" />
                <div>
                  <p className="font-sans text-sm font-medium text-charcoal">{addr.firstName} {addr.lastName}</p>
                  <p className="font-sans text-xs text-charcoal-muted">{addr.street}, {addr.city}, {addr.state}</p>
                  {addr.label && <p className="font-sans text-xs text-brand-600 mt-0.5">{addr.label}</p>}
                </div>
              </label>
            ))}
            <Link href="/addresses" className="font-sans text-xs text-brand-600 hover:underline">+ Add new address</Link>
          </div>
        )}
      </div>

      {error && <p className="font-sans text-sm text-red-500">{error}</p>}

      <Button onClick={handlePay} loading={loading} size="lg" className="w-full" disabled={!selectedAddress || addresses.length === 0}>
        Pay {formatCurrency(total)} securely
      </Button>
      <p className="font-sans text-xs text-charcoal-muted text-center">Secured by Paystack · SSL encrypted</p>
    </div>
  );
}
