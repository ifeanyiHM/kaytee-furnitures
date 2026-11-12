"use server";
import { sendConsultationEmails } from "@/lib/email";
import { bookingSchema } from "@/lib/validations/booking";
import { SERVICES } from "@/lib/services-data";
import type { ActionResult } from "@/types";

export async function createBooking(data: unknown): Promise<ActionResult> {
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.issues?.[0]?.message ?? "Invalid input",
    };

  const serviceName =
    SERVICES.find((s) => s._id === parsed.data.serviceId)?.name ??
    "Interior Design";

  // Requests are delivered by email only — nothing is stored in a database.
  try {
    await sendConsultationEmails({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      serviceName,
      budget: parsed.data.budget,
      spaceSize: parsed.data.spaceSize,
      preferredDate: parsed.data.preferredDate,
      description: parsed.data.description,
    });
  } catch (err) {
    console.error("[email] Consultation email failed:", err);
    return {
      success: false,
      error: "We couldn't send your request. Please try again or call us.",
    };
  }

  return { success: true };
}
