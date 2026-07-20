"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Inquiry } from "@/lib/models/Inquiry";
import { inquirySchema } from "@/lib/validations/inquiry";
import { sendInquiryNotification } from "@/lib/email";
import type { ActionResult, InquiryType, PaginatedResult } from "@/types";

function serialize(doc: unknown): unknown { return JSON.parse(JSON.stringify(doc)); }

export async function createInquiry(data: unknown): Promise<ActionResult> {
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || "Validation error" };

  const session = await auth();
  await connectDB();
  await Inquiry.create({ ...parsed.data, userId: session?.user?.id });
  await sendInquiryNotification(parsed.data);
  return { success: true };
}

export async function adminGetInquiries(page = 1, limit = 20, status?: string): Promise<PaginatedResult<InquiryType>> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { data: [], total: 0, page: 1, pages: 0 };

  await connectDB();
  const query: Record<string, unknown> = status ? { status } : {};
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Inquiry.find(query as any).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Inquiry.countDocuments(query as any),
  ]);
  return { data: serialize(data) as InquiryType[], total, page, pages: Math.ceil(total / limit) };
}

export async function replyToInquiry(id: string, reply: string): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  await connectDB();
  await Inquiry.findByIdAndUpdate(id, { adminReply: reply, status: "REPLIED" });
  revalidatePath("/admin/inquiries");
  return { success: true };
}
