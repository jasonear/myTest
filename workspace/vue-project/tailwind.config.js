/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00d4ff',
        dark: {
          900: '#1a1d23',
          800: '#22262e',
          700: '#2a2f38',
          600: '#333842',
        }
      }
    },
  },
  plugins: [],
}
