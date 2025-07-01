import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "light" | "dark";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "light", children, ...props }, ref) => {
    const baseStyles =
      "rounded-full font-semibold transition-all duration-300 ease-in-out flex items-center gap-2";

    const variantStyles = {
      light:
        "px-8 py-4 bg-[var(--color-light)] text-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-[var(--color-light)]",
      dark: "px-8 py-4 border border-[var(--color-white20)] text-[var(--color-light)] hover:bg-[var(--color-light)] hover:text-[var(--color-dark)] hover:border-[var(--color-light)]",
      ghost: "bg-transparent border-none px-2 py-2",
    };

    return (
      <button
        className={cn(baseStyles, variantStyles[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
