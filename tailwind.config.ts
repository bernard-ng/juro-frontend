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
      colors: ({ colors }) => ({
        primary: colors.blue,
        secondary: colors.green,
        accent: colors.pink,
        info: colors.blue,
        success: colors.green,
        warning: colors.yellow,
        danger: colors.red,
        gray: {
            "50": "#F3F8FA",
            "100": "#EEEFF2",
            "200": "#E4EBF2",
            "300": "#C1D0D5",
            "400": "#99A8AF",
            "500": "#6E7D84",
            "600": "#4E5D64",
            "700": "#384850",
            "800": "#212C34",
            "900": "#10161B",
            "925" : "#0b1014",
            "950": "#020304",
        },
      })
    },
  },
  plugins: [
    themer({
      radius: "smoothest",
    })
  ],
};
export default config;
