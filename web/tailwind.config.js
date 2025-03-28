/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cobalt: {
          50: '#dfe5f3',
          100: '#bfcbe8',
          200: '#9eb2df',
          300: '#7b9ad6',
          400: '#5c82c6',
          500: '#4c6ca3',
          600: '#3c5682',
          700: '#2d4162',
          800: '#1f2d44',
          900: '#121a27',
        },
      },
    },
  },
  plugins: [],
};