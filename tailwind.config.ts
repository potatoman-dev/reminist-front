import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#1475D0",
      "primary-variant": "#4387E7",
      secondary: "#A9A9A9",
      background: "#F7FAFE",
      "background-secondary": "#F9F9F9",
      surface: "#ffffff",
      text: "#282828",
      "text-secondary": "#686868",
      border: "#F0F0F0",
      // 'on-primary': '#ffffff',
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
export default config;
