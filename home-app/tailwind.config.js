/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SourceSansPro', 'Arial', 'sans-serif'],
      },
    },
    screens: {
      xs: '320px',
      // => @media (min-width: 320px) { ... }
      sm: '600px',
      // => @media (min-width: 600px) { ... }

      md: '900px',
      // => @media (min-width: 900px) { ... }

      lg: '1284px',
      // => @media (min-width: 1284px) { ... }

      xl: '1320px',
      // => @media (min-width: 1320px) { ... }
    },
  },
  plugins: [],
}
