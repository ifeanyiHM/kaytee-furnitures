"use server";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";
import { registerSchema } from "@/lib/validations/user";
import type { ActionResult } from "@/types";

export async function registerUser(data: { name: string; email: string; password: string }): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || "Validation error" };

  await connectDB();
  const exists = await User.findOne({ email: parsed.data.email.toLowerCase() });
  if (exists) return { success: false, error: "Email already registered" };

  const hashed = await bcrypt.hash(parsed.data.password, 12);
  await User.create({ ...parsed.data, email: parsed.data.email.toLowerCase(), password: hashed });
  return { success: true };
}

export async function loginUser(data: { email: string; password: string }) {
  await signIn("credentials", { ...data, redirect: false });
}
