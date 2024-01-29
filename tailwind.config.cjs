/** @type {import('tailwindcss').Config} */
const { withAnimations } = require("animated-tailwindcss");

module.exports = withAnimations({
  content: [
    "./src/renderer/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(var(--tw-gradient-from) 0%, var(--tw-gradient-from) 60%, var(--tw-gradient-to) 100%)",
      },
      screens: {
        xs: "400px",
      },
      animation: {
        shake: "shake .5s ease-in-out",
        "fade-in": "fade-in .5s ease-in-out",
        spin: "spin .5s ease-in-out infinite",
      },
      keyframes: {
        shake: {
          "0%": {
            transform: "translateX(0)",
          },
          "6.5%": {
            transform: "translateX(-6px) rotateY(-9deg)",
          },
          "18.5%": {
            transform: "translateX(5px) rotateY(7deg)",
          },
          "31.5%": {
            transform: "translateX(-3px) rotateY(-5deg)",
          },
          "43.5%": {
            transform: "translateX(2px) rotateY(3deg)",
          },
          "50%": {
            transform: "translateX(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        spin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
});
