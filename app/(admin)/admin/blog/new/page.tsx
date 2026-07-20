import type { Metadata } from "next";
import { AdminBlogForm } from "@/components/admin/blog-form";

export const metadata: Metadata = { title: "New Blog Post — Admin" };

export default function NewBlogPostPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <h1 className="font-display text-3xl text-charcoal mb-6">New blog post</h1>
      <AdminBlogForm />
    </div>
  );
}
