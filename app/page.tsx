import dynamic from "next/dynamic";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { FooterSection } from "@/components/landing/footer-section";

const FooterEasterEgg = dynamic(() => import("@/components/landing/footer-easter-egg").then((mod) => mod.FooterEasterEgg));

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection firstVideoTitle={process.env.POR ?? ""} />
      <InfrastructureSection />
      <FooterSection />
      <FooterEasterEgg />
    </main>
  );
}
