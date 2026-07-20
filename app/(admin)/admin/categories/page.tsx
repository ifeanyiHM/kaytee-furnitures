import type { Metadata } from "next";
import { getCategories, createCategory } from "@/actions/products";
import { AdminCategoryManager } from "@/components/admin/CategoryManager";

export const metadata: Metadata = { title: "Categories — Admin" };

export default async function AdminCategoriesPage() {
  const categories = await getCategories().catch(() => []);
  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-3xl text-charcoal mb-6">Categories</h1>
      <AdminCategoryManager
        categories={
          categories as {
            _id: string;
            name: string;
            slug: string;
            description?: string;
          }[]
        }
      />
    </div>
  );
}
