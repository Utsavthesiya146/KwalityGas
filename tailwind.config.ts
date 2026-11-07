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
          navy: {
            DEFAULT: "#102A43",
            dark: "#0B1D2F",
            deep: "#081624",
            light: "#1F3E5C",
            surface: "#F0F4F8",
          },
          blue: {
            DEFAULT: "#1769AA",
            hover: "#12538A",
            dark: "#102A43",
            deep: "#0B1D2F",
            light: "#2185D0",
            surface: "#EBF3FB",
          },
          orange: {
            DEFAULT: "#F28C28",
            hover: "#D9771A",
            light: "#FEF3E8",
            flame: "#E65100",
            amber: "#F59E0B",
          },
          neutral: {
            bg: "#F5F7FA",
            dark: "#182230",
            muted: "#667085",
            border: "#E2E8F0",
          },
          gold: "#D97706",
          dark: "#182230",
          muted: "#667085",
          light: "#F5F7FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(16, 42, 67, 0.04), 0 1px 3px rgba(16, 42, 67, 0.02)",
        card: "0 4px 20px -2px rgba(16, 42, 67, 0.08)",
        cardHover: "0 16px 36px -6px rgba(16, 42, 67, 0.14)",
        elevated: "0 20px 45px -10px rgba(16, 42, 67, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
