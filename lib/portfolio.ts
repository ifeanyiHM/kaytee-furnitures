import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-data";
import type { PaginatedResult, PortfolioItemType } from "@/types";

const categoriesOf = (item: PortfolioItemType): string[] =>
  Array.isArray(item.category)
    ? item.category
    : item.category
      ? [item.category]
      : [];

// Projects are authored in lib/portfolio-data.ts, in display order.
const published = (): PortfolioItemType[] =>
  PORTFOLIO_PROJECTS.filter((p) => p.published !== false);

export function getPortfolioItems({
  category,
  featured,
  page = 1,
  limit = 12,
}: {
  category?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
} = {}): PaginatedResult<PortfolioItemType> {
  let items = published();
  if (category && category !== "All") {
    items = items.filter((p) => categoriesOf(p).includes(category));
  }
  if (featured !== undefined) {
    items = items.filter((p) => Boolean(p.featured) === featured);
  }
  const total = items.length;
  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

export function getPortfolioItemBySlug(
  slug: string,
): PortfolioItemType | undefined {
  return published().find((p) => p.slug === slug);
}

export function getFeaturedPortfolio(limit = 6): PortfolioItemType[] {
  return published()
    .filter((p) => p.featured)
    .slice(0, limit);
}
