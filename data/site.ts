/**
 * Source unique du contenu éditorial et des liens du site.
 * Modifier ici (email, WhatsApp, GitHub...) met à jour tout le portfolio.
 */
const email = "handcode0@gmail.com";
const whatsapp = "2250160706221"; // format international, sans « + » ni espaces

export const site = {
  name: "HANCODE",
  owner: { name: "Smith Junior", role: "Fondateur de handCode Corp" },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-2026-fawn-theta.vercel.app",
  title: "HANCODE — Digital Products",
  description:
    "Portfolio de HANCODE — applications web, mobiles et produits numériques conçus pour des besoins réels en Côte d'Ivoire et au‑delà.",
  location: { city: "Abidjan", country: "Côte d'Ivoire", coords: "5.36° N · 4.01° O" },
  contact: {
    email,
    emailHref: `mailto:${email}?subject=${encodeURIComponent("Projet — prise de contact")}`,
    whatsappHref: `https://wa.me/${whatsapp}?text=${encodeURIComponent("Bonjour HANCODE, j'ai un projet en tête.")}`,
    github: "https://github.com/handcode0-create",
  },
} as const;

export const nav = [
  { label: "Projets", id: "projets", href: "/#projets" },
  { label: "À propos", id: "a-propos", href: "/#a-propos" },
  { label: "Contact", id: "contact", href: "/#contact" },
] as const;

export const hero = {
  lines: ["Je conçois", "des produits", "numériques", "utiles."],
  lede: "Des applications web et mobiles modernes pour résoudre des problèmes réels en Côte d'Ivoire et au‑delà.",
  eyebrow: "Développeur full-stack",
} as const;

export const manifesto = {
  text: "Je développe des expériences numériques modernes en combinant produit, design et ingénierie. Mon objectif est de transformer une idée en interface claire, performante et réellement utilisable.",
  emphasis: ["produit", "design", "ingénierie", "interface"],
} as const;

export const approach = [
  { title: "Produit", text: "Conception orientée besoins réels et usages locaux." },
  { title: "UX / UI", text: "Interface claire, responsive et pensée mobile-first." },
  { title: "Technologie", text: "Architecture moderne avec une stack adaptée au produit." },
] as const;

/** Technologies réellement présentes dans les projets (data/projects.ts). */
export const stackGroups = [
  { title: "Front-end", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"] },
  { title: "Back-end & données", items: ["Laravel", "Inertia", "PostgreSQL"] },
  { title: "Mobile", items: ["React Native"] },
] as const;

export const stackMarquee = [
  "Laravel",
  "React",
  "Inertia",
  "PostgreSQL",
  "React Native",
  "TypeScript",
  "Vite",
  "Next.js",
  "Tailwind CSS",
] as const;
