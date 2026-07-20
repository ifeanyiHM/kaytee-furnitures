"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAddress, deleteAddress } from "@/actions/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiAddLine, RiDeleteBinLine, RiMapPin2Line } from "react-icons/ri";
import type { AddressType } from "@/types";

interface FormValues {
  label: string; firstName: string; lastName: string;
  street: string; city: string; state: string;
  phone: string; isDefault: boolean;
}

const empty: FormValues = { label: "", firstName: "", lastName: "", street: "", city: "", state: "", phone: "", isDefault: false };

export function AddressManager({ addresses }: { addresses: AddressType[] }) {
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vals, setVals] = useState<FormValues>(empty);
  const router = useRouter();

  function set(field: keyof FormValues, value: string | boolean) {
    setVals((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await createAddress({ ...vals, country: "Nigeria" });
    setVals(empty); setAdding(false); router.refresh();
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await deleteAddress(id);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {addresses.map((addr) => (
        <div key={addr._id} className="bg-white border border-sand-200 rounded-xl p-5 flex items-start justify-between">
          <div className="flex gap-3">
            <RiMapPin2Line className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
            <div>
              {addr.label && <p className="font-sans text-xs text-brand-600 uppercase tracking-wider mb-0.5">{addr.label}</p>}
              <p className="font-sans text-sm font-medium text-charcoal">{addr.firstName} {addr.lastName}</p>
              <p className="font-sans text-sm text-charcoal-muted">{addr.street}, {addr.city}, {addr.state}</p>
              {addr.phone && <p className="font-sans text-sm text-charcoal-muted">{addr.phone}</p>}
              {addr.isDefault && <span className="font-sans text-xs text-green-600 font-medium">Default</span>}
            </div>
          </div>
          <button onClick={() => handleDelete(addr._id!)} className="text-charcoal-muted hover:text-red-500 transition-colors p-1">
            <RiDeleteBinLine className="w-4 h-4" />
          </button>
        </div>
      ))}

      {adding ? (
        <div className="bg-white border border-sand-200 rounded-xl p-6">
          <h3 className="font-display text-lg text-charcoal mb-4">New address</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Label (e.g. Home, Office)" value={vals.label} onChange={(e) => set("label", e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="First name" value={vals.firstName} onChange={(e) => set("firstName", e.target.value)} required />
              <Input label="Last name" value={vals.lastName} onChange={(e) => set("lastName", e.target.value)} required />
            </div>
            <Input label="Street address" value={vals.street} onChange={(e) => set("street", e.target.value)} required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="City" value={vals.city} onChange={(e) => set("city", e.target.value)} required />
              <Input label="State" value={vals.state} onChange={(e) => set("state", e.target.value)} required />
            </div>
            <Input label="Phone (optional)" type="tel" value={vals.phone} onChange={(e) => set("phone", e.target.value)} />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isDefault" checked={vals.isDefault} onChange={(e) => set("isDefault", e.target.checked)} className="accent-brand-600" />
              <label htmlFor="isDefault" className="font-sans text-sm text-charcoal">Set as default address</label>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setAdding(false)}>Cancel</Button>
              <Button type="submit" loading={loading}>Save address</Button>
            </div>
          </form>
        </div>
      ) : (
        <button onClick={() => setAdding(true)}
          className="w-full border-2 border-dashed border-sand-300 rounded-xl p-5 flex items-center gap-3 text-charcoal-muted hover:border-brand-400 hover:text-brand-600 transition-colors font-sans text-sm">
          <RiAddLine className="w-5 h-5" />
          Add new address
        </button>
      )}
    </div>
  );
}
