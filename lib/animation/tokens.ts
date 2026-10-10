/** Motion tokens (miroir des variables CSS --motion-*), utilisables par Framer Motion. */
export const EASE = {
  standard: [0.4, 0, 0.2, 1],
  emphasized: [0.2, 0, 0, 1],
  enter: [0, 0, 0.2, 1],
  exit: [0.4, 0, 1, 1],
} as const;

export const DUR = { fast: 0.15, normal: 0.3, slow: 0.7 } as const;

export const STAGGER = { xs: 0.03, sm: 0.06, md: 0.1 } as const;
