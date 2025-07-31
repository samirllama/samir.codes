// tailwind.config.ts
import type { Config, PluginAPI } from 'tailwindcss/types/config';
import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import plugin from 'tailwindcss/plugin';

export const typographyFluidPlugin = plugin(function ({ addUtilities }: PluginAPI) {
    const fontUtilities = {
        '.text-fluid-h1': {
            fontSize: 'var(--font-size-step-5)',
            lineHeight: '1.1',
            fontWeight: '600',
            fontFamily: 'var(--font-display)',
        },
        '.text-fluid-h2': {
            fontSize: 'var(--font-size-step-3)',
            lineHeight: 'var(--font-size-step-3)',
            fontVariationSettings: '"opsz" var(--sc-opsz), "slnt" var(--sc-slnt), "wght" 100',
            fontFamily: 'var(--font-display)',
        },
        '.text-fluid-h3': {
            fontSize: 'var(--font-size-step-2)',
            lineHeight: 'var(--font-size-step-2)',
            fontFamily: 'var(--font-display)',
            fontWeight: '700',
            fontVariationSettings: '"opsz" var(--sc-opsz), "slnt" var(--sc-slnt), "wght" 700',
        },
        '.text-fluid-h4': {
            fontSize: 'var(--font-size-step-0)',
            lineHeight: 'var(--font-size-step-0)',
            fontFamily: 'var(--font-body, "Inter", sans-serif)',

            letterSpacing: 'var(--tracking-wide)',
            textTransform: 'uppercase',
            fontVariationSettings: '"opsz" var(--sc-opsz), "slnt" var(--sc-slnt), "wght" 560',
        },
        '.text-fluid-body-lg': {
            fontSize: 'var(--font-size-step-1)',
            lineHeight: 'var(--font-size-step-1)',
            fontWeight: '500',
            fontFamily: 'var(--font-body, "Inter", sans-serif)',
        },
        '.text-fluid-body': {
            fontSize: 'var(--font-size-step-0)',
            lineHeight: 'var(--font-size-step-0)',
            fontWeight: '300',
            fontFamily: 'var(--font-body, "Inter", sans-serif)',
        },
        '.text-fluid-meta': {
            fontSize: 'var(--font-size-step-0)',
            lineHeight: 'var(--font-size-step-0)',
            // lineHeight: '1.6',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body, "Inter", sans-serif)',
            fontVariationSettings: '"opsz" var(--sc-opsz), "slnt" var(--sc-slnt), "wght" var(--sc-wght)',
        },
        '.text-fluid-caption': {
            fontSize: 'var(--font-size-step-0)',
            fontFamily: 'var(--font-body, "Inter", sans-serif)',
            fontVariationSettings: '"opsz" var(--sc-opsz), "slnt" var(--sc-slnt), "wght" 200',
            letterSpacing: 'normal',


        },
    };

    const spacingVars = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    const spacingUtilities = spacingVars.flatMap((size) => {
        const varRef = `var(--my-spacing-${size})`;
        return [
            { [`.pt-fluid-${size}`]: { paddingTop: varRef } },
            { [`.pb-fluid-${size}`]: { paddingBottom: varRef } },
            { [`.pl-fluid-${size}`]: { paddingLeft: varRef } },
            { [`.pr-fluid-${size}`]: { paddingRight: varRef } },
            { [`.px-fluid-${size}`]: { paddingLeft: varRef, paddingRight: varRef } },
            { [`.py-fluid-${size}`]: { paddingTop: varRef, paddingBottom: varRef } },
            { [`.mt-fluid-${size}`]: { marginTop: varRef } },
            { [`.mb-fluid-${size}`]: { marginBottom: varRef } },
            { [`.ml-fluid-${size}`]: { marginLeft: varRef } },
            { [`.mr-fluid-${size}`]: { marginRight: varRef } },
            { [`.mx-fluid-${size}`]: { marginLeft: varRef, marginRight: varRef } },
            { [`.my-fluid-${size}`]: { marginTop: varRef, marginBottom: varRef } },
        ];
    });

    addUtilities(fontUtilities);
    addUtilities(spacingUtilities, { respectPrefix: false });
});


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
                'surface-page': 'var(--color-surface-page)',
                'surface-card': 'var(--color-surface-card)',
                'surface-muted': 'var(--color-surface-muted)',
                'menu-bg': 'var(--color-menu-bg)',
                'menu-text': 'var(--color-menu-text)',
                'timeline-bg': 'var(--color-timeline-bg)',
                'timeline-dot': 'var(--color-timeline-dot)',
                'timeline-border': 'var(--color-timeline-border)',
                'text-default': 'var(--color-text-default)',
                'text-muted': 'var(--color-text-muted)',
                'text-inverted': 'var(--color-text-inverted)',
                'border-default': 'var(--color-border-default)',
                'border-subtle': 'var(--color-border-subtle)',
                'primary': 'var(--color-primary)',
                'secondary': 'var(--color-secondary)',
                'accent-primary': 'var(--color-accent-primary)',
                'accent-secondary': 'var(--color-accent-secondary)',
                'danger': 'var(--color-danger)',
                'highlight': 'var(--color-highlight)',
                'code-bg': 'var(--color-code-bg)',
                'code-text': 'var(--color-code-text)',
            },
            fontFamily: {
                'body': ['var(--font-body)', ...fontFamily.sans],
                'mona': ['var(--font-mona)', ...fontFamily.mono],
                'mono': ['var(--font-geist-mono)', ...fontFamily.mono],
                'transitional': ['var(--font-transitional)', ...fontFamily.serif],
            },
            fontSize: {
                'step--2': 'var(--font-size-step--2)',
                'step--1': 'var(--font-size-step--1)',
                'step-0': 'var(--font-size-step-0)',
                'step-1': 'var(--font-size-step-1)',
                'step-2': 'var(--font-size-step-2)',
                'step-3': 'var(--font-size-step-3)',
                'step-4': 'var(--font-size-step-4)',
                'step-5': 'var(--font-size-step-5)',
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
        typographyFluidPlugin,
        typography({ className: 'mdx-prose' }),
        aspectRatio,
        containerQueries,
        forms,
        function ({ addComponents, addUtilities }: PluginAPI) {
            addComponents({
                ".text-gradient": {
                    "@apply bg-clip-text text-transparent": {},
                    "background-image": "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
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
