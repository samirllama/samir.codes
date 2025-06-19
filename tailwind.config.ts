// tailwind.config.ts
import type { Config } from 'tailwindcss';
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
        extend: {
            backgroundImage: {
                'hdr-gradient': 'var(--nerdy-gradient)',
            },
            boxShadow: {
                'default': 'var(--shadow-default)',
                "clay-light": `
          inset 6px 6px 10px 0 rgba(var(--shadow-base-rgb), 0.2),
          inset -6px -6px 10px 0 rgba(var(--shadow-highlight-rgb), 0.7),
          10px 10px 20px 0 rgba(var(--shadow-outer-rgb), 0.2),
          -4px -4px 12px 0 rgba(var(--shadow-highlight-rgb), 0.5)
        `,
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
                'neural': '#0f0f23',
                'neural-light': '#1a1a2e',
                'accent': '#00d9ff',
                'accent-dark': '#0090b8',
                'gradient-start': '#6366f1',
                'gradient-end': '#06b6d4'
            },
            fontFamily: {
                'cal-sans': ['Cal Sans', 'sans-serif'],
                'cinzel': ['Cinzel', 'sans'],
                'cinzel-deco': ['Cinzel Decorative', 'sans'],
                mono: ['MonaspaceNeon', 'monospace'],
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
                'h1': 'var(--type-scale-step-5)',
                'h2': 'var(--type-scale-step-4)',
                'h3': 'var(--type-scale-step-3)',
                'h4': 'var(--type-scale-step-2)',
                'sm': 'var(--type-scale-step-0)',
                'xs': 'var(--type-scale-step--1)',
                '300px': '300px',
                '15fx': 'calc(15 * var(--unit-fx))',
            },
            lineHeight: {
                tight: "var(--lineHeight-tight)",
                normal: "var(--lineHeight-normal)",
                '1.2': '1.2',
            },
            letterSpacing: {
                wide: 'var(--tracking-wide)',
                '-3.5p': '-0.035em',
            },
            filter: {
                "saturate-0": "saturate(0%)",
                "saturate-30": "saturate(30%)",
            },
            scrollSnapType: {
                y: 'y mandatory',
            },
            gridTemplateColumns: {
                'scroll-slide': '40fr 5fr 5fr 40fr',
            },
            transitionTimingFunction: {
                easeOut: "var(--alias-easeOut)",
                easeOut2: "var(--alias-easeOut2)",
                easeOut3: "var(--alias-easeOut3)",
                easeOutSlow: "var(--alias-easeOutSlow)",
                bounce: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
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
                'burger-line1-start': {
                    '0%': { transform: 'translateY(-2.5px) rotate(0deg)' }, '100%': { transform: 'translateY(0px) rotate(45deg)' },
                },
                'burger-line1-end': { '0%': { transform: 'translateY(2.5px) rotate(0deg)' }, '100%': { transform: 'translateY(0px) rotate(-45deg)' } },
                'burger-line2-start': { '0%': {}, '100%': {} },
                'burger-line2-end': { '0%': { /* initial */ }, '100%': { /* final */ } },

                'burger-close-line1': {
                    '0%': { transform: 'translateY(-2.5px) rotate(0deg) scale(1,1)' },
                    '100%': { transform: 'translateY(0px) rotate(45deg) scale(0.7, 1) translateZ(0px)' },
                },
                'burger-close-line2': {
                    '0%': { transform: 'translateY(2.5px) rotate(0deg) scale(1,1)' },
                    '100%': { transform: 'translateY(0px) rotate(-45deg) scale(0.7, 1) translateZ(0px)' },
                },
            },
            spacing: {
                xs: "var(--spacing-xs)",
                sm: "var(--spacing-s)",
                md: "var(--spacing-m)",
                l: "var(--spacing-l)",
                xl: "var(--spacing-xl)",
                "2xl": "var(--spacing-2xl)",
                "150fy": "calc(150 * var(--unit-fy))",
                "80fy": "calc(80 * var(--unit-fy))",
                "100fy": "calc(100 * var(--unit-fy))",
                "102fx": "calc(102 * var(--unit-fx))",
                "200fy": "calc(200 * var(--unit-fy))",
                "195fy": "calc(195 * var(--unit-fy))",
                "130fy": "calc(130 * var(--unit-fy))",
                "217fy": "calc(217 * var(--unit-fy))",
                '1px': '1px',
                '2.5px': '2.5px',
                '15px': '15px',
                '30px': '30px',
                '36px': '36px',
                '60px': '60px',

            },
            transitionProperty: {
                'opacity': 'opacity',
                'transform': 'transform',
                'color': 'color',
            },
            transitionDuration: {
                '500': '0.5s',
                '600': '0.6s',
                '1300': '1.3s',
            },
            opacity: {
                '1': '1',
            }
        },
    },
    plugins: [
        aspectRatio,
        containerQueries,
        forms,
        typography({ className: 'mdx-prose' }),
        function ({ addUtilities, addComponents }) {
            addUtilities(
                {
                    ".dashoffset-0": { "stroke-dashoffset": "0" },
                    ".backface-hidden": {
                        "-webkit-backface-visibility": "hidden",
                        "backface-visibility": "hidden",
                    },
                    ".space-y-195px > :not([hidden]) ~ :not([hidden])": {
                        marginBottom: "195px",
                    },
                },
                {
                    variants: ["responsive", "hover", "group-hover"],
                }
            );

            addComponents({
                ".burger-line-segment": {
                    "@apply inline-block absolute top-0 left-0 w-full h-full bg-current origin-[0%_50%] transform backface-hidden": {},
                },
                ".burger-line-container": {
                    "@apply absolute top-1/2 left-0 w-[36px] h-[1px] block opacity-100 transform backface-hidden": {},
                },
            });
        },
    ],
};

export default config;
