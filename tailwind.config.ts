// tailwind.config.ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}', // Keep for potential future use
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    // IMPORTANT: Changed darkMode strategy to 'class' to match next-themes setup in RootLayout
    darkMode: 'class',
    theme: {
        extend: {
            // * Color Integration ---
            colors: {
                // Map core semantic colors from globals.css (:root and .dark)
                background: 'var(--background)', // Handles light/dark via CSS
                foreground: 'var(--foreground)', // Handles light/dark via CSS
                primary: 'var(--primary)',       // #a855f7 (from globals.css)
                secondary: 'var(--secondary)',   // #6366f1 (from globals.css)
                accent: 'var(--accent)',         // #c084fc (from globals.css)

                // Map dark mode specific accents (defined in globals.css .dark / prefers-color-scheme)
                'accent-primary': 'var(--accent-primary)', // hsl(315 60% 82%)
                'accent-secondary': 'var(--accent-secondary)', // hsl(211 63% 83%)

                // Map specific color palettes defined in theme.css
                slate: {
                    200: 'var(--color-slate-200, #e2e8f0)',
                    300: 'var(--color-slate-300, #cbd5e1)',
                    400: 'var(--color-slate-400, #94a3b8)',
                    500: 'var(--color-slate-500, #64748b)',
                    600: 'var(--color-slate-600, #475569)',
                    700: 'var(--color-slate-700, #334155)',
                    800: 'var(--color-slate-800, #1e293b)',
                    900: 'var(--color-slate-900, #0f172a)',
                },
                purple: {
                    200: 'var(--color-purple-200, #e9d5ff)',
                    300: 'var(--color-purple-300, #d8b4fe)',
                    400: 'var(--color-purple-400, #c084fc)', // Same as --accent
                    500: 'var(--color-purple-500, #a855f7)', // Same as --primary
                    600: 'var(--color-purple-600, #9333ea)', // Example fallback if var not defined
                    700: 'var(--color-purple-700, #7e22ce)',
                    800: 'var(--color-purple-800, #6b21a8)',
                    900: 'var(--color-purple-900, #581c87)',
                    950: 'var(--color-purple-950, #3b0764)', // Example fallback
                },

                // Map alpha grays (useful for borders/backgrounds)
                'gray-alpha-100': 'var(--gray-alpha-100)',
                'gray-alpha-200': 'var(--gray-alpha-200)',

                // Map dark theme specific UI colors if needed directly
                'dark-base': 'var(--dark-base, #121212)', // Example mapping
                'dark-elevated': 'var(--dark-elevated, #1A1A1A)', // Example mapping
                'dark-border-subtle': 'var(--dark-border-subtle, #2A2A2A)', // Example mapping
                'dark-border-medium': 'var(--dark-border-medium, #444444)', // Example mapping
            },

            // * Spacing Integration ---
            spacing: {
                // Map calculated spacing scale from theme.css (already in rem)
                xs: 'var(--spacing-xs)',   // 0.5rem (8px)
                sm: 'var(--spacing-sm)',   // 0.75rem (12px)
                md: 'var(--spacing-md)',   // 1rem (16px)
                lg: 'var(--spacing-lg)',   // 1.5rem (24px)
                xl: 'var(--spacing-xl)',   // 2rem (32px)
                '2xl': 'var(--spacing-2xl)', // 3rem (48px)

                // Map specific layout spacers from globals.css
                // Keep original units defined in CSS variables unless refactoring CSS too
                spacer: 'var(--spacer)',     // 40px (or 2.5rem if CSS var is updated)
                'spacer-small': 'var(--spacer-small)', // 20px (or 1.25rem if CSS var is updated)
                wide: 'var(--spacing-wide)', // 2.125rem (34px)
            },

            // * Font Size Integration ---
            fontSize: {
                // Map calculated font size scale from theme.css (already in rem)
                // This replaces the previous Tailwind scale for better consistency
                sm: ['var(--fontSize-sm)', { lineHeight: 'var(--lineHeight-normal)' }], // ~0.98rem
                base: ['var(--fontSize-base)', { lineHeight: 'var(--lineHeight-normal)' }], // 1.125rem (18px)
                md: ['var(--fontSize-md)', { lineHeight: 'var(--lineHeight-normal)' }], // ~1.4rem
                lg: ['var(--fontSize-lg)', { lineHeight: 'var(--lineHeight-tight)' }], // ~1.68rem
                xl: ['var(--fontSize-xl)', { lineHeight: 'var(--lineHeight-tight)' }], // ~2.25rem
                '2xl': ['var(--fontSize-2xl)', { lineHeight: 'var(--lineHeight-tight)' }], // ~2.8rem
                '3xl': ['var(--fontSize-3xl)', { lineHeight: 'var(--lineHeight-tight)' }], // ~3.37rem

                // Optionally map heading variables if direct usage is desired
                h1: ['var(--fontSize-h1)', { lineHeight: 'var(--lineHeight-tight)' }], // ~3.37rem
                h2: ['var(--fontSize-h2)', { lineHeight: 'var(--lineHeight-tight)' }], // ~2.8rem
                h3: ['var(--fontSize-h3)', { lineHeight: 'var(--lineHeight-tight)' }], // ~2.25rem
                h4: ['var(--fontSize-h4)', { lineHeight: 'var(--lineHeight-tight)' }], // ~1.68rem
                h5: ['var(--fontSize-h5)', { lineHeight: 'var(--lineHeight-normal)' }], // ~1.4rem
                h6: ['var(--fontSize-h6)', { lineHeight: 'var(--lineHeight-normal)' }], // 1.125rem
            },

            // * Font Family Integration ---
            fontFamily: {
                // Use variables set in RootLayout
                sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
                // Define body font if explicitly needed (Poppins defined in globals.css)
                body: ['var(--font-body)', 'Poppins', 'system-ui', 'sans-serif'],
            },

            // * Layout Integration ---
            maxWidth: {
                DEFAULT: 'var(--maxWidth)', // 70rem (1120px)
                // Add other max-widths if needed
            },
            height: {
                // Make nav height available as a utility (e.g., h-nav)
                nav: 'var(--nav-height)' // 3.75rem (60px)
            },
            lineHeight: {
                tight: 'var(--lineHeight-tight)', // 1.2
                normal: 'var(--lineHeight-normal)', // 1.75
                relaxed: 'var(--lineHeight-relaxed)', // 1.85
            },

            // * Other Theme Values ---
            boxShadow: {
                // Keep existing custom shadow or map from variables if defined
                mode: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
            },
            fontWeight: {
                // Keep existing or map from variables
                extrabold: '800',
            },
            letterSpacing: {
                // Keep existing scale
                tighter: '-0.02em',
                tight: '-0.01em',
                normal: '0',
                wide: '0.01em',
                wider: '0.02em',
                widest: '0.4em',
            },

            // * REMOVED Animations/Keyframes ---
            // Removed animation and keyframes definitions here.
            // Keep animations defined in animations.css and apply via classes.
            // This avoids conflicts and keeps animation logic centralized there.

            opacity: {
                // Map opacity scale from theme.css
                none: 'var(--opacity-none, 0)',
                low: 'var(--opacity-low, 0.5)',
                medium: 'var(--opacity-medium, 0.8)',
                full: 'var(--opacity-full, 1)',
            },

            blur: {
                // Map blur value from theme.css
                '2xl': 'var(--blur-2xl, 40px)', // Keep original unit from CSS variable
            }
        }
    },
    plugins: [
        forms,
        typography // Keep typography plugin for `.prose` base styles
    ],
} satisfies Config

