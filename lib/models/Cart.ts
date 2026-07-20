import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  color?: string;
}

export interface ICart extends Document {
  sessionId?: string;
  userId?: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1, min: 1 },
  color: String,
});

const CartSchema = new Schema<ICart>(
  {
    sessionId: { type: String, sparse: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", sparse: true, unique: true },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

export const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
