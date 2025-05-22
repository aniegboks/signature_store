import ProductView from "@/components/ui/products_view";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getActiveBanner } from "@/sanity/lib/banner/getActiveBanner";
import { getAllPopularProducts } from "@/sanity/lib/products/getAllPopularProducts";
import { getFeaturedCategories } from "@/sanity/lib/products/getFeaturedCategories";
import { getAllTestimonials } from "@/sanity/lib/testimonials/getAllTestimonials";
import { getFaq } from "@/sanity/lib/faq/getFaq";

import BlackFridayBanner from "@/components/ui/black_friday_banner";
import BannerSection from "@/components/banner";
import PopularGrid from "@/components/ui/popular_grid";
import Categories from "@/components/ui/categories";
import FeaturedProducts from "@/components/ui/fratured_products";
import About from "@/components/ui/about";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import Testimonials from "@/components/testimonials";
import FeaturesSection from "@/components/features_section";

export const dynamic = "force-static"
export const revalidate = 60;

const Home = async () => {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const banner = await getActiveBanner();
  const popularProducts = await getAllPopularProducts();
  const featuredCategories = await getFeaturedCategories();
  const faq = await getFaq()
  const testimonials = await getAllTestimonials()


  // Uncomment this for debugging:
  // console.log(
  //   crypto.randomUUID().slice(0, 5) +
  //   ` >>> Rendered the home page cache with ${products.length} products and ${categories.length} categories`
  // );

  return (
    <div>
      {/**      <BlackFridayBanner />
      <ProductView products={products} categories={categories} /> */}
      <BannerSection banner={banner} />
      <About />
      <FeaturesSection />
      <PopularGrid popularProducts={popularProducts} />
      <Categories featuredCategories={featuredCategories} />
      <Faq allFaq={faq} />
      <Cta />
      <Testimonials testimonials={testimonials} />

    </div>
  );
};

export default Home;
