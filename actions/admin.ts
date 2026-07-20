"use server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { User } from "@/lib/models/User";
import { Product } from "@/lib/models/Product";
import { Booking } from "@/lib/models/Booking";
import { Testimonial } from "@/lib/models/Testimonial";
import { Inquiry } from "@/lib/models/Inquiry";
import { revalidatePath } from "next/cache";
import type { ActionResult, TestimonialType } from "@/types";

function serialize(doc: unknown): unknown { return JSON.parse(JSON.stringify(doc)); }

export async function getAdminStats() {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return null;

  await connectDB();
  const [totalOrders, pendingBookings, totalProducts, totalCustomers, revenueAgg, pendingInquiries] = await Promise.all([
    Order.countDocuments(),
    Booking.countDocuments({ status: "PENDING" }),
    Product.countDocuments({ status: "ACTIVE" }),
    User.countDocuments({ role: "CUSTOMER" }),
    Order.aggregate([{ $match: { paymentStatus: "PAID" } }, { $group: { _id: null, total: { $sum: "$total" } } }]),
    Inquiry.countDocuments({ status: "UNREAD" }),
  ]);

  const revenue = revenueAgg[0]?.total ?? 0;
  return { totalOrders, pendingBookings, totalProducts, totalCustomers, revenue, pendingInquiries };
}

export async function getAdminCustomers(page = 1, limit = 20) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { data: [], total: 0, page: 1, pages: 0 };

  await connectDB();
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    User.find({ role: "CUSTOMER" }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments({ role: "CUSTOMER" }),
  ]);
  return { data: serialize(data), total, page, pages: Math.ceil(total / limit) };
}

export async function getTestimonials(approvedOnly = false) {
  await connectDB();
  const query = approvedOnly ? { approved: true } : {};
  const items = await Testimonial.find(query).sort({ createdAt: -1 }).lean();
  return serialize(items) as TestimonialType[];
}

export async function updateTestimonial(id: string, data: Partial<TestimonialType>): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  await Testimonial.findByIdAndUpdate(id, data);
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function createTestimonial(data: { name: string; role?: string; content: string; rating: number; image?: string }): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  await Testimonial.create({ ...data, approved: true });
  revalidatePath("/admin/testimonials");
  return { success: true };
}
