/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lovejoy: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e3a8a', // Primary LoveJoy Blue
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3a8a',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b', // LoveJoy Gold
          600: '#d97706',
        }
      }
    },
  },
  plugins: [],
};
