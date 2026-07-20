"use client";
import { useRouter } from "next/navigation";
import { deletePortfolioItem, updatePortfolioItem } from "@/actions/portfolio";
import { RiDeleteBinLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export function AdminPortfolioActions({ itemId, published }: { itemId: string; published: boolean }) {
  const router = useRouter();

  async function togglePublish() {
    await updatePortfolioItem(itemId, { published: !published } as Parameters<typeof updatePortfolioItem>[1]);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this portfolio item?")) return;
    await deletePortfolioItem(itemId);
    router.refresh();
  }

  return (
    <>
      <button onClick={togglePublish} className="p-2 bg-white/90 rounded-full text-charcoal hover:text-brand-600 transition-colors">
        {published ? <RiEyeOffLine className="w-4 h-4" /> : <RiEyeLine className="w-4 h-4" />}
      </button>
      <button onClick={handleDelete} className="p-2 bg-white/90 rounded-full text-charcoal hover:text-red-500 transition-colors">
        <RiDeleteBinLine className="w-4 h-4" />
      </button>
    </>
  );
}
