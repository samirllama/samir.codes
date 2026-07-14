import { HeroSection } from "@/components/hero-pipeline/HeroSection";
import { WhatIBuild } from "@/components/what-i-build/WhatIBuild";
import { SystemMap } from "@/components/system-map/SystemMap";
import { SelectedWork } from "@/components/selected-work/SelectedWork";
import { CareerJourney } from "@/components/career-journey/CareerJourney";
import { ContactCta } from "@/components/contact-cta/ContactCta";
import styles from "./Layout.module.css";

export default function HomePage() {
  return (
    <>
      {/* Curtain layer: the narrative scrolls as one opaque sheet that lifts to
          reveal the pinned ContactCta beat beneath it (see .curtain / ContactCta
          .section sticky in the module CSS). */}
      <div className={styles.curtain}>
        <HeroSection />
        <WhatIBuild />
        <SelectedWork />
        <CareerJourney />
      </div>
      <ContactCta />
    </>
  );
}
