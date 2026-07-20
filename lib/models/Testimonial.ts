import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  featured: boolean;
  approved: boolean;
  projectRef?: string;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: String,
    company: String,
    content: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    image: String,
    featured: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    projectRef: String,
  },
  { timestamps: true }
);

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
