// @type {import('tailwindcss').Config}
export const content = ["./src/**/*.{html,js}" + "./actorsList.js" + "./script.js"];
export const theme = {
  container: {
    // you can configure the container to be centered
    center: true,

    // or have default horizontal padding
    padding: '1rem',
    // default breakpoints but with 40px removed
    
    extend: {
      fontFamily: {
        'gotham': ['Gotham', 'sans-serif']
      },
      maxHeight: {
        '600': '24rem',
      }

    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
module.exports = {
  theme: {
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
  }
}
    

