"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiAddLine, RiGridLine } from "react-icons/ri";

export function AdminCategoryManager({ categories }: { categories: { _id: string; name: string; slug: string; description?: string }[] }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await createCategory({ name, description });
    setName(""); setDescription(""); setAdding(false);
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white border border-sand-200 rounded-xl overflow-hidden">
        <div className="border-b border-sand-200 px-5 py-3 flex items-center justify-between">
          <span className="font-sans text-sm font-medium text-charcoal">{categories.length} categories</span>
          <Button size="sm" onClick={() => setAdding(true)}><RiAddLine className="w-4 h-4" />Add category</Button>
        </div>
        {categories.length === 0 ? (
          <div className="text-center py-12 text-charcoal-muted font-sans text-sm">No categories yet. Create one to get started.</div>
        ) : (
          <div className="divide-y divide-sand-100">
            {categories.map((cat) => (
              <div key={cat._id} className="flex items-center gap-3 px-5 py-3 hover:bg-sand-50 transition-colors">
                <div className="w-8 h-8 bg-brand-50 rounded flex items-center justify-center shrink-0">
                  <RiGridLine className="w-4 h-4 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-medium text-charcoal">{cat.name}</p>
                  <p className="font-sans text-xs text-charcoal-muted">/{cat.slug}</p>
                </div>
                {cat.description && <p className="font-sans text-xs text-charcoal-muted truncate max-w-xs hidden md:block">{cat.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {adding && (
        <div className="bg-white border border-sand-200 rounded-xl p-6 h-fit">
          <h3 className="font-display text-lg text-charcoal mb-4">New category</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <Input label="Category name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Living Room" />
            <div className="space-y-1.5">
              <label className="block font-sans text-sm font-medium text-charcoal">Description (optional)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                className="w-full px-3 py-2 border border-sand-200 rounded font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none" />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setAdding(false)} className="flex-1">Cancel</Button>
              <Button type="submit" loading={loading} className="flex-1">Add</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
