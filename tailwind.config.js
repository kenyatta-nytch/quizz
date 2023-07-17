const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './widgets/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
          'layout': '80px 1fr 100px',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif']
      },
      colors: {
        primary: '#e9d5ff',
        secondary: '#005B46',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
