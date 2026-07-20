"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Category } from "@/lib/models/Category";
import { slugify } from "@/lib/utils/format";
import { productSchema } from "@/lib/validations/product";
import type { ActionResult, PaginatedResult, ProductType } from "@/types";

function serialize(doc: unknown): unknown {
  return JSON.parse(JSON.stringify(doc));
}

export async function getProducts({
  categorySlug, search, sort = "newest", status = "ACTIVE", page = 1, limit = 12,
}: {
  categorySlug?: string; search?: string; sort?: string;
  status?: string; page?: number; limit?: number;
} = {}): Promise<PaginatedResult<ProductType>> {
  await connectDB();

  const query: Record<string, unknown> = { status };
  if (search) query.$text = { $search: search };
  if (categorySlug) {
    const cat = await Category.findOne({ slug: categorySlug });
    if (cat) query.categoryId = cat._id;
  }

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    newest: { createdAt: -1 }, "price-asc": { price: 1 },
    "price-desc": { price: -1 }, featured: { featured: -1, createdAt: -1 },
  };

  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Product.find(query).populate("categoryId", "name slug").sort(sortMap[sort] || { createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(query),
  ]);

  return { data: serialize(data) as ProductType[], total, page, pages: Math.ceil(total / limit) };
}

export async function getProductBySlug(slug: string): Promise<ProductType | null> {
  await connectDB();
  const product = await Product.findOne({ slug, status: "ACTIVE" }).populate("categoryId", "name slug").lean();
  return product ? (serialize(product) as ProductType) : null;
}

export async function getFeaturedProducts(limit = 8): Promise<ProductType[]> {
  await connectDB();
  const products = await Product.find({ featured: true, status: "ACTIVE" })
    .populate("categoryId", "name slug").limit(limit).sort({ createdAt: -1 }).lean();
  return serialize(products) as ProductType[];
}

export async function createProduct(data: unknown): Promise<ActionResult<ProductType>> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  const parsed = productSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || "Validation error" };

  await connectDB();
  const slug = slugify(parsed.data.name);
  const product = await Product.create({ ...parsed.data, slug });
  revalidatePath("/shop"); revalidatePath("/admin/products");
  return { success: true, data: serialize(product) as ProductType };
}

export async function updateProduct(id: string, data: unknown): Promise<ActionResult<ProductType>> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  const product = await Product.findByIdAndUpdate(id, data as Record<string, unknown>, { new: true }).lean();
  revalidatePath("/shop"); revalidatePath("/admin/products");
  return { success: true, data: serialize(product) as ProductType };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  await Product.findByIdAndDelete(id);
  revalidatePath("/shop"); revalidatePath("/admin/products");
  return { success: true };
}

export async function getCategories() {
  await connectDB();
  const cats = await Category.find().sort({ name: 1 }).lean();
  return serialize(cats);
}

export async function createCategory(data: { name: string; description?: string; image?: string }): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  const slug = slugify(data.name);
  await Category.create({ ...data, slug });
  revalidatePath("/admin/categories");
  return { success: true };
}
