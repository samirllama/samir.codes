import Link from "next/link";
import type { Route } from "next";

const NAV_ITEMS = ["Tag", "View", "Behavior"] as const;

export default function WelcomeLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-peach via-[#fcf4f1] to-custom-peach">
      <header className="flex items-center justify-between px-4 py-4 md:px-8 md:py-6">
        <h1 className="text-2xl font-medium text-gray-700">Welcome Home</h1>

        <nav className="flex space-x-4 md:space-x-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}` as Route}
              role="navigation"
              aria-label={`Navigate to ${item}`}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {item}
            </Link>
          ))}
        </nav>
      </header>

      <main>{/* Page Content */}</main>
    </div>
  );
}
/*

1. Add subtle gradient:
<div className="min-h-screen bg-gradient-to-br from-custom-peach via-[#fcf4f1] to-custom-peach">

2. To use the lighting effect:

<div className="relative bg-custom-peach overflow-hidden">
  <div className="absolute inset-0 bg-lighting" />
  [Content here]
</div>

? 1. Gradient Background Version: <div className="min-h-screen bg-gradient-to-br from-custom-peach via-[#fcf4f1] to-custom-peach">

This version directly applies the background gradient to the main container. No special positioning is needed because we're only dealing with a simple background gradient.

? 2. Lighting Effect Version: <div className="relative bg-custom-peach overflow-hidden">

This version needs three key properties:
> relative: Creates positioning context for the absolute pseudo-element
> overflow-hidden: Clips the lighting effect at container boundaries
> Solid background (bg-custom-peach): Serves as base color for the lighting effect to overlay

Why they can't be directly combined:

The gradient background and lighting effect both use background properties that would conflict if applied to the same element

The lighting effect requires a positioned parent to contain the absolute pseudo-element

overflow-hidden is critical to prevent the lighting effect from leaking outside the container

*Solution: if we want both gradient AND lighting:

<div className="relative min-h-screen bg-gradient-to-br from-custom-peach via-[#fcf4f1] to-custom-peach overflow-hidden">
  <div className="absolute inset-0 bg-lighting" />
    [Content here]
  </div>

  Here we:
  1. Keep the gradient on the main container
  2. Add relative and overflow-hidden
  3. Place the lighting effect as a child absolute div

  Key Takeaways:

  1. Use the first structure for pure gradient backgrounds
  2. Use the second structure when implementing overlay effects (like lighting)
  3. Combine both approaches when needing gradient + overlay effects
  4. The positioning context (relative) and containment (overflow-hidden) are essential for proper effect containment

*/
