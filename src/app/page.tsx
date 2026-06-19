import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import {
  AboutSection,
  BentoSection,
  ContactSection,
  Footer,
  PackagesSection,
  ReviewsSection,
} from "@/components/sectioins";
import ProgramsSection from "@/components/sections/programmSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      {/* <CoachProfileSection />
      <InstagramFeedSection /> */}
      <BentoSection />
      <PackagesSection />
      <ProgramsSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
