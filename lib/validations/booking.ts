import { z } from "zod";

export const bookingSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  spaceSize: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(20, "Please describe your project (min 20 characters)"),
  preferredDate: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
