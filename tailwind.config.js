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
          }
      },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
