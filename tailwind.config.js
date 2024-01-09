/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#0F0F0F",
        secondary: "#F7F7F7",
        accent: "#009BFF",
        "nav-bg": "#1E1E1E",
      },
      screens: {
        offer: "620px",
        mobilehover: { raw: "(hover:hover)" },
      },
    },
    screens: {
      xs: "320px",
      sm: "768px",
      md: "1060px",
    },
  },
  darkMode: "class",
  plugins: [],
};
