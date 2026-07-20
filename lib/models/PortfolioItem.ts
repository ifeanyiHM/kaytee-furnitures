import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPortfolioItem extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  style?: string;
  client?: string;
  location?: string;
  year?: number;
  coverImage: string;
  images: string[];
  featured: boolean;
  published: boolean;
  tags: string[];
  metaTitle?: string;
  metaDesc?: string;
  createdAt: Date;
}

const PortfolioItemSchema = new Schema<IPortfolioItem>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    style: String,
    client: String,
    location: String,
    year: Number,
    coverImage: { type: String, required: true },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    tags: [{ type: String }],
    metaTitle: String,
    metaDesc: String,
  },
  { timestamps: true }
);

export const PortfolioItem: Model<IPortfolioItem> =
  mongoose.models.PortfolioItem ||
  mongoose.model<IPortfolioItem>("PortfolioItem", PortfolioItemSchema);
