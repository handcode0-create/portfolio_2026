"use client";

/**
 * Primitives Framer Motion (« motion/react »).
 * Propriétaire d'animation : Framer Motion — apparitions de contenu, micro-interactions.
 * Les scènes pilotées par le scroll (hero, manifeste, portrait) appartiennent à GSAP.
 */
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";
import { DUR, EASE, STAGGER } from "@/lib/animation/tokens";

/** Charge le sous-ensemble domAnimation et respecte prefers-reduced-motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

type RevealProps = { children: ReactNode; className?: string; delay?: number; y?: number };

/** Apparition au scroll, une seule fois. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: DUR.slow, ease: EASE.emphasized, delay }}
    >
      {children}
    </m.div>
  );
}

const groupVariants = (stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.emphasized } },
};

/** Conteneur : révèle ses RevealItem l'un après l'autre. */
export function RevealGroup({
  children,
  className,
  stagger = STAGGER.md,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <m.div
      className={className}
      variants={groupVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={itemVariants}>
      {children}
    </m.div>
  );
}

/** Fine barre orange en haut de page : progression du scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-orange"
    />
  );
}
