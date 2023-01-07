/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  //...
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2d2ce1",

          secondary: "#420d87",

          accent: "#e0b686",

          neutral: "#272C30",

          "base-100": "#ffffff",

          info: "#2A63DF",

          success: "#27A05F",

          warning: "#F9D315",

          error: "#FA6C5C",
        },
      },
    ],
  },
};
