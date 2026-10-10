"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/animation/gsap";

/**
 * Révélation du manifeste mot à mot, liée au scroll (scrub). Propriétaire d'animation : GSAP.
 * reduced-motion : texte entièrement visible, sans animation.
 */
export function ManifestoMotion({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia(el);

      mm.add(MQ.ok, () => {
        const words = gsap.utils.toArray<HTMLElement>("[data-word]", el);
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 60%", scrub: 0.4 },
          },
        );
        el.setAttribute("data-ready", "");
      });
      mm.add(MQ.reduce, () => el.setAttribute("data-ready", ""));

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} data-manifesto className={className}>
      {children}
    </div>
  );
}
