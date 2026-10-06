import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "sans-serif"],
      },
      colors: {
        border: "var(--border-visible)",
        input: "var(--border-visible)",
        ring: "var(--border-visible)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--accent-red)",
          foreground: "var(--surface)",
        },
        secondary: {
          DEFAULT: "var(--surface-raised)",
          foreground: "var(--text-primary)",
        },
        destructive: {
          DEFAULT: "var(--accent-red)",
          foreground: "var(--surface)",
        },
        muted: {
          DEFAULT: "var(--surface-raised)",
          foreground: "var(--text-secondary)",
        },
        accent: {
          DEFAULT: "var(--surface-raised)",
          foreground: "var(--text-display)",
        },
        card: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-primary)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
