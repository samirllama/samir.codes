import ParallaxFooterLayout from "@/components/ui/ParallaxFooterLayout";

// This page remains a Server Component. It passes its content
// to the client-side layout component that handles the animation.
export default function PlaygroundPage() {
  return (
    <ParallaxFooterLayout>
      {/* This is the main content for the playground page */}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold">Playground</h1>
          <p>Scroll down to see the parallax footer reveal effect.</p>
        </div>

        {/* Add enough content to make the page scrollable */}
        <div className="h-screen"></div>
        <div className="h-screen"></div>

        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Docs{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </p>
          </a>
        </div>
      </main>
    </ParallaxFooterLayout>
  );
}

