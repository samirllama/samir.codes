/* eslint-disable import/no-anonymous-default-export */

/** @type {import('postcss-load-config').Config} */
const config = {
  // plugins: {
  //   tailwindcss: {},
  //   autoprefixer: {},
  // },

  plugins: [
    "@tailwindcss/postcss",
    "autoprefixer", // Adding autoprefixer for cross-browser compatibility
  ],
};

export default config;