export default config

/*
Explanation:
> darkMode: 'class': Changed to align with next-themes configuration in app/layout.tsx.

> colors: Mapped --background, --foreground, --primary, --secondary, --accent, dark mode accents, and the full slate and purple palettes using var(--variableName, fallbackValue).

> spacing: Mapped the calculated scale (--spacing-xs to 2xl) and specific layout spacers (wide, spacer, spacer-small).

> fontSize: Kept the granular Tailwind scale but updated base, sm, lg, xl, 2xl, 3xl to use the corresponding CSS variables (--fontSizeBase, --fontSize-sm, etc.) and the --lineHeight-normal variable for the base size.

> fontFamily: Mapped --font-geist-sans, --font-geist-mono, and --font-body.

> lineHeight: Added mapping for --lineHeight-tight, normal, relaxed.

> maxWidth: Set the DEFAULT max-width using --maxWidth.

> Animations/Keyframes Removed: Removed the animation and keyframes sections to rely solely on animations.css, preventing duplication.


*What to do now:
>1 Ensure we have replaced tailwind.config.ts with the new version.
>2 Restart development server (pnpm dev).
>3 Open application in the browser.
>4 Visually inspect: Does the site look largely the same? It should, as the underlying CSS variables haven't changed, and the components are still using their original styling methods (CSS Modules, global CSS).

*Use Dev Tools:
>1 Find an element that should be styled by a variable (e.g., the main page background using --background, a button using --primary).
>2 In the "Styles" or "Computed" tab, check the value being applied. It should match the value from the globals.css/theme.css.
>3 Optionally, find an element where it might have already tried using a Tailwind class (like text-primary). See if that class now correctly applies the style defined by the corresponding CSS variable. If you haven't used any conflicting Tailwind classes yet, this might not yield much info, but the visual check and computed style check are key.
>4 Once you've confirmed that the site looks correct and the computed styles reflect your CSS variables, we can confidently move on to Phase 2: incrementally converting component styles to use Tailwind utilities.

*/


