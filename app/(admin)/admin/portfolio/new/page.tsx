import type { Metadata } from "next";
import { AdminPortfolioForm } from "@/components/admin/portfolio-form";

export const metadata: Metadata = { title: "New Portfolio Item — Admin" };

export default function NewPortfolioPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <h1 className="font-display text-3xl text-charcoal mb-6">Add portfolio project</h1>
      <AdminPortfolioForm />
    </div>
  );
}
