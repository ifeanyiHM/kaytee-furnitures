"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";
import { Address } from "@/lib/models/Address";
import { Notification } from "@/lib/models/Notification";
import { addressSchema } from "@/lib/validations/user";
import type { ActionResult, AddressType, NotificationType } from "@/types";

function serialize(doc: unknown): unknown { return JSON.parse(JSON.stringify(doc)); }

export async function updateProfile(data: { name: string; phone?: string }): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  await connectDB();
  await User.findByIdAndUpdate(session.user.id, data);
  revalidatePath("/profile");
  return { success: true };
}

export async function getAddresses(): Promise<AddressType[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();
  const addresses = await Address.find({ userId: session.user.id }).lean();
  return serialize(addresses) as AddressType[];
}

export async function createAddress(data: unknown): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const parsed = addressSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || "Validation error" };

  await connectDB();
  if (parsed.data.isDefault) {
    await Address.updateMany({ userId: session.user.id }, { isDefault: false });
  }
  await Address.create({ ...parsed.data, userId: session.user.id });
  revalidatePath("/addresses");
  return { success: true };
}

export async function deleteAddress(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  await connectDB();
  await Address.findOneAndDelete({ _id: id, userId: session.user.id });
  revalidatePath("/addresses");
  return { success: true };
}

export async function getNotifications(): Promise<NotificationType[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();
  const notes = await Notification.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(20).lean();
  return serialize(notes) as NotificationType[];
}

export async function markNotificationRead(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  await connectDB();
  await Notification.findOneAndUpdate({ _id: id, userId: session.user.id }, { read: true });
  return { success: true };
}
