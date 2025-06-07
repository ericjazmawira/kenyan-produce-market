
import { HeroSection } from "@/components/home/HeroSection";
import { PlatformStats } from "@/components/home/PlatformStats";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeatureCards } from "@/components/home/FeatureCards";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustSignals } from "@/components/home/TrustSignals";
import { QuickAccess } from "@/components/home/QuickAccess";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <HeroSection />
      <PlatformStats />
      <HowItWorks />
      <FeatureCards />
      <Testimonials />
      <TrustSignals />
      <QuickAccess />
      <Footer />
    </div>
  );
};

export default Index;
