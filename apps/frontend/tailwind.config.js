/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050507',
        card: '#0D0F17',
        border: '#1E2333',
        gold: {
          300: '#FFF2C6',
          400: '#F3E5AB',
          500: '#D4AF37',
          600: '#C5A059',
          700: '#B38F38',
          800: '#8A6D24',
        },
        silver: {
          100: '#F8FAFC',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
        },
        brand: {
          dark: '#050507',
          accent: '#D4AF37',
          gold: '#C5A059',
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
