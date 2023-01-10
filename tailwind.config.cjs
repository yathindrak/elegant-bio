/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Mulish", "sans-serif"],
      },
      width: {
        100: "30rem",
      },
      colors: {
        primary: "#6C00FF",
        secondary: "#2DCDDF",
        error: "#FF0101"
      },
    },
  },
  plugins: [],
}
