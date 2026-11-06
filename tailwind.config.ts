import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: "#0B3B60",
            dark: "#062238",
            deep: "#082845",
            light: "#16588E",
            surface: "#EBF3F9",
          },
          orange: {
            DEFAULT: "#EA580C",
            hover: "#C2410C",
            light: "#FFEDD5",
            flame: "#E65100",
          },
          gold: "#D97706",
          dark: "#0F172A",
          muted: "#475569",
          light: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
        card: "0 4px 20px -2px rgba(11, 59, 96, 0.08)",
        cardHover: "0 12px 30px -4px rgba(11, 59, 96, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;

