import type { Config } from "tailwindcss";
import themer from "@tailus/themer";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
		'node_modules/@tailus/themer-**/dist/**/*.{js,ts}'
  ],
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
