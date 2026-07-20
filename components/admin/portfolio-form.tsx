"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortfolioItem } from "@/actions/portfolio";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_CATEGORIES } from "@/lib/utils/constants";

export function AdminPortfolioForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const result = await createPortfolioItem({
      title: form.get("title") as string,
      description: form.get("description") as string,
      category: form.get("category") as string,
      coverImage: form.get("coverImage") as string,
      style: form.get("style") as string || undefined,
      client: form.get("client") as string || undefined,
      location: form.get("location") as string || undefined,
      year: form.get("year") ? Number(form.get("year")) : undefined,
      images: (form.get("images") as string).split("\n").map(s => s.trim()).filter(Boolean),
      tags: (form.get("tags") as string).split(",").map(s => s.trim()).filter(Boolean),
      featured: form.get("featured") === "on",
      published: form.get("published") === "on",
    });
    if (!result.success) { setError(result.error || "Failed"); setLoading(false); return; }
    router.push("/admin/portfolio");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-sand-200 rounded-xl p-6 space-y-4">
        <h2 className="font-display text-lg text-charcoal">Project details</h2>
        <Input label="Project title" name="title" required />
        <Textarea label="Description" name="description" rows={4} required />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block font-sans text-sm font-medium text-charcoal">Category</label>
            <select name="category" required className="w-full h-10 px-3 border border-sand-200 rounded font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400">
              {PORTFOLIO_CATEGORIES.filter(c => c !== "All").map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Input label="Style (e.g. Modern)" name="style" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Client name" name="client" />
          <Input label="Location" name="location" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Year" name="year" type="number" placeholder="2024" />
          <Input label="Tags (comma-separated)" name="tags" />
        </div>
      </div>

      <div className="bg-white border border-sand-200 rounded-xl p-6 space-y-4">
        <h2 className="font-display text-lg text-charcoal">Images</h2>
        <Input label="Cover image URL" name="coverImage" required placeholder="https://..." />
        <div className="space-y-1.5">
          <label className="block font-sans text-sm font-medium text-charcoal">Additional images (one URL per line)</label>
          <textarea name="images" rows={4} className="w-full px-3 py-2 border border-sand-200 rounded font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="https://..." />
        </div>
      </div>

      <div className="bg-white border border-sand-200 rounded-xl p-6 space-y-3">
        <h2 className="font-display text-lg text-charcoal">Visibility</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="featured" className="accent-brand-600" />
          <span className="font-sans text-sm text-charcoal">Featured project</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="published" className="accent-brand-600" />
          <span className="font-sans text-sm text-charcoal">Publish immediately</span>
        </label>
      </div>

      {error && <p className="font-sans text-sm text-red-500">{error}</p>}
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" loading={loading}>Save project</Button>
      </div>
    </form>
  );
}
