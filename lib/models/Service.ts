import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  features: string[];
  priceFrom?: number;
  duration?: string;
  image?: string;
  active: boolean;
  order: number;
}

const ServiceSchema = new Schema<IService>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: String,
  features: [{ type: String }],
  priceFrom: Number,
  duration: String,
  image: String,
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
