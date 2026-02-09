import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AbilisStorySection from "@/components/landing/AbilisStorySection";
import MarketRealitySection from "@/components/landing/MarketRealitySection";
import GeoSection from "@/components/landing/GeoSection";
import ScrollProgress from "@/components/landing/ScrollProgress";

const Index = () => {
  const [activeChapterId, setActiveChapterId] = useState<string | undefined>(undefined);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <div>
        <HeroSection />
        <AbilisStorySection />
        <MarketRealitySection />
        <GeoSection onActiveChapterChange={setActiveChapterId} />
      </div>
    </main>
  );
};

export default Index;
