# HANCODE Portfolio 2026

Portfolio mobile-first de HANCODE : applications web, mobiles et produits numériques conçus pour des besoins réels en Côte d'Ivoire et au-delà.

Thème **Luxury Dark** (`#0B0B0B` / `#FF6A00`), interfaces orientées produit, animations discrètes et performantes.

## Projets présentés

JSE Express · DevRoad · Kôrô Services · Rubigo · LocaMatch · ServerPatterns

Chaque projet a sa carte sur l'accueil et sa page détaillée (`/projets/<slug>`).

## Stack

| Domaine | Outils |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19 |
| Langage | TypeScript |
| Style | Tailwind CSS 3, polices DM Sans et Space Grotesk |
| Animations | Framer Motion (package `motion`, chargement allégé via `LazyMotion`) |
| Icônes | Lucide React |

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # sert le build
```

## Structure

```
app/
  layout.tsx               # métadonnées, MotionProvider
  page.tsx                 # accueil : hero, projets, à propos, contact
  projets/[slug]/page.tsx  # page détaillée d'un projet
components/
  Hero.tsx  Navbar.tsx  ProjectCard.tsx
  Motion.tsx               # Reveal, RevealGroup/Item, ScrollProgress, Parallax
data/projects.ts           # liste des projets (source unique)
lib/project-media.ts       # détection des captures réelles
public/
  projects/<slug>/         # captures réelles de chaque projet
  portfolio-bg/            # fonds du site (hero, devices, workspace)
  about/me.webp            # photo de la section « Qui suis-je ? »
```

## Ajouter ou modifier un projet

Ajouter une entrée dans `data/projects.ts` :

```ts
{
  slug: "mon-projet",            // devient /projets/mon-projet
  name: "Mon Projet",
  category: "Marketplace",
  description: "Une phrase claire sur le problème résolu.",
  stack: ["Next.js", "TypeScript"],
  status: "MVP",
  accent: "#FF6A00",
  image: "/portfolio-bg/devices.webp"   // visuel de repli
}
```

La carte et la page détaillée sont générées automatiquement.

## Ajouter les captures réelles

Déposer les fichiers `.webp` dans `public/projects/<slug>/` en respectant ces noms :

```
public/projects/jse-express/hero.webp       # image principale (carte + en-tête de page)
public/projects/jse-express/screen-1.webp   # galerie "écran par écran" (1re image en grand)
public/projects/jse-express/screen-2.webp
...                                         # jusqu'à screen-8.webp, sans trou dans la numérotation
```

Aucun code à modifier : `lib/project-media.ts` détecte les fichiers au build et remplace les placeholders. Sans capture réelle, le projet garde son visuel de repli (`image`).

Conseils : format 16:10, `.webp`, 1600 px de large maximum, moins de 200 Ko par image pour rester léger sur mobile.

## Animations

- Apparition au scroll (`Reveal`, `RevealGroup`/`RevealItem`) jouée une seule fois.
- Barre de progression du scroll, parallaxe légère sur le hero, menu mobile animé.
- Hero animé en CSS pur pour un premier affichage sans JavaScript.
- `prefers-reduced-motion` respecté : les animations de mouvement sont désactivées.

## Prochaines étapes

- Remplacer tous les placeholders par les captures réelles.
- Brancher les vrais liens de contact (email, WhatsApp).
- Ajouter une image Open Graph pour le partage des liens.
