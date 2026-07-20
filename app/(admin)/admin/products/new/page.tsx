import type { Metadata } from "next";
import { getCategories } from "@/actions/products";
import { AdminProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "New Product — Admin" };

export default async function NewProductPage() {
  const categories = await getCategories().catch(() => []);
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <h1 className="font-display text-3xl text-charcoal mb-6">Add product</h1>
      <AdminProductForm
        categories={categories as { _id: string; name: string }[]}
      />
    </div>
  );
}
