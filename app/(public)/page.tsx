import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { getFeaturedPortfolio } from "@/actions/portfolio";
import { getFeaturedProducts } from "@/actions/products";
import { getTestimonials } from "@/actions/admin";
import { StatsSection } from "@/components/home/StatsSection";

export default async function HomePage() {
  const [portfolio, products, testimonials] = await Promise.all([
    getFeaturedPortfolio(6).catch(() => []),
    getFeaturedProducts(8).catch(() => []),
    getTestimonials(true).catch(() => []),
  ]);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <PortfolioPreview items={portfolio} />
      <ProcessSection />
      {/* <FeaturedProducts products={products} /> */}
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection />
    </>
  );
}
