"use client";
import { useState } from "react";
import { RiShoppingBag2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/actions/cart";

export function AddToCartButton({ productId, stock }: { productId: string; stock: number }) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleAdd() {
    setLoading(true);
    await addToCart(productId, qty);
    setAdded(true);
    setLoading(false);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-sand-200 rounded">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 flex items-center justify-center font-sans text-lg text-charcoal hover:bg-sand-100 transition-colors">−</button>
          <span className="w-10 text-center font-sans text-sm">{qty}</span>
          <button onClick={() => setQty(Math.min(stock, qty + 1))} className="w-9 h-9 flex items-center justify-center font-sans text-lg text-charcoal hover:bg-sand-100 transition-colors">+</button>
        </div>
      </div>
      <Button onClick={handleAdd} loading={loading} disabled={stock === 0} size="lg" className="w-full">
        <RiShoppingBag2Line className="w-5 h-5" />
        {added ? "Added to cart!" : stock === 0 ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  );
}
