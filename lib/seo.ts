import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/utils/constants";
import type { PortfolioItemType } from "@/types";

/** Site origin without a trailing slash. */
export const BASE_URL = SITE_URL.replace(/\/+$/, "");

/** Turns a site-relative path or absolute URL into an absolute URL. */
export const absoluteUrl = (path: string): string =>
  /^https?:\/\//i.test(path)
    ? path
    : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/kayteefurnitureandinteriors",
  "https://www.tiktok.com/@kayteefurnitureinteriors",
];

/** Organisation + local business entity — shown in the root layout. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": `${BASE_URL}/#organization`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: BASE_URL,
  logo: absoluteUrl("/icon.png"),
  image: absoluteUrl("/og-image.jpg"),
  telephone: "+2348079197554",
  email: "kayteefurnitureandinterior@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "22 Oremerin, Itire, Surulere",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  areaServed: { "@type": "Country", name: "Nigeria" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: SOCIAL_PROFILES,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: SITE_NAME,
  url: BASE_URL,
  inLanguage: "en-NG",
  publisher: { "@id": `${BASE_URL}/#organization` },
};

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Absolute URLs of a project's still images (videos are skipped). */
export function projectImageUrls(item: PortfolioItemType, max = 6): string[] {
  const files = [...(item.media?.after ?? []), ...(item.media?.before ?? [])];
  return files
    .filter((f) => f.type === "image" && f.src)
    .slice(0, max)
    .map((f) => absoluteUrl(f.src));
}

export function projectJsonLd(item: PortfolioItemType) {
  const images = projectImageUrls(item);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.description,
    url: absoluteUrl(`/portfolio/${item.slug}`),
    ...(images.length ? { image: images } : {}),
    ...(item.year ? { dateCreated: String(item.year) } : {}),
    ...(item.location
      ? { locationCreated: { "@type": "Place", name: item.location } }
      : {}),
    keywords: item.tags?.join(", "),
    creator: { "@id": `${BASE_URL}/#organization` },
  };
}
