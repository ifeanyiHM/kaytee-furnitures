import type { MetadataRoute } from "next";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-data";
import { BASE_URL, projectImageUrls } from "@/lib/seo";

// /services/[slug] only redirects to /services, so it is intentionally left out.
const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.7 },
  { path: "/consultation", changeFrequency: "yearly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${BASE_URL}${path === "/" ? "" : path}`,
      changeFrequency,
      priority,
    }),
  );

  const projectEntries = PORTFOLIO_PROJECTS.filter(
    (p) => p.published !== false,
  ).map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: p.featured ? 0.8 : 0.6,
    images: projectImageUrls(p, 10),
  }));

  return [...staticEntries, ...projectEntries];
}
