"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/actions/blog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function AdminBlogForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const result = await createBlogPost({
      title: form.get("title") as string,
      excerpt: form.get("excerpt") as string,
      content: form.get("content") as string,
      coverImage: form.get("coverImage") as string || undefined,
      category: form.get("category") as string || undefined,
      tags: (form.get("tags") as string).split(",").map(s => s.trim()).filter(Boolean),
      status: form.get("status") as string,
      featured: form.get("featured") === "on",
    });
    if (!result.success) { setError(result.error || "Failed"); setLoading(false); return; }
    router.push("/admin/blog");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-sand-200 rounded-xl p-6 space-y-4">
        <h2 className="font-display text-lg text-charcoal">Post content</h2>
        <Input label="Title" name="title" required />
        <Textarea label="Excerpt / summary" name="excerpt" rows={2} required />
        <div className="space-y-1.5">
          <label className="block font-sans text-sm font-medium text-charcoal">Content</label>
          <textarea name="content" rows={12} required
            className="w-full px-3 py-2 border border-sand-200 rounded font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            placeholder="Write your blog post content here..." />
        </div>
        <Input label="Cover image URL" name="coverImage" placeholder="https://..." />
      </div>

      <div className="bg-white border border-sand-200 rounded-xl p-6 space-y-4">
        <h2 className="font-display text-lg text-charcoal">Settings</h2>
        <Input label="Category" name="category" placeholder="e.g. Tips & Advice" />
        <Input label="Tags (comma-separated)" name="tags" placeholder="design, tips, modern" />
        <div className="space-y-1.5">
          <label className="block font-sans text-sm font-medium text-charcoal">Status</label>
          <select name="status" className="w-full h-10 px-3 border border-sand-200 rounded font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="featured" className="accent-brand-600" />
          <span className="font-sans text-sm text-charcoal">Featured post</span>
        </label>
      </div>

      {error && <p className="font-sans text-sm text-red-500">{error}</p>}
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" loading={loading}>Save post</Button>
      </div>
    </form>
  );
}
