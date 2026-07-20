"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { PortfolioItem } from "@/lib/models/PortfolioItem";
import { slugify } from "@/lib/utils/format";
import type { ActionResult, PortfolioItemType, PaginatedResult } from "@/types";

function serialize(doc: unknown): unknown { return JSON.parse(JSON.stringify(doc)); }

export async function getPortfolioItems({ category, featured, page = 1, limit = 12 }: {
  category?: string; featured?: boolean; page?: number; limit?: number;
} = {}): Promise<PaginatedResult<PortfolioItemType>> {
  await connectDB();
  const query: Record<string, unknown> = { published: true };
  if (category && category !== "All") query.category = category;
  if (featured !== undefined) query.featured = featured;

  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    PortfolioItem.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    PortfolioItem.countDocuments(query),
  ]);
  return { data: serialize(data) as PortfolioItemType[], total, page, pages: Math.ceil(total / limit) };
}

export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItemType | null> {
  await connectDB();
  const item = await PortfolioItem.findOne({ slug, published: true }).lean();
  return item ? (serialize(item) as PortfolioItemType) : null;
}

export async function getFeaturedPortfolio(limit = 6): Promise<PortfolioItemType[]> {
  await connectDB();
  const items = await PortfolioItem.find({ featured: true, published: true }).sort({ createdAt: -1 }).limit(limit).lean();
  return serialize(items) as PortfolioItemType[];
}

export async function createPortfolioItem(data: { title: string; description: string; category: string; coverImage: string; images?: string[]; style?: string; client?: string; location?: string; year?: number; tags?: string[]; featured?: boolean; published?: boolean }): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  const slug = slugify(data.title);
  await PortfolioItem.create({ ...data, slug, images: data.images || [], tags: data.tags || [] });
  revalidatePath("/portfolio"); revalidatePath("/admin/portfolio");
  return { success: true };
}

export async function updatePortfolioItem(id: string, data: Partial<PortfolioItemType>): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  await PortfolioItem.findByIdAndUpdate(id, data);
  revalidatePath("/portfolio"); revalidatePath("/admin/portfolio");
  return { success: true };
}

export async function deletePortfolioItem(id: string): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  await PortfolioItem.findByIdAndDelete(id);
  revalidatePath("/portfolio"); revalidatePath("/admin/portfolio");
  return { success: true };
}
