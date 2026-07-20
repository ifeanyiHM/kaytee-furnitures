"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/actions/products";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";

export function AdminProductActions({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this product?")) return;
    setLoading(true);
    await deleteProduct(productId);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 justify-end">
      <Link href={`/admin/products/${productId}/edit`} className="p-1.5 text-charcoal-muted hover:text-brand-600 transition-colors rounded hover:bg-brand-50">
        <RiEditLine className="w-4 h-4" />
      </Link>
      <button onClick={handleDelete} disabled={loading} className="p-1.5 text-charcoal-muted hover:text-red-500 transition-colors rounded hover:bg-red-50">
        <RiDeleteBinLine className="w-4 h-4" />
      </button>
    </div>
  );
}
