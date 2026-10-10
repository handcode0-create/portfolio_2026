"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/animation/gsap";

/**
 * Portrait : révélation par masque (clip-path) à l'entrée, puis léger parallaxe.
 * Propriétaire d'animation : GSAP. reduced-motion : portrait visible, immobile.
 */
export function AboutMotion({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia(el);

      mm.add({ ok: MQ.ok, wide: MQ.wide }, (ctx) => {
        const { wide } = ctx.conditions as { wide: boolean };
        const mask = el.querySelector<HTMLElement>("[data-portrait]");
        const img = el.querySelector<HTMLElement>("[data-portrait-img]");
        if (!mask || !img) {
          el.setAttribute("data-ready", "");
          return;
        }

        gsap.set(mask, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(img, { scale: 1.18 });
        el.setAttribute("data-ready", "");

        gsap
          .timeline({ scrollTrigger: { trigger: mask, start: "top 80%", once: true } })
          .to(mask, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.out" })
          .to(img, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);

        if (wide) {
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: mask, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
      mm.add(MQ.reduce, () => el.setAttribute("data-ready", ""));

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} data-about className={className}>
      {children}
    </div>
  );
}
