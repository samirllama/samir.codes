import clsx from "clsx";
import React, { ForwardedRef } from "react";

type SectionProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

const AnimatedSection = React.forwardRef(
  (
    { as: Comp = "section", className, children, ...restProps }: SectionProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    return (
      <Comp
        className={clsx("px-4 first:pt-10 md:px-6", className)}
        ref={ref}
        {...restProps}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
          {children}
        </div>
      </Comp>
    );
  }
);

AnimatedSection.displayName = "AnimatedSection";

export default AnimatedSection;
