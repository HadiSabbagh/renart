/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        avenir: ['"Avenir Book"', 'sans-serif'],
      },
      fontWeight: {
        book: '400',
        regular: '400',
        medium: '500',
      },
    },
  },
  plugins: [],
};
