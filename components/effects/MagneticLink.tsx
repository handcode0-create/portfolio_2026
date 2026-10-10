"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  /** 0 = aucun aimant, ~0.3 = discret */
  strength?: number;
  "aria-label"?: string;
};

/**
 * Lien-bouton « magnétique » (souris uniquement). Propriétaire d'animation : Framer Motion.
 * Sur tactile et en reduced-motion : lien standard, avec simple retour au tap.
 */
export function MagneticLink({ href, children, className, external, strength = 0.28, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
      whileTap={{ scale: 0.96 }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </m.a>
  );
}
