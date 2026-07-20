import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWishlistItem extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const WishlistItemSchema = new Schema<IWishlistItem>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

WishlistItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const WishlistItem: Model<IWishlistItem> =
  mongoose.models.WishlistItem ||
  mongoose.model<IWishlistItem>("WishlistItem", WishlistItemSchema);
