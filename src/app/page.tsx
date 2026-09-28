import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { HeroSection } from "@/components/HeroSection";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { Navbar } from "@/components/Navbar";
import { TrustMetricsBar } from "@/components/TrustMetricsBar";
import {
  AboutSection,
  BentoSection,
  ContactSection,
  FAQSection,
  FemaleFitnessSection,
  Footer,
  OutletLocationsSection,
  PackagesSection,
  ReviewsSection,
} from "@/components/sectioins";
import ProgramsSection from "@/components/sections/programmSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustMetricsBar />
      <FemaleFitnessSection />
      <AboutSection />
      <BentoSection />
      <OutletLocationsSection />
      <PackagesSection />
      <ProgramsSection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      {/* Bottom spacer for mobile sticky bar */}
      <div className="lg:hidden h-14" />
      <MobileBottomBar />
      <FloatingWhatsApp />
    </>
  );
}
