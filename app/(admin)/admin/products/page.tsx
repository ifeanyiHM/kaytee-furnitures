import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProducts, getCategories } from "@/actions/products";
import { formatCurrency } from "@/lib/utils/format";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { AdminProductActions } from "@/components/admin/product-actions";
import { RiAddLine } from "react-icons/ri";

export const metadata: Metadata = { title: "Products — Admin" };

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ page?: string; status?: string }> }) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const status = sp.status || "ACTIVE";

  const [{ data: products, total, pages }] = await Promise.all([
    getProducts({ status, page, limit: 20 }).catch(() => ({ data: [], total: 0, pages: 0 })),
  ]);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Products</h1>
          <p className="font-sans text-sm text-charcoal-muted mt-1">{total} products</p>
        </div>
        <Link href="/admin/products/new"><Button><RiAddLine className="w-4 h-4" />Add product</Button></Link>
      </div>

      <div className="flex gap-2 mb-6">
        {["ACTIVE", "DRAFT", "ARCHIVED"].map((s) => (
          <Link key={s} href={`/admin/products?status=${s}`}
            className={`px-4 py-1.5 rounded-full font-sans text-sm transition-colors capitalize ${status === s ? "bg-brand-600 text-white" : "bg-white border border-sand-200 text-charcoal-muted hover:text-charcoal"}`}>
            {s.toLowerCase()}
          </Link>
        ))}
      </div>

      <div className="bg-white border border-sand-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-sand-200 bg-sand-50">
            <tr>
              <th className="text-left font-sans text-xs text-charcoal-muted uppercase tracking-wider px-4 py-3">Product</th>
              <th className="text-left font-sans text-xs text-charcoal-muted uppercase tracking-wider px-4 py-3 hidden md:table-cell">Price</th>
              <th className="text-left font-sans text-xs text-charcoal-muted uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Stock</th>
              <th className="text-right font-sans text-xs text-charcoal-muted uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-sand-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded overflow-hidden bg-sand-100 shrink-0">
                      <Image src={product.images?.[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&q=60"} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium text-charcoal line-clamp-1">{product.name}</p>
                      <p className="font-sans text-xs text-charcoal-muted">{product.sku || "No SKU"}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell font-sans text-sm text-charcoal">{formatCurrency(product.price)}</td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className={`font-sans text-xs px-2 py-0.5 rounded-full ${product.stock === 0 ? "bg-red-100 text-red-700" : product.stock <= 5 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                    {product.stock} in stock
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <AdminProductActions productId={product._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center py-12 font-sans text-charcoal-muted">No products found.</div>
        )}
      </div>
      {pages > 1 && <div className="mt-6"><Pagination page={page} pages={pages} total={total} /></div>}
    </div>
  );
}
