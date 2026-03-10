import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { StatsSection } from "@/components/stats-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Global Background Elements */}
      <div className="fixed inset-0 -z-20 bg-background" />
      
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
