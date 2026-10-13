import { HeroBanner } from "@components/home/HeroBanner";
import { AndeanDivider } from "@components/shared/AndeanDivider";
import { FeaturedProducts } from "@components/home/FeaturedProducts";
import { CategoriesGrid } from "@components/home/CategoriesGrid";
import { VirtualTryOnBanner } from "@components/home/VirtualTryOnBanner";
import { Testimonials } from "@components/home/Testimonials";
import { NewsletterBanner } from "@components/home/NewsletterBanner";
import { PromoBanner } from "@components/home/PromoBanner";
import { EditorialVideo } from "@components/home/EditorialVideo";

export default function HomePage() {
  return (
    <>
      <PromoBanner />
      <HeroBanner />
      <EditorialVideo />
      <AndeanDivider />
      <FeaturedProducts />
      <AndeanDivider />
      <CategoriesGrid />
      <AndeanDivider />
      <VirtualTryOnBanner />
      <AndeanDivider />
      <Testimonials />
      <NewsletterBanner />
    </>
  );
}
