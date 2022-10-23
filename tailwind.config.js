/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-out-left": "slide-out-left 1s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both"
    },
    keyframes: {
        "slide-in-left": {
            "0%": {
                transform: "translateX(-1000px)",
                opacity: "0"
            },
            to: {
                transform: "translateX(0)",
                opacity: "1"
            }
        },
        "slide-out-left": {
          "0%": {
              transform: "translateX(0)",
              opacity: "1"
          },
          to: {
              transform: "translateX(-1000px)",
              opacity: "0"
          }
      }
      }
    },
  },
  plugins: [],
}
