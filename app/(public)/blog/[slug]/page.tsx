import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug } from "@/actions/blog";
import { formatDate } from "@/lib/utils/format";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  return post ? { title: post.metaTitle || post.title, description: post.metaDesc || post.excerpt } : { title: "Post not found" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  return (
    <article className="pt-20">
      {post.coverImage && (
        <div className="relative h-[50vh] bg-charcoal">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover opacity-70" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center gap-3 mb-6 font-sans text-sm text-charcoal-muted">
          {post.category && <span className="text-brand-600 font-medium">{post.category}</span>}
          {post.publishedAt && <><span>·</span><span>{formatDate(post.publishedAt)}</span></>}
          {post.readTime && <><span>·</span><span>{post.readTime} min read</span></>}
        </div>
        <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] text-charcoal leading-tight mb-8">{post.title}</h1>
        <p className="font-display text-xl text-charcoal-muted italic leading-relaxed mb-10 border-l-4 border-brand-400 pl-6">{post.excerpt}</p>
        <div className="prose prose-lg font-sans max-w-none prose-headings:font-display prose-a:text-brand-600">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-charcoal-muted leading-relaxed mb-4">{para}</p>
          ))}
        </div>
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-sand-200 flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span key={tag} className="font-sans text-xs bg-sand-100 text-charcoal-muted px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Link href="/blog" className="font-sans text-sm text-brand-600 hover:text-brand-800">← Back to blog</Link>
        </div>
      </div>
    </article>
  );
}
