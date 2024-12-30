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
      "primary-hover": "#2B82D4",
      background: "#fdfdfd",
      "background-dark": "#eaeaf4",
      "background-gray-light": "#f7f7f7",
      "background-gray-light-hover": "#fcfcfc",
      "background-gray-normal": "#e9e9e9",
      "background-gray-normal-hover": "#e3e3e3",
      "background-gray-dark": "#E9E9E9",
      "background-black": "#222",
      "background-black-hover": "#111",
      "primary-variant": "#4387E7",
      text: "#262629",
      "text-dark-blue": "#30303e",
      "text-gray-dark": "#686868",
      "text-gray-normal": "#afafaf",
      "text-gray-light": "#d5d5d5",
      "text-error": "#f35151",
      "off-white": "#fcfcfc",
      "border-gray": "#dedede",
      transparent: "transparent",

      primary: "#2977D0",
      "primary-border": "#3276B6",
      white: "#ffffff",
      border: "#DFDFDF",
      shadow: "#E9E9E930",
      "border-white": "#E8F1FE",
      "border-input": "#A9A9A9",
      black: "#292929",
      gray: "#afafaf",
      red: "#ED3838",
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
export default config;
