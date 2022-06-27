module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "dark-brown": "#3F3D3B",
      },
      transitionProperty: {
        spacing: "margin, padding",
        transform: "width, display, visible, visibility",
        colors: "filter",
      },
    },
    fontFamily: {
      // 'display' : ['Poppins','strong']
    },
  },
  variants: {
    extend: {
      padding: ["hover"],
      width: ["focus", "hover"],
      filter: ["hover"],
      visibility: ["hover"],
    },
  },
  plugins: [],
};
