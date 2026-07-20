import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  userId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED" | "CLOSED";
  adminReply?: string;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["UNREAD", "READ", "REPLIED", "CLOSED"], default: "UNREAD" },
    adminReply: String,
  },
  { timestamps: true }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
