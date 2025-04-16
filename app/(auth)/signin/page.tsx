
import Link from 'next/link';
import Image from "next/image"
import AuthLogo from '@/public/logo.svg';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Sign In - Samir.Codes', // Updated title
  description: 'Sign in to your account',
};

export default function SignIn() {
  return (
    <>
      {/* Page header (Keep as is for now) */}
      <div className="max-w-3xl mx-auto text-center pb-12">
      <Image
        className="max-w-none"
        src={AuthLogo}
        width={38}
        height={38}
        priority
        alt="logo"
      />
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Sign in to your account
        </h1>
      </div>

      {/* --- Form Container: Apply Claymorphism --- */}
      <div
        className={
          // Base layout & sizing
          "max-w-1/2 mx-auto " +
          // Claymorphism styles
          "bg-slate-800/80 " + // Slightly transparent base to interact with nebula? Or solid bg-slate-800
          "rounded-3xl " +     // Generous rounding
          "p-6 sm:p-8 " +      // Padding inside the container
          "shadow-clay-dark-soft " + // Apply the custom shadow
          "backdrop-blur-sm"     // Optional: Add blur if using transparent bg
        }
      >
        {/* Form content goes here - Keep existing form for now */}
        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="email">Email</label>
              {/* Input styling will be addressed next */}
              <input id="email" className="form-input w-full" type="email" required />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="password">Password</label>
                <Link className="text-sm font-medium text-primary hover:text-purple-400 transition duration-150 ease-in-out ml-2" href="/reset-password">Forgot?</Link>
              </div>
              {/* Input styling will be addressed next */}
              <input id="password" className="form-input w-full" type="password" autoComplete="on" required />
            </div>
          </div>
          <div className="mt-6">
            {/* Button styling will be addressed next */}
            <button className="btn text-sm text-white bg-primary hover:bg-purple-700 w-full shadow-sm group">
              Sign In <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-></span>
            </button>
          </div>
        </form>

        {/* Footer links inside the container */}
        <div className="text-center mt-6"> {/* Increased margin slightly */}
          <div className="text-sm text-slate-400">
            Don't have an account? <Link className="font-medium text-primary hover:text-purple-400 transition duration-150 ease-in-out" href="/signup">Sign up</Link>
          </div>
        </div>

        {/* Divider (Keep as is for now) */}
        <div className="flex items-center my-6">
          <div className="border-t border-slate-700 grow mr-3" aria-hidden="true" /> {/* Adjusted color slightly */}
          <div className="text-sm text-slate-500 italic">or</div>
          <div className="border-t border-slate-700 grow ml-3" aria-hidden="true" /> {/* Adjusted color slightly */}
        </div>

   {/* Social login */}
   <div className="flex space-x-3">
          {/* Twitter Button */}
          <button
            className={cn( "btn-sm",  "w-full h-9",               "relative group","border",
              // Use CSS Variables for colors in the gradient border
              "border-transparent", // Make base border transparent
              "bg-slate-900", // Set the background color directly
              "bg-clip-padding", // Clip background to padding box (padding-box keyword)
              // Apply the conic gradient border using background-image on the border itself
              // This requires careful layering or pseudo-elements usually.
              // A simpler approach is a pseudo-element overlay:
              "before:absolute before:inset-[-1px] before:-z-10", // Position pseudo-element slightly outside, behind
              "before:rounded-full", // Match button rounding
              "before:bg-[conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)]", // Conic gradient on pseudo-element
              // Original hover/text styles
              "text-slate-300 hover:text-white transition duration-150 ease-in-out"
              // Removed the complex arbitrary [background:...]
              // Removed the second before pseudo-element for the overlay as bg-slate-900 handles it
            )}
          >
            <span className="relative z-10"> {/* Ensure icon is above background */}
              <span className="sr-only">Continue with Twitter</span>
              {/* Twitter SVG */}
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="14" height="12">
                 <path d="m4.34 0 2.995 3.836L10.801 0h2.103L8.311 5.084 13.714 12H9.482L6.169 7.806 2.375 12H.271l4.915-5.436L0 0h4.34Zm-.635 1.155H2.457l7.607 9.627h1.165L3.705 1.155Z" />
              </svg>
            </span>
          </button>

          {/* GitHub Button - Apply the same refactored classes */}
          <button
             className={cn(
              "btn-sm",
              "w-full h-9",
              "relative group",
              "border border-transparent",
              "bg-slate-900 bg-clip-padding",
              "before:absolute before:inset-[-1px] before:-z-10",
              "before:rounded-full",
              "before:bg-[conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)]",
              "text-slate-300 hover:text-white transition duration-150 ease-in-out"
            )}
          >
            <span className="relative z-10">
              <span className="sr-only">Continue with GitHub</span>
              {/* GitHub SVG */}
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="15">
                 <path d="M7.488 0C3.37 0 0 3.37 0 7.488c0 3.276 2.153 6.084 5.148 7.113.374.094.468-.187.468-.374v-1.31c-2.06.467-2.527-.936-2.527-.936-.375-.843-.843-1.124-.843-1.124-.655-.468.094-.468.094-.468.749.094 1.123.75 1.123.75.655 1.216 1.778.842 2.153.654.093-.468.28-.842.468-1.03-1.685-.186-3.37-.842-3.37-3.743 0-.843.281-1.498.75-1.966-.094-.187-.375-.936.093-1.965 0 0 .655-.187 2.059.749a6.035 6.035 0 0 1 1.872-.281c.655 0 1.31.093 1.872.28 1.404-.935 2.059-.748 2.059-.748.374 1.03.187 1.778.094 1.965.468.562.748 1.217.748 1.966 0 2.901-1.778 3.463-3.463 3.65.281.375.562.843.562 1.498v2.059c0 .187.093.468.561.374 2.996-1.03 5.148-3.837 5.148-7.113C14.976 3.37 11.606 0 7.488 0Z" />
               </svg>
            </span>
          </button>
        </div>
      </div>
      {/* --- End Form Container --- */}
    </>
  );
}
