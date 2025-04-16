// components/PostItem.tsx (for Project 1)

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { PostMeta } from '@/lib/posts'; // Import your PostMeta interface
import { Route } from 'next';

// Assuming a PostDate component exists or you format date directly
// import PostDate from '@/components/PostDate'; // Example path

// Extend PostMeta if image or other specific fields are needed for the item
interface PostItemProps extends PostMeta {
  image?: string | StaticImageData; // Optional image prop
  baseUrl: string; // Base URL for the link (e.g., '/playbook', '/changelog')
}

export default function PostItem({
  slug,
  title,
  date,
  description,
  author, // Optional author from PostMeta
  tags, // Optional tags from PostMeta
  image, // Optional image prop
  baseUrl, // Base URL for links
}: PostItemProps) {

  const postUrl = `${baseUrl}/${slug}` as Route;

  return (
    // Mimic the article structure and group styling from Project 2
    <article className="pt-12 first-of-type:pt-0 group">
      <div className="md:flex md:gap-6 lg:gap-8"> {/* Use gap for spacing */}

        {/* Date Section (Left Column) */}
        <div className="w-full md:w-48 md:shrink-0 mb-4 md:mb-0">
          {/* Mimic the styled time element */}
          <time className="text-sm inline-flex items-center md:block md:leading-8 mb-3">
            {/* Decorative line/dot element */}
            <span className="absolute h-full top-0 left-[2px] w-0.5 bg-slate-800 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_150px,theme(colors.white))] -z-10" aria-hidden="true"></span>
            <span className="relative inline-flex items-center"> {/* Wrapper for dot+date */}
              <span className="absolute left-[-2.125rem] md:left-[-2.375rem] transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-primary/30" aria-hidden="true"></span>
              {/* Format the date */}
              <span className="ml-[-1.625rem] md:ml-0 md:pl-5 text-slate-400">
                {new Date(date).toLocaleDateString("en-US", {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
                {/* Optional: Add PostDate component if you have one */}
                {/* <PostDate dateString={date} /> */}
              </span>
            </span>
          </time>
          {/* Optional: Author under date */}
          {author && (
             <div className="text-xs text-slate-500 md:pl-5">by {author}</div>
          )}
        </div>

        {/* Content Section (Right Column) */}
        <div className="grow pb-12 group-last-of-type:pb-0 border-b border-slate-800 group-last-of-type:border-none">
          {/* Optional Image */}
          {image && (
             <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-xl md:rounded-2xl p-px mb-6">
               <Link href={postUrl}>
                 <Image
                   className="w-full rounded-[inherit] aspect-video object-cover" // Maintain aspect ratio
                   src={image}
                   width={574} // Adjust default width/height as needed
                   height={326}
                   alt={title}
                 />
               </Link>
             </figure>
          )}

          {/* Header with Title */}
          <header>
            <Link href={postUrl}>
              <h2 className="h3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-2 hover:text-slate-200 transition-colors">
                {title}
              </h2>
            </Link>
          </header>

          {/* Tags */}
           {tags && tags.length > 0 && (
             <div className="flex flex-wrap gap-2 my-3">
               {tags.map((tag) => (
                 <span
                   key={tag}
                   className="inline-block text-xs font-medium rounded-full px-2.5 py-0.5 bg-slate-700/50 text-primary"
                 >
                   {tag}
                 </span>
               ))}
             </div>
           )}

          {/* Description (Excerpt) */}
          <p className="text-slate-400 leading-relaxed mb-4">
            {description}
          </p>

          {/* Read More Link */}
          <Link
            href={postUrl}
            className="inline-flex items-center font-medium text-primary hover:text-secondary transition-colors duration-150 ease-in-out group/link" // Use different group name if needed
          >
            <span>Read more</span>
            <span className="tracking-normal text-primary group-hover/link:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
              ->
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
