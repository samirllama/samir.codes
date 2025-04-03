import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                // primary: {
                //     50: '#faf5ff',
                //     100: '#f3e8ff',
                //     200: '#e9d5ff',
                //     300: '#d8b4fe',
                //     400: '#c084fc',
                //     500: '#a855f7',
                //     600: '#9333ea',
                //     700: '#7e22ce',
                //     800: '#6b21a8',
                //     900: '#581c87',
                //     950: '#3b0764',
                // },
                primary: "#1e3a8a",
                dark: {
                    base: '#121212',
                    elevated: '#1A1A1A',
                    high: '#222222',
                    border: {
                        subtle: '#2A2A2A',
                        default: '#333333',
                        medium: '#444444',
                        strong: '#555555',
                    },
                },
                slate: {
                    800: "#1e293b", // Background and form colors
                    200: "#e2e8f0", // Text and light theme colors
                    500: "#64748b", // Placeholder color
                },
                purple: {
                    500: "#8b5cf6", // Focus ring color
                    600: "#7c3aed", // Checkbox and radio button colors
                },
            },
            boxShadow: {
                mode: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.5' }],
                sm: ['0.875rem', { lineHeight: '1.5715' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
                xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
                '2xl': ['1.5rem', { lineHeight: '1.415', letterSpacing: '-0.017em' }],
                '3xl': ['1.875rem', { lineHeight: '1.333', letterSpacing: '-0.017em' }],
                '4xl': ['2.25rem', { lineHeight: '1.277', letterSpacing: '-0.017em' }],
                '5xl': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.017em' }],
                '6xl': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.017em' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.017em' }],
            },
            letterSpacing: {
                tighter: '-0.02em',
                tight: '-0.01em',
                normal: '0',
                wide: '0.01em',
                wider: '0.02em',
                widest: '0.4em',
            },
            animation: {
                'endless': 'endless 20s linear infinite',
                'shine': 'shine 5s linear 500ms infinite',
                'float': 'float 2s ease-in-out infinite',
            },
            keyframes: {
                'endless': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-245px)' }
                },
                'shine': {
                    '0%': { top: '0', transform: 'translateY(-100%) scaleY(10)', opacity: '0' },
                    '2%': { opacity: '.5' },
                    '40%': { top: '100%', transform: 'translateY(0) scaleY(200)', opacity: '0' },
                    '100%': { top: '100%', transform: 'translateY(0) scaleY(1)', opacity: '0' },
                },
                'float': {
                    '0%': { transform: 'translateY(3%)' },
                    '50%': { transform: 'translateY(-3%)' },
                    '100%': { transform: 'translateY(3%)' }
                },
            },
            fontWeight: {
                extrabold: '800',
            },
        }
    },
    plugins: [forms, typography],
    darkMode: 'media',
}satisfies Config

export default config
