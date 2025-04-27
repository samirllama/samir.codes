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
            position: {
                sticky: 'sticky',
                fixed: 'fixed',
                absolute: 'absolute',
                relative: 'relative',
                static: 'static',
            },

            colors: {
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
                'light-grey': 'rgb(var(--color-light-grey-rgb))',
                'galactic-base': 'rgb(var(--color-galactic-base-rgb))',
                'mousse-terracotta': '#924622',
            },

            fontFamily: {
                'cal-sans': ['Cal Sans', 'sans-serif'],
                'cinzel': ['Cinzel', 'sans'],
                'cinzel-deco': ['Cinzel Decorative', 'sans'],
                mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
                dancing: ['Dancing Script', 'cursive']
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
