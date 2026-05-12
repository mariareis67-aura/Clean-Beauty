/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nude: {
          50: '#fdf8f5',
          100: '#f9ede3',
          200: '#f2d9c5',
          300: '#e8bfa0',
          400: '#d99e75',
          500: '#cc8252',
          600: '#b96840',
          700: '#9a5234',
          800: '#7d432c',
          900: '#663827',
        },
        blush: {
          50: '#fdf4f4',
          100: '#fbe8e8',
          200: '#f8d5d5',
          300: '#f2b3b3',
          400: '#e88585',
          500: '#d95e5e',
          600: '#c44444',
          700: '#a43535',
          800: '#882e2e',
          900: '#712b2b',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        cream: {
          50: '#fffef9',
          100: '#fffdf0',
          200: '#fefadc',
          300: '#fdf5c0',
          400: '#fbec93',
          500: '#f9e065',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'luxury': '0 4px 40px rgba(0,0,0,0.08)',
        'luxury-lg': '0 8px 60px rgba(0,0,0,0.12)',
        'gold': '0 4px 20px rgba(245,158,11,0.25)',
      },
    },
  },
  plugins: [],
};
