/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  prefix: "",
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  corePlugins: {
    aspectRatio: false,
    preflight: true,
  },
  theme: {
    screens: {
      xxs: "320px",
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: {
          default: "#31CC90",
          variant: "#071D26",
          accent: "#010911",
          t2: "#025B65",
          t3: "#30565F",
          t4: "#008B87",
        },
      },
    },
  },
  daisyui: {
    themes: false,
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: false,
  },
  plugins: [require("tailwindcss-debug-screens"), require("daisyui")],
};