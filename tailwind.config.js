// @type {import('tailwindcss').Config}
module.exports = {
  content: ["./src/**/*.{html,js}" + "./actorsList.js" + "./script.js"],
  theme: {
    extend: {fontFamily: {
      'gotham': ['Gotham', 'sans-serif'] 
    },
    maxHeight: {
      '600': '24rem',
    }
      
    },
  },
  plugins: [],
}
