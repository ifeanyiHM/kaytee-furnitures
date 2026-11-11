import { getTestimonials } from "@/actions/admin";
import { getFeaturedPortfolio } from "@/actions/portfolio";
import { getFeaturedProducts } from "@/actions/products";
import { HeroSection } from "@/components/home/HeroSection";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: {
    absolute:
      "Kaytee Furnitures & Interior — Bespoke furniture and interior design, Lagos",
  },
  alternates: { canonical: "/" },
};

export const revalidate = 600;

export default async function HomePage() {
  const [portfolio, products, testimonials] = await Promise.all([
    getFeaturedPortfolio(6).catch(() => []),
    getFeaturedProducts(8).catch(() => []),
    getTestimonials(true).catch(() => []),
  ]);

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
      {/* <FeaturedProducts products={products} /> */}
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}
