import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-noto-sans-jp)'],
      rounded: ['var(--font-m-plus-rounded-1c)'],
    },
    colors: {
      primary: "#1475D0",
      "primary-hover": "#2B82D4",
      "primary-variant": "#4387E7",
      secondary: "#A9A9A9",
      background: "#F7FAFE",
      "background-secondary": "#f7f7f7",
      "background-tertiary": "#1E283B",
      "background-tertiary-hover": "#2e3a51",
      surface: "#ffffff",
      text: "#282828",
      "text-secondary": "#686868",
      border: "#F0F0F0",
      "on-primary": "#ffffff",
      "on-background-tertiary": "#ffffff",
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
export default config;
