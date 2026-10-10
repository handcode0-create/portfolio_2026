import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B0B0B", 2: "#121212", 3: "#1A1A1A" },
        paper: {
          DEFAULT: "#F3F0EA",
          dim: "rgba(243,240,234,.72)",
          faint: "rgba(243,240,234,.55)",
        },
        orange: { DEFAULT: "#FF6A00", hot: "#FF8A3D" },
        line: { DEFAULT: "rgba(243,240,234,.12)", strong: "rgba(243,240,234,.24)" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "Arial", "sans-serif"],
      },
      // Échelle typographique éditoriale (titres monumentaux -> corps)
      fontSize: {
        "display-2xl": ["clamp(3.4rem,11.5vw,7.25rem)", { lineHeight: ".92", letterSpacing: "-.055em" }],
        "display-xl": ["clamp(2.5rem,8vw,6.25rem)", { lineHeight: ".95", letterSpacing: "-.045em" }],
        "display-lg": ["clamp(1.9rem,5vw,4rem)", { lineHeight: "1.02", letterSpacing: "-.035em" }],
        "display-md": ["clamp(1.4rem,2.6vw,2rem)", { lineHeight: "1.12", letterSpacing: "-.02em" }],
        micro: [".72rem", { lineHeight: "1.4", letterSpacing: ".18em" }],
      },
      borderRadius: { sm: "10px", md: "20px", lg: "32px" },
    },
  },
  plugins: [
    // Interactions réservées aux appareils avec souris (aperçu au survol, aimant...)
    plugin(({ addVariant }) => {
      addVariant("can-hover", "@media (hover: hover) and (pointer: fine)");
    }),
  ],
};

export default config;
