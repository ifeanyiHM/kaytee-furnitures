import type { Metadata } from "next";
import { adminGetInquiries } from "@/actions/inquiries";
import { formatDate } from "@/lib/utils/format";
import { AdminInquiryActions } from "@/components/admin/inquiry-actions";
import { Pagination } from "@/components/ui/pagination";
import Link from "next/link";

export const metadata: Metadata = { title: "Inquiries — Admin" };

const statusColors: Record<string, string> = {
  UNREAD: "bg-red-100 text-red-700", READ: "bg-blue-100 text-blue-700",
  REPLIED: "bg-green-100 text-green-700", CLOSED: "bg-gray-100 text-gray-600",
};

export default async function AdminInquiriesPage({ searchParams }: { searchParams: Promise<{ page?: string; status?: string }> }) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const { data: inquiries, total, pages } = await adminGetInquiries(page, 20, sp.status).catch(() => ({ data: [], total: 0, pages: 0 }));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-charcoal">Inquiries</h1>
        <p className="font-sans text-sm text-charcoal-muted mt-1">{total} messages</p>
      </div>

      <div className="flex gap-2 mb-6">
        {[undefined, "UNREAD", "READ", "REPLIED", "CLOSED"].map((s) => (
          <Link key={s || "all"} href={s ? `/admin/inquiries?status=${s}` : "/admin/inquiries"}
            className={`px-4 py-1.5 rounded-full font-sans text-sm transition-colors capitalize ${
              sp.status === s || (!sp.status && !s) ? "bg-brand-600 text-white" : "bg-white border border-sand-200 text-charcoal-muted hover:text-charcoal"
            }`}>
            {s ? s.toLowerCase() : "All"}
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {inquiries.map((inquiry) => (
          <div key={inquiry._id} className="bg-white border border-sand-200 rounded-xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-sans font-medium text-charcoal">{inquiry.name}</p>
                <p className="font-sans text-xs text-charcoal-muted">{inquiry.email}{inquiry.phone ? ` · ${inquiry.phone}` : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-charcoal-muted">{formatDate(inquiry.createdAt)}</span>
                <span className={`font-sans text-xs px-2 py-0.5 rounded-full ${statusColors[inquiry.status]}`}>{inquiry.status.toLowerCase()}</span>
              </div>
            </div>
            <p className="font-sans text-sm font-medium text-charcoal mb-1">{inquiry.subject}</p>
            <p className="font-sans text-sm text-charcoal-muted line-clamp-2 mb-3">{inquiry.message}</p>
            {inquiry.adminReply && (
              <div className="bg-brand-50 border border-brand-100 rounded-lg p-3 mb-3">
                <p className="font-sans text-xs text-brand-600 font-medium mb-1">Your reply</p>
                <p className="font-sans text-sm text-charcoal">{inquiry.adminReply}</p>
              </div>
            )}
            <AdminInquiryActions inquiryId={inquiry._id} />
          </div>
        ))}
        {inquiries.length === 0 && <div className="text-center py-12 bg-white border border-sand-200 rounded-xl font-sans text-charcoal-muted">No inquiries found.</div>}
      </div>
      {pages > 1 && <div className="mt-6"><Pagination page={page} pages={pages} total={total} /></div>}
    </div>
  );
}
