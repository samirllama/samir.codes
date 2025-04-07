// app/galactic/page.tsx
import Link from "next/link";

export default function GalacticPage() {
  return (
    <div className="text-center backdrop-blur-sm bg-black/30 p-8 rounded-lg shadow-xl">
      <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse">
        Welcome to the Galactic View
      </h1>
      <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
        This page demonstrates the layered, animated background effect, creating
        an atmospheric space theme. Replace this content with your interactive
        map or other elements.
      </p>
      <div className="space-x-4">
        <Link
          href="/"
          className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go Home
        </Link>
        <button
          type="button"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Explore (Placeholder)
        </button>
      </div>
    </div>
  );
}
