import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils/format";
import type { BlogPostType } from "@/types";

export function BlogCard({ post }: { post: BlogPostType }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block bg-white border border-sand-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden bg-sand-100">
          <Image src={post.coverImage} alt={post.title} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          {post.category && <span className="font-sans text-xs text-brand-600 uppercase tracking-widest">{post.category}</span>}
          {post.readTime && <span className="font-sans text-xs text-charcoal-muted">{post.readTime} min read</span>}
        </div>
        <h3 className="font-display text-xl text-charcoal leading-tight mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">{post.title}</h3>
        <p className="font-sans text-sm text-charcoal-muted leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        {post.publishedAt && <p className="font-sans text-xs text-charcoal-muted">{formatDate(post.publishedAt)}</p>}
      </div>
    </Link>
  );
}
