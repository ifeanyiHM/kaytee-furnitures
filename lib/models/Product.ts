import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  sku?: string;
  stock: number;
  lowStockAlert: number;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  featured: boolean;
  images: string[];
  categoryId: mongoose.Types.ObjectId;
  tags: string[];
  dimensions?: { width?: number; height?: number; depth?: number; weight?: number };
  materials: string[];
  colors: string[];
  metaTitle?: string;
  metaDesc?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: Number,
    sku: { type: String, sparse: true, unique: true },
    stock: { type: Number, default: 0 },
    lowStockAlert: { type: Number, default: 5 },
    status: { type: String, enum: ["DRAFT", "ACTIVE", "ARCHIVED"], default: "DRAFT" },
    featured: { type: Boolean, default: false },
    images: [{ type: String }],
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [{ type: String }],
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
      weight: Number,
    },
    materials: [{ type: String }],
    colors: [{ type: String }],
    metaTitle: String,
    metaDesc: String,
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", tags: "text" });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
