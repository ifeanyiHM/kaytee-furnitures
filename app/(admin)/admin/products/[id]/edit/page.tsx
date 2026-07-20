import { getCategories } from "@/actions/products";
import { AdminProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage() {
  const categories = await getCategories().catch(() => []);
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <h1 className="font-display text-3xl text-charcoal mb-6">Edit product</h1>
      <AdminProductForm
        categories={categories as { _id: string; name: string }[]}
      />
    </div>
  );
}
