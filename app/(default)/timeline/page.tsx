// app/changelog/page.tsx (Example)

import type { Metadata } from "next";

import { slides } from "@/components/slider/slideData";
import SlideSection from "../../../components/slider/SlideSection";

export const metadata: Metadata = {
  title: "About - Samir.Codes",
  description: "About Samir and his experience.",
};

export default async function SliderPager() {
  return (
    <>
      {/* <div className="w-full overflow-x-hidden"></div> */}
      <div className="w-full overflow-x-hidden">
        {slides.map((slide) => (
          <SlideSection key={slide.id} slide={slide} />
        ))}
      </div>
    </>
  );
}
