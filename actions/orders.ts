"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Order, type IOrder } from "@/lib/models/Order";
import { Cart } from "@/lib/models/Cart";
import { Address } from "@/lib/models/Address";
import { paystack } from "@/lib/paystack";
import { generateOrderNumber } from "@/lib/utils/format";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, TAX_RATE } from "@/lib/utils/constants";
import type { ActionResult, OrderType, PaginatedResult } from "@/types";
import mongoose from "mongoose";

function serialize(doc: unknown): unknown { return JSON.parse(JSON.stringify(doc)); }

interface PopulatedCartItem {
  productId: { _id: mongoose.Types.ObjectId; name: string; images: string[]; price: number };
  quantity: number;
  color?: string;
}

export async function initiateCheckout(addressId: string): Promise<ActionResult<{ authorizationUrl: string; orderId: string }>> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Please log in" };

  await connectDB();
  const [cartDoc, addressDoc] = await Promise.all([
    Cart.findOne({ userId: session.user.id }).populate("items.productId"),
    Address.findById(addressId).lean(),
  ]);

  const cart = cartDoc as unknown as { items: PopulatedCartItem[] } | null;
  if (!cart?.items?.length) return { success: false, error: "Cart is empty" };
  if (!addressDoc) return { success: false, error: "Invalid address" };

  const subtotal = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const addrPlain: Record<string, unknown> = serialize(addressDoc) as Record<string, unknown>;

  const orderData: Partial<IOrder> = {
    orderNumber: generateOrderNumber(),
    userId: new mongoose.Types.ObjectId(session.user.id),
    status: "PENDING",
    paymentStatus: "UNPAID",
    subtotal, shipping, tax, total,
    currency: "NGN",
    discount: 0,
    shippingAddress: addrPlain,
    items: cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      image: item.productId.images[0] || "",
      price: item.productId.price,
      quantity: item.quantity,
      color: item.color,
    })),
  };

  const order = await Order.create(orderData);

  const response = await paystack.initializeTransaction({
    email: session.user.email!,
    amount: Math.round(total * 100),
    reference: order._id.toString(),
    callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderId=${order._id}`,
    metadata: { orderId: order._id.toString() },
  });

  return { success: true, data: { authorizationUrl: response.data.authorization_url, orderId: order._id.toString() } };
}

export async function getUserOrders(page = 1, limit = 10): Promise<PaginatedResult<OrderType>> {
  const session = await auth();
  if (!session?.user?.id) return { data: [], total: 0, page: 1, pages: 0 };

  await connectDB();
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Order.find({ userId: session.user.id }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Order.countDocuments({ userId: session.user.id }),
  ]);
  return { data: serialize(data) as OrderType[], total, page, pages: Math.ceil(total / limit) };
}

export async function getOrderById(id: string): Promise<OrderType | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  await connectDB();
  const order = await Order.findOne({ _id: id, userId: session.user.id }).lean();
  return order ? (serialize(order) as OrderType) : null;
}

export async function adminGetOrders(page = 1, limit = 20, status?: string): Promise<PaginatedResult<OrderType>> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { data: [], total: 0, page: 1, pages: 0 };

  await connectDB();
  const query: Record<string, string> = {};
  if (status) query.status = status;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Order.find(query).populate("userId", "name email").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Order.countDocuments(query),
  ]);
  return { data: serialize(data) as OrderType[], total, page, pages: Math.ceil(total / limit) };
}

export async function updateOrderStatus(orderId: string, status: string): Promise<ActionResult> {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return { success: false, error: "Unauthorized" };
  await connectDB();
  await Order.findByIdAndUpdate(orderId, { status });
  revalidatePath("/admin/orders");
  return { success: true };
}
