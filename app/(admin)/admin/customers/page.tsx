import type { Metadata } from "next";
import { getAdminCustomers } from "@/actions/admin";
import { formatDate } from "@/lib/utils/format";
import { Pagination } from "@/components/ui/pagination";

export const metadata: Metadata = { title: "Customers — Admin" };

interface CustomerRow { _id: string; name?: string; email: string; phone?: string; createdAt: string }

export default async function AdminCustomersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const result = await getAdminCustomers(page, 20).catch(() => ({ data: [], total: 0, pages: 0 }));
  const customers = result.data as CustomerRow[];
  const { total, pages } = result;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-charcoal">Customers</h1>
        <p className="font-sans text-sm text-charcoal-muted mt-1">{total} registered customers</p>
      </div>

      <div className="bg-white border border-sand-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-sand-200 bg-sand-50">
            <tr>
              {["Customer", "Email", "Phone", "Joined"].map((h) => (
                <th key={h} className="text-left font-sans text-xs text-charcoal-muted uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {customers.map((c) => (
              <tr key={c._id} className="hover:bg-sand-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="font-display text-xs text-brand-600 font-semibold">{c.name?.[0] || c.email[0].toUpperCase()}</span>
                    </div>
                    <span className="font-sans text-sm font-medium text-charcoal">{c.name || "—"}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-sans text-sm text-charcoal-muted">{c.email}</td>
                <td className="px-4 py-3 font-sans text-sm text-charcoal-muted">{c.phone || "—"}</td>
                <td className="px-4 py-3 font-sans text-sm text-charcoal-muted">{formatDate(c.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && <div className="text-center py-12 font-sans text-charcoal-muted">No customers yet.</div>}
      </div>
      {pages > 1 && <div className="mt-6"><Pagination page={page} pages={pages} total={total} /></div>}
    </div>
  );
}
