// @type {import('tailwindcss').Config}
module.exports = {
  content: ["./src/**/*.{html,js}" + "./actorsList.js" + "./script.js"],
  theme: {container: {
    // you can configure the container to be centered
    center: true,

    // or have default horizontal padding
    padding: '1rem',

    // default breakpoints but with 40px removed
    screens: {
      sm: '600px',
      md: '728px',
      lg: '984px',
      xl: '1240px',
      '2xl': '1496px',
    },
  },
},
    extend: {fontFamily: {
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
}
