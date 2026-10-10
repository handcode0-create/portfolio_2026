"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Enregistrement unique. À importer uniquement depuis des composants client.
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Media queries partagées (matchMedia GSAP) : reduced-motion, largeur, souris. */
export const MQ = {
  ok: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  wide: "(min-width: 768px)",
  hover: "(hover: hover) and (pointer: fine)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
