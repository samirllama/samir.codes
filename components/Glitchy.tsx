import { FC } from "react";
import ParticlesV3 from "./particles/ParticlesV3";

const Glitchy: FC = () => (
  <div className="relative max-w-6xl mx-auto px-4 sm:px-6 min-h-screen border border-red-500">
    {/* Particles animation */}
    <ParticlesV3
      className="absolute inset-0 -z-10"
      quantity={10}
      staticity={90}
    />
    {/*
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-24 -ml-32">
        <ParticlesV2
          className="absolute inset-0 -z-10"
          quantity={6}
          staticity={30}
        />
      </div> */}
    <div className="pt-32 pb-16 md:pt-52 md:pb-32">
      {/* Hero content */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-6" data-aos="fade-down">
          <p className="glitchy">
            <span aria-hidden="true">Samir</span>
            <span aria-hidden="true">Samir</span>
            Samir
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default Glitchy;
