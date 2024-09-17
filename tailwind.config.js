/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      width: {
        '7/10': '70%',
        '30': '30%',
      },
      spacing: {
        '105': ' 4.6rem',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

