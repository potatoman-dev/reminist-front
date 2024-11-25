import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-noto-sans-jp)"],
    },
    colors: {
      primary: "#1475D0",
      "primary-hover": "#2B82D4",
      background: "#FBFCFE",
      "background-gray-light": "#f7f7f7",
      "background-gray-normal": "#f5f7fc",
      "background-gray-dark": "#E9E9E9",
      "background-black": "#1E283B",
      "background-black-hover": "#2e3a51",
      "primary-variant": "#4387E7",
      text: "#262629",
      "text-dark-blue": "#30303e",
      "text-gray-dark": "#686868",
      "text-gray-light": "#A9A9A9",
      "text-error": "#f35151",
      white: "#ffffff",
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
export default config;
