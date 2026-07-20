import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  comparePrice: z.number().positive().optional(),
  sku: z.string().optional(),
  stock: z.number().int().min(0),
  lowStockAlert: z.number().int().min(0).default(5),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  categoryId: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  materials: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
