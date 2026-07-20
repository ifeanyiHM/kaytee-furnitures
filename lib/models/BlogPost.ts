import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  authorId: mongoose.Types.ObjectId;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  tags: string[];
  category?: string;
  readTime?: number;
  metaTitle?: string;
  metaDesc?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: String,
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["DRAFT", "PUBLISHED", "ARCHIVED"], default: "DRAFT" },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    category: String,
    readTime: Number,
    metaTitle: String,
    metaDesc: String,
    publishedAt: Date,
  },
  { timestamps: true }
);

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
