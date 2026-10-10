"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/animation/gsap";

/**
 * Scène d'ouverture. Propriétaire d'animation : GSAP.
 * - Intro courte (~1,4 s) : fond, lignes du titre masquées, éléments, panneau.
 * - Parallaxe au scroll (>= 768 px uniquement), réversible, nettoyée au démontage.
 * - reduced-motion : état final immédiat.
 * Les états initiaux sont posés en CSS (voir globals.css) et levés par data-ready.
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, el);

      const mm = gsap.matchMedia(el);
      mm.add({ ok: MQ.ok, reduce: MQ.reduce, wide: MQ.wide }, (ctx) => {
        const { reduce, wide } = ctx.conditions as { reduce: boolean; wide: boolean };
        if (reduce) {
          el.setAttribute("data-ready", "");
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo("[data-bg]", { scale: 1.14 }, { scale: 1, duration: 1.9, ease: "power3.out" }, 0)
          .fromTo(q("[data-line] > span"), { yPercent: 112, opacity: 1 }, { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.1)
          .fromTo(
            q("[data-mask]"),
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power4.inOut", clearProps: "clipPath" },
            0.25,
          )
          .fromTo(q("[data-mask-img]"), { scale: 1.3 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0.25)
          .fromTo(
            q("[data-fade]"),
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, clearProps: "opacity,visibility,transform" },
            0.5,
          );
        // Valeurs de départ désormais posées en ligne par GSAP : on lève les états CSS.
        el.setAttribute("data-ready", "");

        if (wide) {
          const scrub = { trigger: el, start: "top top", end: "bottom top", scrub: true } as const;
          gsap.to("[data-bg]", { yPercent: 16, ease: "none", scrollTrigger: scrub });
          gsap.to(q("[data-mask]"), { yPercent: -9, ease: "none", scrollTrigger: scrub });
        }
      });

      // Les polices peuvent décaler les lignes : recalcule les triggers une fois chargées.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-hero-root aria-labelledby="hero-title" className={className}>
      {children}
    </section>
  );
}
