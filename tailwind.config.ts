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
                '2xl': 'var(--content-max-width)',
            },
        },
        extend: {
            backgroundImage: {
                'hdr-gradient': 'var(--nerdy-gradient)',
            },
            boxShadow: {
                'default': 'var(--shadow-default)',
            },
            colors: {
                'surface-page': 'var(--color-surface-page)',
                'surface-card': 'var(--color-surface-card)',
                'text-default': 'var(--color-text-default)',
                'text-muted': 'var(--color-text-muted)',
                'text-inverted': 'var(--color-text-inverted)',
                'menu-bg': 'var(--color-menu-bg)',
                'menu-text': 'var(--color-menu-text)',
                'timeline-bg': 'var(--color-timeline-bg)',
                'timeline-text': 'var(--color-timeline-text)',
                'timeline-dot': 'var(--color-timeline-dot)',
                'timeline-border': 'var(--color-timeline-border)',
                'timeline-accent': 'var(--color-timeline-accent)',
                'accent-primary': 'var(--color-accent-primary)',
                'accent-secondary': 'var(--color-accent-secondary)',
                'border-default': 'var(--color-border-default)',
                'code-background': 'var(--color-code-background)',
            },
            fontFamily: {
                'body': ['var(--font-cinzel-deco)', ...fontFamily.sans],
                'cinzel': 'var(--font-cinzel)',
                'cinzel-deco': 'var(--font-cinzel-deco)',
                'inter': 'var(--font-inter)',
                mona: ['MonaspaceNeon', ...fontFamily.mono],
                'mo-argon': ["MonaspaceArgon", ...fontFamily.mono],
                'transitional': 'var(--font-transitional)',
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
                'h1': 'var(--type-scale-step-5)',
                'h2': 'var(--type-scale-step-4)',
                'h3': 'var(--type-scale-step-3)',
                'h4': 'var(--type-scale-step-2)',
                'sm': 'var(--type-scale-step-0)',
                'xs': 'var(--type-scale-step--1)',
                '15fx': 'calc(15 * var(--unit-fx))',
            },
            lineHeight: {
                'tight': "var(--lineHeight-tight)",
                'normal': "var(--lineHeight-normal)",
                'base': 'var(--lineHeight-base)',
                'heading': 'var(--lineHeight-heading)',
            },
            letterSpacing: {
                '-3.5p': '-0.035em',
            },
            gridTemplateColumns: {
                'scroll-slide': '40fr 5fr 5fr 40fr',
            },
            transitionTimingFunction: {
                easeOut: "var(--alias-easeOut)",
                easeOut2: "var(--alias-easeOut2)",
                easeOut3: "var(--alias-easeOut3)",
                easeOutSlow: "var(--alias-easeOutSlow)",
                'bounce': "var(--bounce)",
                'ease-in-out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'gradient': 'gradient 8s linear infinite',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
                ghostpulse: 'ghostpulse 1s ease-in-out infinite alternate',
                ghostpulse2: 'ghostpulse2 0.5s ease-in-out infinite alternate',
                ghostpulse3: 'ghostpulse3 1s ease-in-out infinite alternate',
                slideGradient: "slideGradient 3s ease infinite",
                slideWordsUp: "slideWordsUp 4s infinite ease-in-out",
                'logo-letter-enter-114ms': 'letter-enter 0.4s var(--alias-easeOut) 0.11449416331740747s forwards',
                'logo-letter-enter-185ms': 'letter-enter 0.4s var(--alias-easeOut) 0.18555693903818438s forwards',
                'logo-letter-enter-266ms': 'letter-enter 0.4s var(--alias-easeOut) 0.26660986343350956s forwards',
                'logo-letter-enter-24ms': 'letter-enter 0.4s var(--alias-easeOut) 0.024036112241064934s forwards',
                'logo-letter-enter-263ms': 'letter-enter 0.4s var(--alias-easeOut) 0.26318450303601093s forwards',
                'logo-letter-enter-142ms': 'letter-enter 0.4s var(--alias-easeOut) 0.14211818761888784s forwards',
                'logo-letter-enter-121ms': 'letter-enter 0.4s var(--alias-easeOut) 0.12113406637972922s forwards',
                'logo-letter-enter-113ms': 'letter-enter 0.4s var(--alias-easeOut) 0.11389369356788502s forwards',
                'logo-letter-enter-79ms': 'letter-enter 0.4s var(--alias-easeOut) 0.07934386513956036s forwards',
                'burger-line1-start-hover': 'burger-line1-start 1.3s var(--alias-easeOut2) 0.1s forwards',
                'burger-line1-end-hover': 'burger-line1-end 1.3s var(--alias-easeOut2) 0s forwards',
                'burger-line2-start-hover': 'burger-line2-start 1.3s var(--alias-easeOut2) 0.1s forwards',
                'burger-line2-end-hover': 'burger-line2-end 1.3s var(--alias-easeOut2) 0s forwards',
                'menu-letter-enter': 'letter-enter 0.4s var(--alias-easeOut) 0.5s forwards',
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
                'letter-enter': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'burger-line1-start-hover': {
                    '0%': { transform: 'scaleX(1)' },
                    '20%': { transform: 'scaleX(0.8)' },
                    '40%': { transform: 'scaleX(1.1)' },
                    '60%': { transform: 'scaleX(0.9)' },
                    '80%': { transform: 'scaleX(1.05)' },
                    '100%': { transform: 'scaleX(1)' },
                },
                'burger-line1-end-hover': {
                    '0%': { transform: 'scaleX(1)' },
                    '15%': { transform: 'scaleX(0.7)' },
                    '35%': { transform: 'scaleX(1.2)' },
                    '55%': { transform: 'scaleX(0.85)' },
                    '75%': { transform: 'scaleX(1.08)' },
                    '100%': { transform: 'scaleX(1)' },
                },
                'burger-line2-start-hover': {
                    '0%': { transform: 'scaleX(1)' },
                    '18%': { transform: 'scaleX(0.9)' },
                    '38%': { transform: 'scaleX(1.15)' },
                    '58%': { transform: 'scaleX(0.88)' },
                    '78%': { transform: 'scaleX(1.06)' },
                    '100%': { transform: 'scaleX(1)' },
                },
                'burger-line2-end-hover': {
                    '0%': { transform: 'scaleX(1)' },
                    '22%': { transform: 'scaleX(0.75)' },
                    '42%': { transform: 'scaleX(1.18)' },
                    '62%': { transform: 'scaleX(0.92)' },
                    '82%': { transform: 'scaleX(1.04)' },
                    '100%': { transform: 'scaleX(1)' },
                },
                'burger-close-line1': {
                    '0%': { transform: 'translateY(-2.5px) rotate(0deg) scale(1,1)' },
                    '100%': { transform: 'translateY(0px) rotate(45deg) scale(0.7, 1) translateZ(0px)' },
                },
                'burger-close-line2': {
                    '0%': { transform: 'translateY(2.5px) rotate(0deg) scale(1,1)' },
                    '100%': { transform: 'translateY(0px) rotate(-45deg) scale(0.7, 1) translateZ(0px)' },
                },
            },

            maxWidth: {
                'content-container': 'var(--content-max-width)',
            },

            spacing: {
                "150fy": "calc(150 * var(--unit-fy))",
                "80fy": "calc(80 * var(--unit-fy))",
                "100fy": "calc(100 * var(--unit-fy))",
                "102fx": "calc(102 * var(--unit-fx))",
                "200fy": "calc(200 * var(--unit-fy))",
                "195fy": "calc(195 * var(--unit-fy))",
                "130fy": "calc(130 * var(--unit-fy))",
                "217fy": "calc(217 * var(--unit-fy))",
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
                '34': '8.5rem',
                '38': '9.5rem',
                '42': '10.5rem',
                '46': '11.5rem',
                '50': '12.5rem',
            },
            transitionProperty: {
                'opacity': 'opacity',
                'transform': 'transform',
                'color': 'color', 'height': 'height',
                'spacing': 'margin, padding',

            },
            transitionDuration: {
                '500': '0.5s',
                '600': '0.6s',
                '1300': '1.3s',
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
                ".burger-line-segment": {
                    "@apply inline-block absolute top-0 left-0 w-full h-full bg-current origin-[0%_50%] transform backface-hidden": {},
                },
                ".burger-line-container": {
                    "@apply absolute top-1/2 left-0 w-[36px] h-[1px] block opacity-100 transform backface-hidden": {},
                },
                ".text-gradient": {
                    "@apply bg-clip-text text-transparent": {},
                    "background-image": "var(--nerdy-gradient)",
                },
            });

            addUtilities(
                {
                    ".dashoffset-0": { "stroke-dashoffset": "0" },
                    ".backface-hidden": {
                        "backface-visibility": "hidden",
                    },
                }
            );
        },
    ],
};

export default config;
