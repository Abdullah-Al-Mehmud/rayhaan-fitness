import { HeroSection } from "@/components/HeroSection";
import {
  AboutSection,
  BentoSection,
  ContactSection,
  Footer,
  PackagesSection,
  ReviewsSection,
} from "@/components/sectioins";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <BentoSection />
      <PackagesSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
