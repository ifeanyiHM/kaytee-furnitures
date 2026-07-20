import type { Metadata } from "next";
import {
  getTestimonials,
  updateTestimonial,
  createTestimonial,
} from "@/actions/admin";
import { AdminTestimonialsManager } from "@/components/admin/TestimonialsManager";

export const metadata: Metadata = { title: "Testimonials — Admin" };

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials().catch(() => []);
  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-3xl text-charcoal mb-6">Testimonials</h1>
      <AdminTestimonialsManager testimonials={testimonials} />
    </div>
  );
}
