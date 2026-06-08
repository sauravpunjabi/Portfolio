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
        mono: ["var(--font-mono)", "IBM Plex Mono", "monospace"],
      },
      colors: {
        themeBg: "#212529",
        surface: "#000000",
        themeText: "#ffffff",
        "text-muted": "#6c757d",
        border: "#495057",
        accent: "#7C3AED",
        "accent-dim": "rgba(124,58,237,0.15)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        marquee: "marquee 28s linear infinite",
        "marquee-slow": "marquee 45s linear infinite",
        "marquee-reverse": "marquee 28s linear infinite reverse",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
