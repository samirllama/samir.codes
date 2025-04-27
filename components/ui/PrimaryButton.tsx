// components/ui/PrimaryButton.tsx
import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-md font-semibold transition duration-300 ease-in-out";
  const colorStyles =
    "bg-mocha-mousse text-neutral-lightest hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-mocha-mousse focus:ring-opacity-50";
  // Consider adding subtle shadow: shadow-md hover:shadow-lg

  const mergedClasses = twMerge(clsx(baseStyles, colorStyles, className));

  return (
    <button className={mergedClasses} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;
