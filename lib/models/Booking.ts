import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  userId?: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  status: "PENDING" | "REVIEWED" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType?: string;
  budget?: string;
  spaceSize?: string;
  timeline?: string;
  description: string;
  preferredDate?: Date;
  adminNotes?: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    status: {
      type: String,
      enum: ["PENDING", "REVIEWED", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    projectType: String,
    budget: String,
    spaceSize: String,
    timeline: String,
    description: { type: String, required: true },
    preferredDate: Date,
    adminNotes: String,
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
