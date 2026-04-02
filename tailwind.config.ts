import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: "#5f6c2c",
            dark: "#3d4620",
            mid: "#748535",
            light: "#8fa042",
          },
          orange: {
            DEFAULT: "#c75c19",
            light: "#e06a1e",
          },
          cream: "#fafaf5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
