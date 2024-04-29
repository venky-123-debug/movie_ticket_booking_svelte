/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.svelte"],
  theme: {
    extend: {
      fontSize: {
        xsm: ["0.8125rem", "1.5rem"],
        "1xs": [
          "11px",
          {
            lineHeight: "16.5px",
            fontWeight: "600",
            height: "40.5px",
          },
        ],

        formInput: [
          "13px",
          {
            lineHeight: "19.5px",
            fontWeight: "400",
          },
        ],
        tableHeaderText: [
          "13px",
          {
            lineHeight: "19.5px",
            fontWeight: "600",
          },
        ],

        formTitleText: [
          "15px",
          {
            lineHeight: "18px",
            fontWeight: "600",
          },
        ],
        "1xm": [
          "13.008px",
          {
            lineHeight: "19.512px",
            fontWeight: "500",
          },
        ],

        "1sm": [
          "14px",
          {
            lineHeight: "14px",
            fontWeight: "500",
          },
        ],
      },
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
        borderClr:"#a0a1a533"
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
