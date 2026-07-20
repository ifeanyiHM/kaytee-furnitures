"use client";
import { useState, useCallback } from "react";
import { addToCart, removeFromCart, updateCartItem } from "@/actions/cart";
import { useRouter } from "next/navigation";

export function useCart() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const add = useCallback(async (productId: string, quantity = 1, color?: string) => {
    setLoading(true);
    const result = await addToCart(productId, quantity, color);
    router.refresh();
    setLoading(false);
    return result;
  }, [router]);

  const remove = useCallback(async (productId: string) => {
    setLoading(true);
    await removeFromCart(productId);
    router.refresh();
    setLoading(false);
  }, [router]);

  const update = useCallback(async (productId: string, quantity: number) => {
    setLoading(true);
    await updateCartItem(productId, quantity);
    router.refresh();
    setLoading(false);
  }, [router]);

  return { add, remove, update, loading };
}
