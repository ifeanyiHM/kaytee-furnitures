import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { StatsSection } from "@/components/home/stats-section";
import { PortfolioPreview } from "@/components/home/portfolio-preview";
import { ProcessSection } from "@/components/home/process-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/home/cta-section";
import { getFeaturedPortfolio } from "@/actions/portfolio";
import { getFeaturedProducts } from "@/actions/products";
import { getTestimonials } from "@/actions/admin";

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
