/** @type {import('tailwindcss').Config} */

const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '300px',
      ...screens,
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}