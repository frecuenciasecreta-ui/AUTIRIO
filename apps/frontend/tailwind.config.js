/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#040508',
        card: '#0A0D14',
        border: '#151926',
        electric: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          cyan: '#00F0FF',
        },
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
          dark: '#040508',
          accent: '#0066FF',
          gold: '#D4AF37',
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
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
