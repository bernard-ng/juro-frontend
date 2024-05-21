import type { Config } from "tailwindcss";
import themer from "@tailus/themer";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
		'node_modules/@tailus/themer-**/dist/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          "50": "#FAFAFE",
          "100": "#F5F5F9",
          "200": "#E7E7F0",
          "300": "#D6D6E1",
          "400": "#A8A8B8",
          "500": "#6E6E81",
          "600": "#4D4D5F",
          "700": "#3A3A4B",
          "800": "#1F1F31",
          "900": "#121220",
          "925": "#090915",
          "950": "#02020D",
      },
      },
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    }
  },
  plugins: [
    themer({
      radius: "smoothest",
      padding: "medium",
      palette: {
        extend : "oz"
      }
    })
  ],
};
export default config;
