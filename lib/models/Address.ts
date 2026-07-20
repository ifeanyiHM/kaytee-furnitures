import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAddress extends Document {
  userId: mongoose.Types.ObjectId;
  label?: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  phone?: string;
  isDefault: boolean;
}

const AddressSchema = new Schema<IAddress>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  label: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "Nigeria" },
  postalCode: String,
  phone: String,
  isDefault: { type: Boolean, default: false },
});

export const Address: Model<IAddress> =
  mongoose.models.Address || mongoose.model<IAddress>("Address", AddressSchema);
