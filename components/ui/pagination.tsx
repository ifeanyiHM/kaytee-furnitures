"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "./button";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

interface PaginationProps { page: number; pages: number; total: number }

function PaginationInner({ page, pages, total }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pages <= 1) return null;

  function navigate(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", p.toString());
    router.push(`${pathname}?${params}`);
  }

  const pageNums: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(pages, start + 4);
  for (let i = start; i <= end; i++) pageNums.push(i);

  return (
    <div className="flex items-center justify-between">
      <p className="font-sans text-sm text-charcoal-muted">{total} results</p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate(page - 1)} disabled={page <= 1}>
          <RiArrowLeftLine className="w-4 h-4" />
        </Button>
        {pageNums.map((p) => (
          <Button key={p} variant={p === page ? "primary" : "ghost"} size="sm" onClick={() => navigate(p)}>{p}</Button>
        ))}
        <Button variant="outline" size="sm" onClick={() => navigate(page + 1)} disabled={page >= pages}>
          <RiArrowRightLine className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={null}>
      <PaginationInner {...props} />
    </Suspense>
  );
}
