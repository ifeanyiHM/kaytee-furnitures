"use client";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { updateCartItem, removeFromCart } from "@/actions/cart";
import { useRouter } from "next/navigation";

export function CartActions({ productId, quantity }: { productId: string; quantity: number }) {
  const [qty, setQty] = useState(quantity);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function update(newQty: number) {
    setLoading(true);
    setQty(newQty);
    await updateCartItem(productId, newQty);
    router.refresh();
    setLoading(false);
  }

  async function remove() {
    setLoading(true);
    await removeFromCart(productId);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="flex items-center border border-sand-200 rounded">
        <button onClick={() => update(qty - 1)} disabled={loading || qty <= 1} className="w-7 h-7 flex items-center justify-center font-sans text-charcoal hover:bg-sand-100 disabled:opacity-40 text-sm">−</button>
        <span className="w-6 text-center font-sans text-sm">{qty}</span>
        <button onClick={() => update(qty + 1)} disabled={loading} className="w-7 h-7 flex items-center justify-center font-sans text-charcoal hover:bg-sand-100 text-sm">+</button>
      </div>
      <button onClick={remove} disabled={loading} className="p-1.5 text-charcoal-muted hover:text-red-500 transition-colors">
        <RiDeleteBinLine className="w-4 h-4" />
      </button>
    </div>
  );
}
