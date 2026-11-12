import { getFeaturedPortfolio } from "@/lib/portfolio";
import { HeroSection } from "@/components/home/HeroSection";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: {
    absolute:
      "Kaytee Furnitures & Interior — Bespoke furniture and interior design, Lagos",
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const portfolio = getFeaturedPortfolio(6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Kaytee Furnitures & Interior",
    description:
      "Bespoke furniture and interior design studio in Lagos, Nigeria.",
    url: "https://kaytee-furnitures.vercel.app",
    telephone: "+234 807 919 7554",
    address: {
      "@type": "PostalAddress",
      streetAddress: "22 Oremerin, Itire, Surulere",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <PortfolioPreview items={portfolio} />
      <ProcessSection />
    </>
  );
}
