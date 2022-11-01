/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,scss}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        icon: "#0053FF",
        light: {
          primary: "#CCCCCC",
          secondary: "#FFFFFF",
          text: "#000000",
        },
        dark: {
          primary: "#121212",
          secondary: "#222222",
          text: "#FFFFFF",
        }
      }
    },
  },
  plugins: [],
}