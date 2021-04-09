module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './widgets/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
      extend: {
          gridTemplateRows: {
              'layout': '80px 1fr 100px',
          }
      },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
