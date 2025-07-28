// tailwind.config.ts
import type { Config, PluginAPI } from 'tailwindcss/types/config';
import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';

const config: Config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx,css}',
        './app/**/*.{js,ts,jsx,tsx,mdx,css}',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                lg: '2rem',
            },
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': 'var(--my-content-max-width)',
            },
        },
        extend: {
            boxShadow: {
                'default': 'var(--my-shadow-default)',
            },
            colors: {
                'surface-page': 'var(--my-color-surface-page)',
                'surface-card': 'var(--my-color-surface-card)',
                'surface-muted': 'var(--my-color-surface-muted)',
                'menu-bg': 'var(--my-color-menu-bg)',
                'menu-text': 'var(--my-color-menu-text)',
                'timeline-bg': 'var(--my-color-timeline-bg)',
                'timeline-dot': 'var(--my-color-timeline-dot)',
                'timeline-border': 'var(--my-color-timeline-border)',
                'text-default': 'var(--my-color-text-default)',
                'text-muted': 'var(--my-color-text-muted)',
                'text-inverted': 'var(--my-color-text-inverted)',
                'border-default': 'var(--my-color-border-default)',
                'border-subtle': 'var(--my-color-border-subtle)',
                'primary': 'var(--my-color-primary)',
                'secondary': 'var(--my-color-secondary)',
                'accent-primary': 'var(--my-color-accent-primary)',
                'accent-secondary': 'var(--my-color-accent-secondary)',
                'danger': 'var(--my-color-danger)',
                'highlight': 'var(--my-color-highlight)',
                'code-bg': 'var(--my-color-code-bg)',
                'code-text': 'var(--my-color-code-text)',
            },
            fontFamily: {
                'body': ['var(--my-font-body)', ...fontFamily.sans],
                'heading': ['var(--my-font-heading)', ...fontFamily.sans],
                'mono': ['var(--my-font-mono)', ...fontFamily.mono],
                'transitional': ['var(--my-font-transitional)', ...fontFamily.serif],
                'geist-mono': ['var(--my-font-geist-mono)', ...fontFamily.mono],
            },
            fontSize: {
                'step--2': 'var(--my-font-size-step--2)',
                'step--1': 'var(--my-font-size-step--1)',
                'step-0': 'var(--my-font-size-step-0)',
                'step-1': 'var(--my-font-size-step-1)',
                'step-2': 'var(--my-font-size-step-2)',
                'step-3': 'var(--my-font-size-step-3)',
                'step-4': 'var(--my-font-size-step-4)',
                'step-5': 'var(--my-font-size-step-5)',
            },
            lineHeight: {
                'tight': "var(--my-line-height-tight)",
                'normal': "var(--my-line-height-normal)",
                'base': 'var(--my-line-height-base)',
                'heading': 'var(--my-line-height-heading)',
            },
            transitionTimingFunction: {
                'ease-out': "var(--my-ease-out)",
                'ease-out-2': "var(--my-ease-out-2)",
                'ease-out-3': "var(--my-ease-out-3)",
                'ease-bounce': "var(--my-ease-bounce)",
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'gradient': 'gradient 8s linear infinite',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'ghostpulse': 'ghostpulse 1s ease-in-out infinite alternate',
                'ghostpulse2': 'ghostpulse2 0.5s ease-in-out infinite alternate',
                'ghostpulse3': 'ghostpulse3 1s ease-in-out infinite alternate',
                'slide-gradient': "slideGradient 3s ease infinite",
                'slide-words-up': "slideWordsUp 4s infinite ease-in-out",
                'burger-line-close-1': 'burger-close-line1-anim 1s var(--my-ease-out) forwards',
                'burger-line-close-2': 'burger-close-line2-anim 1s var(--my-ease-out) forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                glow: {
                    'from': { textShadow: '0 0 20px #00d9ff40' },
                    'to': { textShadow: '0 0 30px #00d9ff80' }
                },
                gradient: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                },
                slideUp: {
                    'from': { opacity: '0', transform: 'translateY(30px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' }
                },
                slideGradient: {
                    "0%, 100%": { "background-position": "0% 50%" },
                    "50%": { "background-position": "100% 50%" },
                },
                slideWordsUp: {
                    "0%, 45%": { transform: "translateY(0)" },
                    "50%, 95%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(0)" },
                },
                fadeIn: {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' }
                },
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
                'burger-close-line1-anim': {
                    '0%': { transform: 'translateY(-2.5px) rotate(0deg) scale(1,1)' },
                    '100%': { transform: 'translateY(0px) rotate(45deg) scale(0.7, 1) translateZ(0px)' },
                },
                'burger-close-line2-anim': {
                    '0%': { transform: 'translateY(2.5px) rotate(0deg) scale(1,1)' },
                    '100%': { transform: 'translateY(0px) rotate(-45deg) scale(0.7, 1) translateZ(0px)' },
                },
            },
            maxWidth: {
                'content-container': 'var(--my-content-max-width)',
            },
        },
    },
    plugins: [
        aspectRatio,
        containerQueries,
        forms,
        typography({ className: 'mdx-prose' }),
        function ({ addComponents, addUtilities }: PluginAPI) {
            addComponents({
                ".text-gradient": {
                    "@apply bg-clip-text text-transparent": {},
                    "background-image": "linear-gradient(to right, var(--my-color-primary), var(--my-color-secondary))",
                },
            });

            addUtilities({
                ".backface-hidden": {
                    "backface-visibility": "hidden",
                },
            });
        },
    ],
};

export default config;