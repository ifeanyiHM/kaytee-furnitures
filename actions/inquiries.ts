"use server";
import { sendContactEmails } from "@/lib/email";
import { inquirySchema } from "@/lib/validations/inquiry";
import type { ActionResult } from "@/types";

export async function createInquiry(data: unknown): Promise<ActionResult> {
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  // Enquiries are delivered by email only — nothing is stored in a database.
  try {
    await sendContactEmails({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });
  } catch (err) {
    console.error("[email] Contact email failed:", err);
    return {
      success: false,
      error: "We couldn't send your message. Please try again or call us.",
    };
  }

  return { success: true };
}
