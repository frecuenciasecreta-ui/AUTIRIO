/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090B0E',
        card: '#12161F',
        border: '#212736',
        gold: {
          500: '#D4AF37',
          600: '#AA820A',
        },
        brand: {
          dark: '#0A0D14',
          accent: '#0066FF',
          silver: '#E2E8F0',
        },
        dgt: {
          cero: '#00A3E0',
          eco: '#009A44',
          c: '#0072CE',
          b: '#FFC72C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
