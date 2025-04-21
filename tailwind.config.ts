// tailwind.config.ts
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors' // Import default colors for mapping
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
import containerQueries from '@tailwindcss/container-queries'


const config: Config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx,css}',
        './app/**/*.{js,ts,jsx,tsx,mdx,css}',
    ],
    darkMode: 'class', // Using class-based dark mode
    theme: {
        extend: {
            position: {
                sticky: 'sticky',
                fixed: 'fixed',
                absolute: 'absolute',
                relative: 'relative',
                static: 'static',
            },

            colors: {
                primary: colors.violet, // Good range for light/dark accents
                secondary: colors.sky, // Good range for light/dark accents
                accent: colors.fuchsia, // For dark mode neon pink/magenta
                gray: colors.slate, // Use slate consistently for neutral grays

                // Basic placeholders - actual colors come from CSS vars on body/elements
                background: colors.white,
                foreground: colors.slate[900],

                // Explicitly included for errors/warnings
                red: colors.red,

                "mocha-mousse": "var(--color-mocha-mousse)",
                "neutral-lightest": "var(--color-neutral-lightest)",
                "neutral-lighter": "var(--color-neutral-lighter)",
                "neutral-medium": "var(--color-neutral-medium)",
                "neutral-darker": "var(--color-neutral-darker)",
                "neutral-darkest": "var(--color-neutral-darkest)",
                "accent-1": "var(--color-accent-1)", // Map chosen accents
                "accent-2": "var(--color-accent-2)",
                "text-primary": "var(--color-text-primary)",
                "text-secondary": "var(--color-text-secondary)",
                "background-base": "var(--color-background-base)",
                "background-alt": "var(--color-background-alt)",
                "background-mocha": "var(--color-background-mocha)",


                orange: { 100: "#CB8467", 2: "#CF8B6D", 3: "#C88262", 4: "#C67E5E", 5: "#D28E71", 6: "#BF7755" },
                "cyber-green": {
                    '100': "rgb(68, 127, 118)",
                    '200': "rgb(69, 120, 108)",
                    '300': "rgb(56, 132, 120)",
                    '400': "rgb(68, 131, 101)",
                    '500': "rgb(64, 89, 82)",
                    '600': "rgb(74, 177, 19)",
                    '700': "rgb(48, 117, 12)",
                    '800': "rgb(19, 46, 4)",
                }
            },

            //  Font Family (Using CSS Variables) ---
            fontFamily: {
                sans: [
                    "var(--font-geist-sans)",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                ],
                mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
            },

            // Custom Shadows (Using CSS Variables) ---
            boxShadow: {
                "clay-light": `
                          inset 6px 6px 10px 0 rgba(var(--shadow-base-rgb), 0.2),
                          inset -6px -6px 10px 0 rgba(var(--shadow-highlight-rgb), 0.7),
                          10px 10px 20px 0 rgba(var(--shadow-outer-rgb), 0.2),
                          -4px -4px 12px 0 rgba(var(--shadow-highlight-rgb), 0.5)
                        `,
                "clay-dark": `
                          inset 6px 6px 10px 0 rgba(var(--shadow-base-rgb), 0.4),
                          inset -6px -6px 10px 0 rgba(var(--shadow-highlight-rgb), 0.15),
                          10px 10px 20px 0 rgba(var(--shadow-outer-rgb), 0.3),
                          -4px -4px 12px 0 rgba(var(--shadow-highlight-rgb), 0.1)
                        `,
                // Add neon glow shadows for dark mode if desired
                "neon-primary": `0 0 8px rgba(var(--primary-rgb), 0.7), 0 0 12px rgba(var(--primary-rgb), 0.5)`,
                "neon-secondary": `0 0 8px rgba(var(--secondary-rgb), 0.7), 0 0 12px rgba(var(--secondary-rgb), 0.5)`,
                "neon-accent": `0 0 8px rgba(var(--accent-rgb), 0.7), 0 0 12px rgba(var(--accent-rgb), 0.5)`,
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
