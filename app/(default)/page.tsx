import { HeroSection } from "@/components/hero-pipeline/HeroSection";
import { WhatIBuild } from "@/components/what-i-build/WhatIBuild";
import { Approach } from "@/components/approach/Approach";
import { SystemMap } from "@/components/system-map/SystemMap";
import { SelectedWork } from "@/components/selected-work/SelectedWork";
import { CareerJourney } from "@/components/career-journey/CareerJourney";
import { ContactCta } from "@/components/contact-cta/ContactCta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIBuild />
      <Approach />
      <SystemMap />
      <SelectedWork />
      <CareerJourney />
      <ContactCta />
    </>
  );
}
