"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { slugify, calculateReadTime } from "@/lib/utils/format";
import type { ActionResult, BlogPostType, PaginatedResult } from "@/types";

function serialize(doc: unknown): unknown { return JSON.parse(JSON.stringify(doc)); }

export async function getBlogPosts({ page = 1, limit = 9, category, featured }: {
  page?: number; limit?: number; category?: string; featured?: boolean;
} = {}): Promise<PaginatedResult<BlogPostType>> {
  await connectDB();
  const query: Record<string, unknown> = { status: "PUBLISHED" };
  if (category) query.category = category;
  if (featured !== undefined) query.featured = featured;

  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    BlogPost.find(query).populate("authorId", "name image").sort({ publishedAt: -1 }).skip(skip).limit(limit).lean(),
    BlogPost.countDocuments(query),
  ]);
  return { data: serialize(data) as BlogPostType[], total, page, pages: Math.ceil(total / limit) };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostType | null> {
  await connectDB();
  const post = await BlogPost.findOne({ slug, status: "PUBLISHED" }).populate("authorId", "name image").lean();
  return post ? (serialize(post) as BlogPostType) : null;
}

export async function createBlogPost(data: {
  title: string; excerpt: string; content: string; coverImage?: string;
  tags?: string[]; category?: string; status?: string; featured?: boolean;
}): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  const slug = slugify(data.title);
  const readTime = calculateReadTime(data.content);
  const status = (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "DRAFT";

  await BlogPost.create({
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.coverImage,
    category: data.category,
    tags: data.tags || [],
    featured: data.featured || false,
    slug,
    readTime,
    status,
    authorId: session!.user!.id,
    publishedAt: status === "PUBLISHED" ? new Date() : undefined,
  });
  revalidatePath("/blog"); revalidatePath("/admin/blog");
  return { success: true };
}

export async function updateBlogPost(id: string, data: Partial<BlogPostType>): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  const update: Record<string, unknown> = { ...data };
  if (data.status === "PUBLISHED") update.publishedAt = new Date();
  if (data.content) update.readTime = calculateReadTime(data.content as string);
  await BlogPost.findByIdAndUpdate(id, update);
  revalidatePath("/blog"); revalidatePath("/admin/blog");
  return { success: true };
}
