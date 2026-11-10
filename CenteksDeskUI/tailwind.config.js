/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        centeks: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdbff',
          300: '#8ec4ff',
          400: '#59a2ff',
          500: '#327eff',
          600: '#1d5ff7',
          700: '#1447e3',
          800: '#173ab8',
          900: '#183491',
        }
      }
    },
  },
  plugins: [],
}

