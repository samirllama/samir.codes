// (auth)/layout.tsx

import RotatingNebula from "@/components/RotatingNebula";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grow">
      {/* Nebula Background Container (Fixed Fullscreen) */}
      {/* <div
        className="fixed inset-0 -z-20 overflow-hidden pointer-events-none opacity-50 md:opacity-60"
        aria-hidden="true"
      > */}
      {/* Content Area */}
      <section>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="absolute inset-0 -z-10 overflow-hidden pointer-events-none -ml-28 -mr-28"
            aria-hidden="true"
          >
            <RotatingNebula
              textureUrl="/textures/nebula-blue-purple.jpg"
              rotationSpeed={0.0008}
              // No className needed here anymore for basic sizing
              // className="w-full h-full" // <--- REMOVED
            />
          </div>
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">{children}</div>
        </div>
      </section>
    </main>
  );
}
