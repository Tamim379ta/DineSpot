import BlogSection from "@/components/home/BlogSection";
import CuisineSection from "@/components/home/CuisineSection";
import HeroSection from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import StatsSection from "@/components/home/StatsSection";
import Testimonials from "@/components/home/Testimonials";
import TopRestaurants from "@/components/home/TopRestaurants";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CuisineSection />
      <TopRestaurants />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <Newsletter />
      <BlogSection />
    </main>
  );
}