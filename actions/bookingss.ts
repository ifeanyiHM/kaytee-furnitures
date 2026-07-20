"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Booking } from "@/lib/models/Booking";
import { Service } from "@/lib/models/Service";
import { bookingSchema } from "@/lib/validations/booking";
import { sendBookingConfirmation } from "@/lib/emaill";
import type {
  ActionResult,
  BookingType,
  ServiceType,
  PaginatedResult,
} from "@/types";

function serialize(doc: unknown): unknown {
  return JSON.parse(JSON.stringify(doc));
}

export async function getServices(): Promise<ServiceType[]> {
  await connectDB();
  const services = await Service.find({ active: true })
    .sort({ order: 1 })
    .lean();
  return serialize(services) as ServiceType[];
}

export async function createBooking(data: unknown): Promise<ActionResult> {
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Validation error",
    };

  const session = await auth();
  await connectDB();

  const service = await Service.findById(parsed.data.serviceId);
  if (!service) return { success: false, error: "Service not found" };

  const booking = await Booking.create({
    ...parsed.data,
    userId: session?.user?.id,
    preferredDate: parsed.data.preferredDate
      ? new Date(parsed.data.preferredDate)
      : undefined,
  });

  await sendBookingConfirmation({
    firstName: parsed.data.firstName,
    email: parsed.data.email,
    serviceName: service.name,
  });

  revalidatePath("/admin/bookings");
  return { success: true, data: { id: booking._id.toString() } };
}

export async function getUserBookings(): Promise<BookingType[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();
  const bookings = await Booking.find({ userId: session.user.id })
    .populate("serviceId", "name slug")
    .sort({ createdAt: -1 })
    .lean();
  return serialize(bookings) as BookingType[];
}

export async function adminGetBookings(
  page = 1,
  limit = 20,
  status?: string,
): Promise<PaginatedResult<BookingType>> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN")
    return { data: [], total: 0, page: 1, pages: 0 };

  await connectDB();
  const query: Record<string, unknown> = status ? { status } : {};
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Booking.find(query as any)
      .populate("serviceId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Booking.countDocuments(query as any),
  ]);
  return {
    data: serialize(data) as BookingType[],
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

export async function updateBookingStatus(
  id: string,
  status: string,
  adminNotes?: string,
): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN")
    return { success: false, error: "Unauthorized" };

  await connectDB();
  await Booking.findByIdAndUpdate(id, {
    status,
    ...(adminNotes && { adminNotes }),
  });
  revalidatePath("/admin/bookings");
  return { success: true };
}
