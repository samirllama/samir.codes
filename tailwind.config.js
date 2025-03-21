// tailwind.config.js
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
      extend: {
        animation: {
          'i-bounce': 'bounce 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite'
        }
      }
    },
    plugins: []
  };
