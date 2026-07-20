"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import { Cart } from "@/lib/models/Cart";
import { Product } from "@/lib/models/Product";
import { WishlistItem } from "@/lib/models/WishlistItem";
import type { ActionResult } from "@/types";

function serialize(doc: unknown): unknown { return JSON.parse(JSON.stringify(doc)); }

async function getCartKey() {
  const session = await auth();
  if (session?.user?.id) return { userId: session.user.id };
  const cookieStore = await cookies();
  let sid = cookieStore.get("cart_session")?.value;
  if (!sid) sid = Math.random().toString(36).slice(2);
  return { sessionId: sid };
}

export async function getCart() {
  await connectDB();
  const key = await getCartKey();
  const cart = await Cart.findOne(key).populate({ path: "items.productId", model: "Product" }).lean();
  return serialize(cart);
}

export async function addToCart(productId: string, quantity = 1, color?: string): Promise<ActionResult> {
  await connectDB();
  const product = await Product.findById(productId);
  if (!product || product.status !== "ACTIVE") return { success: false, error: "Product not available" };
  if (product.stock < quantity) return { success: false, error: "Insufficient stock" };

  const key = await getCartKey();
  const cart = await Cart.findOne(key);

  if (cart) {
    const existing = cart.items.find((i: { productId: { toString(): string }; quantity: number; color?: string }) => i.productId.toString() === productId && i.color === color);
    if (existing) existing.quantity = Math.min(existing.quantity + quantity, product.stock);
    else cart.items.push({ productId: productId as unknown as import("mongoose").Types.ObjectId, quantity, color });
    await cart.save();
  } else {
    await Cart.create({ ...key, items: [{ productId: productId as unknown as import("mongoose").Types.ObjectId, quantity, color }] });
  }

  revalidatePath("/cart");
  return { success: true };
}

export async function updateCartItem(productId: string, quantity: number): Promise<ActionResult> {
  await connectDB();
  const key = await getCartKey();
  const cart = await Cart.findOne(key);
  if (!cart) return { success: false, error: "Cart not found" };

  const item = cart.items.find((i: { productId: { toString(): string } }) => i.productId.toString() === productId);
  if (!item) return { success: false, error: "Item not found" };

  if (quantity <= 0) cart.items = cart.items.filter((i: { productId: { toString(): string } }) => i.productId.toString() !== productId);
  else item.quantity = quantity;

  await cart.save();
  revalidatePath("/cart");
  return { success: true };
}

export async function removeFromCart(productId: string): Promise<ActionResult> {
  await connectDB();
  const key = await getCartKey();
  await Cart.findOneAndUpdate(key, { $pull: { items: { productId } } });
  revalidatePath("/cart");
  return { success: true };
}

export async function clearCart(): Promise<ActionResult> {
  await connectDB();
  const key = await getCartKey();
  await Cart.findOneAndUpdate(key, { $set: { items: [] } });
  revalidatePath("/cart");
  return { success: true };
}

export async function toggleWishlist(productId: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Please log in" };

  await connectDB();
  const existing = await WishlistItem.findOne({ userId: session.user.id, productId });
  if (existing) await WishlistItem.findByIdAndDelete(existing._id);
  else await WishlistItem.create({ userId: session.user.id, productId });

  revalidatePath("/wishlist");
  return { success: true };
}

export async function getWishlist() {
  const session = await auth();
  if (!session?.user?.id) return [];

  await connectDB();
  const items = await WishlistItem.find({ userId: session.user.id })
    .populate("productId").lean();
  return serialize(items);
}
