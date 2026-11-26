import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: "#c8a84b", light: "#e8c96b", dark: "#a88a2e" },
        mint: { DEFAULT: "#2ead9f", light: "#4ecdc4", soft: "#e6f7f5" },
        cream: "#faf8f3",
        ink: "#1a1a1a",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.08)",
        card: "0 4px 20px rgba(0,0,0,0.06)",
        neo: "4px 4px 0 #1a1a1a",
      },
    },
  },
  plugins: [],
};
export default config;
