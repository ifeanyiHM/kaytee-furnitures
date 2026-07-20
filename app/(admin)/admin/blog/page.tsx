import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/actions/blog";
import { formatDate } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import { RiAddLine, RiEditLine } from "react-icons/ri";

export const metadata: Metadata = { title: "Blog — Admin" };

export default async function AdminBlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  // Get all statuses for admin
  const { data: posts, total } = await getBlogPosts({ page, limit: 20 }).catch(() => ({ data: [], total: 0, pages: 0 }));

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Blog posts</h1>
          <p className="font-sans text-sm text-charcoal-muted mt-1">{total} posts</p>
        </div>
        <Link href="/admin/blog/new"><Button><RiAddLine className="w-4 h-4" />New post</Button></Link>
      </div>

      <div className="bg-white border border-sand-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-sand-200 bg-sand-50">
            <tr>
              {["Title", "Category", "Status", "Date", ""].map((h) => (
                <th key={h} className="text-left font-sans text-xs text-charcoal-muted uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-sand-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-sans text-sm font-medium text-charcoal line-clamp-1">{post.title}</p>
                  <p className="font-sans text-xs text-charcoal-muted">{post.readTime} min read</p>
                </td>
                <td className="px-4 py-3 font-sans text-sm text-charcoal-muted">{post.category || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`font-sans text-xs px-2 py-0.5 rounded-full ${post.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {post.status.toLowerCase()}
                  </span>
                </td>
                <td className="px-4 py-3 font-sans text-sm text-charcoal-muted">
                  {post.publishedAt ? formatDate(post.publishedAt) : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/blog/${post.slug}`} className="inline-flex p-1.5 text-charcoal-muted hover:text-brand-600 transition-colors">
                    <RiEditLine className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <div className="text-center py-12 font-sans text-charcoal-muted">No blog posts yet.</div>}
      </div>
    </div>
  );
}
