/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy-blue": "#000E37",
        blue: "#0076BE",
        "light-blue": "#1192D4",
        grey: "#575556",
        black: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
