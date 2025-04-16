// app/changelog/page.tsx (Example)

import type { Metadata } from "next";
import Image from 'next/image';
import Illustration from "@/public/page-illustration.svg";
import Particles from '@/components/particles/Particles';
import PostItem from '@/components/PostItem';
import { getAllPostsMeta } from '@/lib/posts';

export const metadata: Metadata = {
  title: "About - Samir.Codes",
  description: "About Samir and his experience.",
};

export default async function AboutPage() {
  // Fetch posts using your function (modify if needed for 'About' dir)
  const posts = getAllPostsMeta();

  return (
    <>
      <section className="relative">
        {/* Backgrounds (Keep or adapt from Project 2) */}
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square" aria-hidden="true">
          <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-30"></div>
          <div className="absolute w-64 h-64 translate-z-0 bg-purple-400 rounded-full blur-[80px] opacity-70"></div>
        </div>
        {/* Use your Particles component */}
        <Particles className="absolute inset-0 h-96 -z-10" quantity={15} />
        <div className="md:block absolute left-1/2 -translate-x-1/2 -mt-16 blur-2xl opacity-90 pointer-events-none -z-10" aria-hidden="true">
          <Image src={Illustration} className="max-w-none" width={1440} height={427} alt="Page Illustration" />
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="text-center pb-12 md:pb-20">
              <h1 className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
                Changelog {/* Updated Title */}
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-slate-400">
                  New updates and improvements to the site and projects. {/* Updated Subtitle */}
                </p>
              </div>
            </div>

            {/* Post List */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Decorative timeline line (Adapted from Project 2) */}
                {/* Note: The animate-shine likely needs keyframes defined globally */}
                {/* <div className="absolute h-full top-4 left-[2px] w-0.5 bg-slate-800 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_150px,theme(colors.white))] -z-10 overflow-hidden after:absolute after:h-4 after:top-0 after:-translate-y-full after:left-0 after:w-0.5 after:bg-[linear-gradient(180deg,_transparent,_theme(colors.purple.500/.65)_25%,_theme(colors.purple.200)_50%,_theme(colors.purple.500/.65)_75%,_transparent)] after:animate-shine" aria-hidden="true"></div> */}

                {/* Render Post Items */}
                {posts.length === 0 ? (
                   <p className="text-center text-slate-400">No changelog entries yet.</p>
                ) : (
                   posts.map((post) => (
                     <PostItem
                       key={post.slug}
                       baseUrl="/changelog" // Or "/playbook" depending on context
                       {...post}
                       // Pass an image prop if your PostMeta includes it or you fetch it
                       // image={post.image}
                     />
                   ))
                )}
              </div>
            </div>

            {/* Optional Pagination */}
            {/* ... */}

          </div>
        </div>
      </section>
      {/* Optional CTA */}
      {/* <Cta /> */}
    </>
  );
}
