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
    darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: {
                'hdr-gradient': 'var(--nerdy-gradient)',
            },
            colors: {
                'surface-page': 'var(--color-surface-page)',
                'surface-card': 'var(--color-surface-card)',
                'surface-secondary': 'var(--color-surface-secondary)',
                'text-default': 'var(--color-text-default)',
                'text-muted': 'var(--color-text-muted)',
                'text-inverted': 'var(--color-text-inverted)',
                'accent-primary': 'var(--color-accent-primary)',
                'accent-secondary': 'var(--color-accent-secondary)',
                'border-default': 'var(--color-border-default)',
                'border-subtle': 'var(--color-border-subtle)',
                'interactive-primary': 'var(--color-interactive-primary)',
                'interactive-secondary': 'var(--color-interactive-secondary)',
                'interactive-muted': 'var(--color-interactive-muted)',
                'interactive-text': 'var(--color-interactive-text)',
                'code-background': 'var(--color-code-background)',
                'neon-primary': 'var(--color-neon-primary)',
                'neon-dark': 'var(--color-neon-dark)',
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
                mono: ['MonaspaceNeon', 'monospace'],
                dancing: ['Dancing Script', 'cursive'],

                'mona-neon': ['MonaspaceNeon', 'monospace'],
                'mona-argon': ['MonaspaceArgon', 'monospace'],
                'mona-xenon': ['MonaspaceXenon', 'monospace'],
                'mona-radon': ['MonaspaceRadon', 'monospace'],
                'mona-krypton': ['MonaspaceKrypton', 'monospace'],

            },
            fontSize: {
                'step--2': 'var(--type-scale-step--2)',
                'step--1': 'var(--type-scale-step--1)',
                'step-0': 'var(--type-scale-step-0)',
                'step-1': 'var(--type-scale-step-1)',
                'step-2': 'var(--type-scale-step-2)',
                'step-3': 'var(--type-scale-step-3)',
                'step-4': 'var(--type-scale-step-4)',
                'step-5': 'var(--type-scale-step-5)',
            },
            letterSpacing: {
                wide: 'var(--tracking-wide)',
            },
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
