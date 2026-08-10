import React from "react";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import SmartAlerts from "@/components/home/SmartAlerts";
import BandPreview from "@/components/home/BandPreview";
import ExplorePreview from "@/components/home/ExplorePreview";
import AIPipeline from "@/components/home/AIPipeline";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SmartAlerts />
      <BandPreview />
      <ExplorePreview />
      <AIPipeline />
    </>
  );
}