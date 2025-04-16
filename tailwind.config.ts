// tailwind.config.ts (samir.codes - Downgraded to v3 style)
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors' // Import default colors for mapping
// Import necessary v3 plugins
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
import containerQueries from '@tailwindcss/container-queries'
// NOTE: tailwindcss-animate is removed for now

const config: Config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx,css}',
        './app/**/*.{js,ts,jsx,tsx,mdx,css}',
    ],
    darkMode: 'class', // Keep using class-based dark mode
    theme: {
        extend: {
            // Color Palette Definition (Mapped to Tailwind v3 defaults) ---
            colors: {
                // Map semantic names to Tailwind scales based on your theme.css values
                primary: colors.purple,    // primary: 168 85 247; -> purple-500 is #a855f7
                secondary: colors.indigo,  // secondary: 99 102 241; -> indigo-500 is #6366f1
                accent: colors.pink, // Changed accent mapping for variety
                gray: colors.slate, // Use slate consistently

                // Basic placeholders - actual colors from CSS vars on body
                background: colors.white,
                foreground: colors.slate[900],

                // Explicitly include needed default colors
                red: colors.red,
                // Add blue, green etc. if used border-blue-500 etc.
            },

            fontFamily: {
                sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui'],
                mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
            },
            position: {
                sticky: 'sticky',
                fixed: 'fixed',
                absolute: 'absolute',
                relative: 'relative',
                static: 'static',
            },
            boxShadow: {
                'clay-dark': `
                  inset 4px 4px 8px rgba(0,0,0,0.3),
                  inset -4px -4px 8px rgba(51, 65, 85, 0.5),
                  5px 5px 10px rgba(0,0,0,0.4),
                  -5px -5px 10px rgba(51, 65, 85, 0.3)`,
            },
            fontSize: {
                'xs': 'clamp(0.8rem, 0.91cqw + 0.6rem, 0.98rem)',
                'sm': 'clamp(0.89rem, 0.95cqw + 0.7rem, 1.13rem)',
                'base': 'clamp(1rem, 1.05cqw + 0.8rem, 1.25rem)',
                // Add lg, xl, etc. if needed
            },
            scrollSnapType: {
                y: 'y mandatory',
            },
            gridTemplateColumns: {
                'scroll-slide': '40fr 5fr 5fr 40fr',
            },
        },
    },
    plugins: [
        aspectRatio,
        containerQueries,
        forms,
        typography({
            className: 'mdx-prose',
        })
    ],
}
export default config
