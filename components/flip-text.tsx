import { FC } from "react";

const FlipText: FC = () => (
  <section className="pb-[20vw] lg:pb-[12.5vw]">
    <ul role="list" className="uppercase border-t border-white/30">
      <li className="block">
        <span className="border-b border-white/30 w-full py-2 lg:py-1 block lg:flex lg:items-end">
          <span className="leading-[1.275] block text-[clamp(18px,0.92rem+1.15vw,34px)] tracking-tight mb-1 lg:mb-0 relative overflow-hidden">
            <span className="quick-flip block">
              <span className="block ms-text-adjust ">British Petroleum</span>
            </span>
          </span>
        </span>
      </li>
    </ul>
  </section>
);

export default FlipText;
