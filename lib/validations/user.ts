import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password is required"),
});

export const profileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  image: z.string().url().optional(),
});

export const addressSchema = z.object({
  label: z.string().optional(),
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  street: z.string().min(1, "Street address required"),
  city: z.string().min(1, "City required"),
  state: z.string().min(1, "State required"),
  country: z.string().default("Nigeria"),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
