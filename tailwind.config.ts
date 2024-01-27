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
        primary: "#5680E9",
        secondary: "#59EBCB",
        background: "#C1C8E4",
        foreground: "#000"
      }
    },
  },
  plugins: [],
};
export default config;
