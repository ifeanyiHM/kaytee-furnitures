import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") redirect("/");

  return (
    <div className="flex min-h-screen bg-sand-50">
      <AdminSidebar />
      <div className="flex-1 min-w-0 overflow-auto">{children}</div>
    </div>
  );
}
