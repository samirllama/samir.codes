import React from "react";
// import { cn } from '@/lib/utils'

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "light" | "dark";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "light", children, ...props }, ref) => {
    const baseStyles =
      "px-8 py-4 rounded-full font-semibold transition-all duration-300 ease-in-out flex items-center gap-2";

    const variantStyles = {
      light:
        "bg-[var(--color-light)] text-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-[var(--color-light)]",
      dark: "border border-[var(--color-white20)] text-[var(--color-light)] hover:bg-[var(--color-light)] hover:text-[var(--color-dark)] hover:border-[var(--color-light)]",
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

// export default function ExampleComponent() {
//   return (
//     <div>
//       <div className="flex gap-4">
//         <Button variant="primary">
//           View My Work
//           <ArrowRight size={20} />
//         </Button>
//         <Button variant="outline">
//           Download Resume
//         </Button>
//       </div>
//     </div>
//   );
//}
