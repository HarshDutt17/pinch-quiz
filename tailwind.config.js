module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: "#04c4db",
          secondary: "#0c7cd4",
        },
        purple: {
          primary: "#9772FB",
          secondary: "#764AF1",
        },
        white: {
          primary: "#FFFFFF",
          secondary: "#F2F2F2",
          medium: "F6FBF4",
        },
      },
      screens: {

        'mobiles': { 'max': '767px' },
        // => @media (max-width: 767px) { ... }

      },
    },
  },
  plugins: [],
}
