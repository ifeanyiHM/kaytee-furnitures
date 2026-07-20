import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import { Order, type IOrderItem } from "@/lib/models/Order";
import { Cart } from "@/lib/models/Cart";
import { Product } from "@/lib/models/Product";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    await connectDB();
    const orderId = event.data.metadata?.orderId;
    if (!orderId) return NextResponse.json({ received: true });

    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: "PAID", paymentRef: event.data.reference, status: "CONFIRMED" },
      { new: true }
    );

    if (order) {
      await Promise.all(
        (order.items as IOrderItem[]).map((item) =>
          Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } })
        )
      );
      await Cart.findOneAndDelete({ userId: order.userId });
    }
  }

  return NextResponse.json({ received: true });
}
