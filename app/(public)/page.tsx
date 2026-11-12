import { getFeaturedPortfolio } from "@/lib/portfolio";
import { HeroSection } from "@/components/home/HeroSection";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Kaytee Furnitures & Interior — Interior Design Studio in Lagos",
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const portfolio = getFeaturedPortfolio(6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Kaytee Furnitures & Interior",
    description:
      "A Lagos-based interior design studio creating thoughtful, considered spaces.",
    url: "https://www.kayteefurnitures.com",
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
