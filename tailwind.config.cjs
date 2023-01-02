/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./renderer/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
      },
    },
  },
  plugins: [require("daisyui")],
};
