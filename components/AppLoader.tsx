import React from "react";

interface AppLoaderProps {
  active: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({ active }) => {
  return (
    <div
      className={`
      top-0 left-0 fixed w-fit h-screen z-[100] pointer-events-none
      ${active ? "is-ready is-active" : ""}
    `}
    >
      <div className="h-screen">
        <div
          className={`absolute top-0 left-0 w-fit h-fit bg-black transition-opacity duration-[500ms] ease-out delay-[400ms] ${
            active ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        <div
          className={`
          absolute top-0 left-0 w-full h-full bg-white transform
          transition-all duration-[1300ms] ease-out
          ${active ? "translate-y-0" : "-translate-y-full"}
        `}
        ></div>
      </div>
    </div>
  );
};

export default AppLoader;
