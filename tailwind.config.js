/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.svelte"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6A00",
        secondary1: "#FF8000",
        secondary2: "#F8A500",
        bgPrimary: "#202029",
        alert: {
          primary: "#3B71CA",
          secondary: "#a12cb8",
          warning: "#E4A11B",
          danger: "#DC4C64",
          info: "#54B4D3",
          success: "#14A44D",
        },
      },
      screens: {
        mobile: "500px",
        xls: "1366px",
        lgs: "1110px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
