"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/actions/products";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  comparePrice: string;
  sku: string;
  stock: string;
  categoryId: string;
  status: string;
  featured: boolean;
  images: string;
}

export function AdminProductForm({ categories }: { categories: { _id: string; name: string }[] }) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({
    name: "", description: "", price: "", comparePrice: "", sku: "",
    stock: "0", categoryId: "", status: "DRAFT", featured: false, images: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field: keyof ProductFormValues, value: string | boolean) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await createProduct({
      name: values.name,
      description: values.description,
      price: parseFloat(values.price) || 0,
      comparePrice: values.comparePrice ? parseFloat(values.comparePrice) : undefined,
      sku: values.sku || undefined,
      stock: parseInt(values.stock) || 0,
      lowStockAlert: 5,
      categoryId: values.categoryId,
      status: values.status as "DRAFT" | "ACTIVE" | "ARCHIVED",
      featured: values.featured,
      images: values.images.split("\n").map((s) => s.trim()).filter(Boolean),
      tags: [], materials: [], colors: [],
    });
    setLoading(false);
    if (!result.success) { setError(result.error || "Failed"); return; }
    router.push("/admin/products");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-sand-200 rounded-xl p-6 space-y-4">
        <h2 className="font-display text-lg text-charcoal">Basic information</h2>
        <Input label="Product name" value={values.name} onChange={(e) => set("name", e.target.value)} required />
        <Textarea label="Description" value={values.description} onChange={(e) => set("description", e.target.value)} rows={4} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Price (₦)" type="number" step="0.01" value={values.price} onChange={(e) => set("price", e.target.value)} required />
          <Input label="Compare at price (₦)" type="number" step="0.01" value={values.comparePrice} onChange={(e) => set("comparePrice", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="SKU" value={values.sku} onChange={(e) => set("sku", e.target.value)} />
          <Input label="Stock quantity" type="number" value={values.stock} onChange={(e) => set("stock", e.target.value)} />
        </div>
      </div>

      <div className="bg-white border border-sand-200 rounded-xl p-6 space-y-4">
        <h2 className="font-display text-lg text-charcoal">Organisation</h2>
        <div className="space-y-1.5">
          <label className="block font-sans text-sm font-medium text-charcoal">Category</label>
          <select value={values.categoryId} onChange={(e) => set("categoryId", e.target.value)}
            className="w-full h-10 px-3 border border-sand-200 rounded font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400">
            <option value="">Select category</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block font-sans text-sm font-medium text-charcoal">Status</label>
          <select value={values.status} onChange={(e) => set("status", e.target.value)}
            className="w-full h-10 px-3 border border-sand-200 rounded font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400">
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="featured" checked={values.featured} onChange={(e) => set("featured", e.target.checked)} className="accent-brand-600" />
          <label htmlFor="featured" className="font-sans text-sm text-charcoal">Featured product</label>
        </div>
      </div>

      <div className="bg-white border border-sand-200 rounded-xl p-6 space-y-3">
        <h2 className="font-display text-lg text-charcoal">Images</h2>
        <p className="font-sans text-xs text-charcoal-muted">Enter image URLs, one per line</p>
        <textarea value={values.images} onChange={(e) => set("images", e.target.value)}
          rows={4} placeholder="https://res.cloudinary.com/..."
          className="w-full px-3 py-2 border border-sand-200 rounded font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
      </div>

      {error && <p className="font-sans text-sm text-red-500">{error}</p>}
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" loading={loading}>Save product</Button>
      </div>
    </form>
  );
}
