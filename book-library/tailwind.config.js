/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily :{
      Imprint: ['Imprint-MT-Shadow-Regular'],
      Inter: ['Inter_18pt-Regular']
    },
    // width :{
    //   '95' : '34.21613rem'
    // },
    height :{
      '13' : '2.66769rem'
    }
  },
  plugins: [],
}

