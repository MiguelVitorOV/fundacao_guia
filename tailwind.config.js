/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: '#252B37',
        primary: '#0C3B70',
        secondary: '#DE1B62',
        black: '#151A23',
        white: '#FFFFFF',
        blue: {
          200: '#A1ABC4',
          500: '#0C3B70',
          800: '#111B2E',
        },
        pink: {
          200: '#FBB1BD',
          500: '#DE1B62',
          800: '#551A29',
        },
        'blue-light': {
          200: '#77D9F7',
          500: '#23A6DE',
          800: '#00355E',
        },
        neutral: {
          200: '#D7DCE0',
          500: '#646E82',
          800: '#252B37',
        },
      },
    },
  },
  plugins: [],
}

