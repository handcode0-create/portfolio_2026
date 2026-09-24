import type { Config } from "tailwindcss";
const config: Config = {
  content:["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./data/**/*.{js,ts,jsx,tsx,mdx}"],
  theme:{extend:{colors:{ink:"#0B0B0B",orange:"#FF6A00"},fontFamily:{sans:["var(--font-sans)","Arial","sans-serif"]},boxShadow:{glow:"0 0 60px rgba(255,106,0,.16)"}}},
  plugins:[]
};
export default config;