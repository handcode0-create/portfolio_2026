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
| Animations | GSAP + ScrollTrigger (`gsap`, `@gsap/react`), Motion for React (`motion`, via `LazyMotion`) |
| Icônes | Lucide React |
| Backend | [ServerPatterns](https://serverpatterns.vercel.app) (`@serverpatterns/core`, `@serverpatterns/next`), Zod, Supabase (API REST) |

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
  layout.tsx               # polices, métadonnées, navbar, footer, MotionProvider
  page.tsx                 # accueil : Hero, Marquee, Manifesto, Projects, About, Contact
  projets/[slug]/page.tsx  # page éditoriale d'un projet
  not-found.tsx            # 404
components/
  sections/                # Hero, Manifesto, Projects(Index), About, Contact (+ *Motion = îlots GSAP)
  navigation/              # Navbar (menu plein écran), Footer
  effects/                 # MagneticLink, AbidjanClock
  Motion.tsx               # Reveal, RevealGroup/Item, ScrollProgress (Framer Motion)
lib/animation/             # tokens de motion, setup GSAP + ScrollTrigger
lib/project-media.ts       # détection des captures réelles
data/site.ts               # contenus et contacts du site (email, WhatsApp, GitHub)
data/projects.ts           # liste des projets (source unique)
public/
  projects/<slug>/         # captures réelles de chaque projet
  portfolio-bg/            # fonds du site (hero, devices, workspace)
  about/me.webp            # portrait de la section À propos
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

## Direction artistique et animations

Concept « Signal » : des produits envoyés depuis Abidjan (point orange, coordonnées, heure locale). Noir `#0B0B0B`, orange `#FF6A00`, blanc cassé, Space Grotesk + DM Sans.

Un seul propriétaire d'animation par propriété :

- **GSAP + ScrollTrigger** : intro du hero, parallaxe, révélation du manifeste mot à mot, masque du portrait, aperçu qui suit le curseur dans l'index des projets.
- **Framer Motion** : navbar (masquage au scroll), menu plein écran, apparitions au scroll, liens magnétiques, barre de progression.
- **CSS** : survols, bandeau défilant, pulsation du point.

Accessibilité et performance : `prefers-reduced-motion` supprime les mouvements (contenu final affiché directement), contenu lisible sans JS, interactions souris limitées aux appareils `hover: hover`, focus clavier visible, lien d'évitement, animation de `transform`/`opacity` uniquement.

Le contenu d'accueil est rendu côté serveur ; seuls les îlots d'animation sont des composants client.

## Formulaire de contact (backend ServerPatterns + Supabase)

Le formulaire de la fin de bande (`components/recorder/ContactForm.tsx`) appelle une Server Action ; les messages sont enregistrés dans la table Supabase `contact_messages`.

| Fichier | Rôle |
| --- | --- |
| `lib/actions/send-contact-message.ts` | Server Action générée par `serverpatterns add action`, puis complétée : validation Zod, champ piège anti-robot, limite de 3 messages / 10 min par IP |
| `lib/services/contact-messages.ts` | Insertion dans Supabase, renvoie un `Result` ; les détails techniques restent dans les logs |
| `lib/api/supabase.ts` | Client `createApiClient` vers l'API REST de Supabase (pas de SDK) |
| `supabase/migrations/…_contact_messages.sql` | Table + RLS activé sans policy |

Mise en place :

1. Créer un projet sur [supabase.com](https://supabase.com), puis dans **SQL Editor** exécuter le fichier `supabase/migrations/20261028000000_contact_messages.sql`.
2. Copier `.env.example` en `.env.local` et renseigner `SUPABASE_URL` et `SUPABASE_SECRET_KEY` (Project Settings > API Keys : clé secrète `sb_secret_…`, ou l'ancienne clé `service_role`).
3. Sur Vercel : ajouter les deux mêmes variables (Settings > Environment Variables), puis redéployer.

Les messages se lisent dans Supabase, **Table Editor > contact_messages**.

Limites connues :
- La limite par IP est en mémoire : chaque instance serverless a son propre compteur. C'est un frein contre le spam, pas une protection stricte (pour ça, brancher un store Upstash sur `createRateLimiter`).
- Pas de notification email à la réception d'un message pour l'instant.
- Les packages ServerPatterns ne sont pas encore sur npm : ils sont installés depuis `vendor/*.tgz`. Une fois publiés, remplacer les chemins `file:vendor/…` du `package.json` par des versions.

## Qualité

```bash
npx tsc --noEmit   # types
npm run lint       # ESLint (flat config, next/core-web-vitals)
npm run build
```

## Prochaines étapes

- Remplacer tous les placeholders par les captures réelles.
- Vérifier les liens de contact dans `data/site.ts` (email, WhatsApp).
- Ajouter une image Open Graph pour le partage des liens.
