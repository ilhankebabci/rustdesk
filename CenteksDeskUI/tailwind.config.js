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
          gold: '#d7b469',
          'gold-light': '#ebd49a',
          'gold-dark': '#b99547',
          navy: '#1e2c34',
          'navy-dark': '#131e24',
          'navy-deep': '#0b1318',
          50: '#faf7ee',
          100: '#f4ebd4',
          200: '#ebd49a',
          300: '#e1be67',
          400: '#d7b469',
          500: '#b99547',
          600: '#9b7634',
          700: '#7a5728',
          800: '#5a3e1e',
          900: '#3c2914',
        }
      }
    },
  },
  plugins: [],
}

