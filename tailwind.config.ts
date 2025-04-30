// tailwind.config.ts
import type { Config } from 'tailwindcss'
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
            backgroundImage: {
                'hdr-gradient':
                    'radial-gradient(farthest-corner circle at 100% 0% in oklab, oklch(35% 0.09 136) 30% 49%, oklch(36% 0.18 312 / 0%) 100% 50%)',
            },
            position: {
                sticky: 'sticky',
                fixed: 'fixed',
                absolute: 'absolute',
                relative: 'relative',
                static: 'static',
            },

            colors: {
                'custom-peach': '#f7e8e1',
                'surface-page': 'var(--color-surface-page)',
                'surface-card': 'var(--color-surface-card)',
                'text-default': 'var(--color-text-default)',
                header: 'var(--color-header)',
                'text-secondary': 'var(--color-text-secondary)',
                'interactive-primary': 'var(--color-interactive-primary)',
                'interactive-secondary': 'var(--color-interactive-secondary)',
                'border-default': 'var(--color-border-default)',
                'button-text': 'var(--color-button-text)',
                'interactive-text': 'var(--color-interactive-text)',
                accent: 'var(--color-accent)',
                "accent-secondary": 'var(--color-accent-secondary)',
                'light-grey': 'rgb(var(--color-light-grey-rgb))',
                'galactic-base': 'rgb(var(--color-galactic-base-rgb))',
                'moth-terracotta': '#924622',
                'moth-orange': 'var(--color_moth-orange)',
                'neon-primary': 'var(--color-neon-primary)',
                'radon-primary': 'var(--color-radon-primary)',
                'krypton-primary': 'var(--color-krypton-primary)',
                'argon-primary': 'var(--color-argon-primary)',
                'xenon-primary': 'var(--color-xenon-primary)',

                // Monaspace Colors ---
                // neon: {
                //     primary: 'rgb(var(--color-neon-primary-rgb) / <alpha-value>)',
                //     dark: 'rgb(var(--color-neon-dark-rgb) / <alpha-value>)',
                // },
                // argon: {
                //     primary: 'var(--color-argon-primary)',
                //     dark: 'rgb(var(--color-argon-dark-rgb) / <alpha-value>)',
                // },
                // xenon: {
                //     primary: 'rgb(var(--color-xenon-primary-rgb) / <alpha-value>)',
                //     dark: 'rgb(var(--color-xenon-dark-rgb) / <alpha-value>)',
                // },
                // radon: {
                //     primary: 'rgb(var(--color-radon-primary-rgb) / <alpha-value>)',
                //     dark: 'rgb(var(--color-radon-dark-rgb) / <alpha-value>)',
                // },
                // krypton: {
                //     primary: 'rgb(var(--color-krypton-primary-rgb) / <alpha-value>)',
                //     dark: 'rgb(var(--color-krypton-dark-rgb) / <alpha-value>)',
                // },
            },

            fontFamily: {
                'cal-sans': ['Cal Sans', 'sans-serif'],
                'cinzel': ['Cinzel', 'sans'],
                'cinzel-deco': ['Cinzel Decorative', 'sans'],
                mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
                dancing: ['Dancing Script', 'cursive'],

                // Monaspace Fonts ---
                'mona-neon': ['MonaspaceNeon', 'monospace'],
                'mona-argon': ['MonaspaceArgon', 'monospace'],
                'mona-xenon': ['MonaspaceXenon', 'monospace'],
                'mona-radon': ['MonaspaceRadon', 'monospace'],
                'mona-krypton': ['MonaspaceKrypton', 'monospace'],

            },

            // Custom Shadows (Using CSS Variables) ---
            boxShadow: {
                'default': "var(--shadow-default)",
                "clay-light": `
                          inset 6px 6px 10px 0 rgba(var(--shadow-base-rgb), 0.2),
                          inset -6px -6px 10px 0 rgba(var(--shadow-highlight-rgb), 0.7),
                          10px 10px 20px 0 rgba(var(--shadow-outer-rgb), 0.2),
                          -4px -4px 12px 0 rgba(var(--shadow-highlight-rgb), 0.5)
                        `,
            },

            scrollSnapType: {
                y: 'y mandatory',
            },
            gridTemplateColumns: {
                'scroll-slide': '40fr 5fr 5fr 40fr',
            },

            animation: {
                ghostpulse: 'ghostpulse 1s ease-in-out infinite alternate',
                ghostpulse2: 'ghostpulse2 0.5s ease-in-out infinite alternate',
                ghostpulse3: 'ghostpulse3 1s ease-in-out infinite alternate',
            },
            keyframes: {
                ghostpulse: {
                    '0%': { 'font-variation-settings': '"wght" 600' },
                    'to': { 'font-variation-settings': '"wght" 200' },
                },
                ghostpulse2: {
                    '0%': { 'font-variation-settings': '"slnt" 0' },
                    'to': { 'font-variation-settings': '"slnt" -11' },
                },
                ghostpulse3: {
                    '0%': { 'font-variation-settings': '"wdth" 100', opacity: '.9' },
                    'to': { 'font-variation-settings': '"wdth" 101', opacity: '.7' },
                },

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
