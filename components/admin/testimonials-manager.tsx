"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial } from "@/actions/admin";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RiAddLine, RiStarFill, RiCheckLine, RiCloseLine } from "react-icons/ri";
import type { TestimonialType } from "@/types";

export function AdminTestimonialsManager({ testimonials }: { testimonials: TestimonialType[] }) {
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await createTestimonial({
      name: form.get("name") as string,
      role: form.get("role") as string || undefined,
      content: form.get("content") as string,
      rating: Number(form.get("rating")),
    });
    setAdding(false);
    router.refresh();
    setLoading(false);
  }

  async function toggleApprove(id: string, approved: boolean) {
    await updateTestimonial(id, { approved: !approved } as Partial<TestimonialType>);
    router.refresh();
  }

  async function toggleFeatured(id: string, featured: boolean) {
    await updateTestimonial(id, { featured: !featured } as Partial<TestimonialType>);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setAdding(true)}><RiAddLine className="w-4 h-4" />Add testimonial</Button>
      </div>

      {adding && (
        <div className="bg-white border border-sand-200 rounded-xl p-6">
          <h3 className="font-display text-lg text-charcoal mb-4">New testimonial</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Client name" name="name" required />
              <Input label="Role / project" name="role" />
            </div>
            <Textarea label="Testimonial content" name="content" rows={4} required />
            <div className="space-y-1.5">
              <label className="block font-sans text-sm font-medium text-charcoal">Rating</label>
              <select name="rating" className="h-10 px-3 border border-sand-200 rounded font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400">
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} stars</option>)}
              </select>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setAdding(false)}>Cancel</Button>
              <Button type="submit" loading={loading}>Save</Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t._id} className="bg-white border border-sand-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-sans text-sm font-medium text-charcoal">{t.name}</p>
                  {t.role && <span className="font-sans text-xs text-charcoal-muted">· {t.role}</span>}
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: t.rating }).map((_, i) => <RiStarFill key={i} className="w-3 h-3 text-brand-400" />)}
                </div>
                <p className="font-sans text-sm text-charcoal-muted line-clamp-2">{t.content}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleApprove(t._id, t.approved)}
                  className={`p-1.5 rounded transition-colors ${t.approved ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600"}`}
                  title={t.approved ? "Approved" : "Approve"}>
                  <RiCheckLine className="w-4 h-4" />
                </button>
                <button onClick={() => toggleFeatured(t._id, t.featured)}
                  className={`p-1.5 rounded transition-colors ${t.featured ? "bg-brand-100 text-brand-600" : "bg-gray-100 text-gray-500 hover:bg-brand-50 hover:text-brand-600"}`}
                  title={t.featured ? "Featured" : "Feature"}>
                  <RiStarFill className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {t.approved && <span className="font-sans text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Approved</span>}
              {t.featured && <span className="font-sans text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">Featured</span>}
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-center py-8 font-sans text-charcoal-muted">No testimonials yet.</p>}
      </div>
    </div>
  );
}
