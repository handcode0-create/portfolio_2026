export type ProjectFeature = { title: string; text: string };

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Phrase d'accroche (listes, métadonnées). */
  description: string;
  /** Présentation détaillée, un paragraphe par entrée. */
  story: string[];
  /** Points clés réellement implémentés ou définis dans le produit. */
  features: ProjectFeature[];
  stack: string[];
  status: string;
  accent: string;
  image: string;
  imagePosition?: string;
};

export const projects: Project[] = [
  {
    slug: "jse-express",
    name: "JSE Express",
    category: "Food delivery",
    description: "Plateforme locale de commande de repas connectant restaurants et clients à Adzopé.",
    story: [
      "JSE Express est une plateforme web de commande et de livraison de repas et de boissons, pensée pour un lancement à Adzopé. Quatre acteurs y travaillent ensemble : le client, le restaurant, le livreur et l'administrateur, chacun avec ses propres droits contrôlés côté serveur.",
      "Le produit suit un design system « Local Modern » : maquettes complètes du parcours client (accueil, restaurant, panier, livraison, paiement, suivi) et de l'espace restaurant (tableau de bord, commandes, menu), avec un système de design tokens pour garder une interface cohérente.",
    ],
    features: [
      { title: "Livraison par zones", text: "Les livreurs sont attribués selon les quartiers et secteurs d'Adzopé, avec réattribution manuelle possible par l'administrateur." },
      { title: "Code PIN de livraison", text: "Un PIN à 6 chiffres est généré à la validation de la commande et vérifié côté serveur : une livraison ne peut pas être clôturée sans lui." },
      { title: "Frais selon la distance", text: "Les frais de livraison sont calculés d'après la distance entre le restaurant et le client, avec un tarif dédié aux villages alentour." },
      { title: "Mobile Money", text: "Paiement prévu via Orange Money, MTN MoMo, Moov Money ou en espèces à la livraison." },
      { title: "Suivi de commande", text: "Statuts clairs de la réception à la livraison : reçue, confirmée, en préparation, prête, en livraison, livrée." },
    ],
    stack: ["Laravel", "React", "Inertia"],
    status: "En développement",
    accent: "#FF6A00",
    image: "/projects/jse-express.webp",
    imagePosition: "center",
  },
  {
    slug: "devroad",
    name: "DevRoad",
    category: "Learning platform",
    description: "Plateforme d'apprentissage pour développeurs avec roadmaps, cours, mémos et DevLab.",
    story: [
      "DevRoad est une application web mobile-first qui aide les développeurs à structurer leur apprentissage : roadmaps techniques à suivre étape par étape, fiches mémo pour retenir l'essentiel et un espace DevLab pour pratiquer.",
      "C'est mon produit EdTech. Le lancement est prévu à Adzopé avec un groupe de professeurs et d'étudiants bêta-testeurs, l'objectif étant de valider l'usage avant d'élargir.",
    ],
    features: [
      { title: "Roadmaps et progression", text: "Des parcours découpés en étapes avec statuts et pourcentage de progression calculé automatiquement." },
      { title: "Fiches mémo", text: "Mémos riches, favoris, tags propres à chaque utilisateur, dossiers imbriqués et déplacement par glisser-déposer." },
      { title: "Recherche globale", text: "Une recherche unique à travers les roadmaps, les mémos et les étapes." },
      { title: "Qualité", text: "Une suite de tests automatisés couvre le backend (roadmaps, étapes, mémos, tags, recherche, tableau de bord)." },
      { title: "Interface", text: "Navigation latérale sur ordinateur, barre basse sur mobile, interface en français." },
    ],
    stack: ["Laravel", "React", "PostgreSQL"],
    status: "En développement",
    accent: "#7C5CFC",
    image: "/projects/devroad.webp",
    imagePosition: "center",
  },
  {
    slug: "koro-services",
    name: "Kôrô Services",
    category: "Marketplace",
    description: "Marketplace de services locaux mettant en relation clients et professionnels vérifiés.",
    story: [
      "Kôrô est une application mobile de proximité pour la Côte d'Ivoire : elle met en relation des clients, des entreprises, des prestataires et des manœuvres pour des missions et services du quotidien.",
      "Le projet est au stade de prototype. La direction visuelle est définie — interface minimale en cartes arrondies avec un accent orange — et l'application est pensée avec plusieurs thèmes (clair, sombre).",
    ],
    features: [
      { title: "Mise en relation", text: "Clients, entreprises, prestataires et manœuvres sur une même plateforme de missions." },
      { title: "Prestataires vérifiés", text: "Le principe : mettre en avant des professionnels de confiance plutôt qu'un annuaire ouvert." },
      { title: "Multi-thèmes", text: "Thèmes clair et sombre prévus dès la conception de l'interface." },
    ],
    stack: ["React Native", "Laravel", "PostgreSQL"],
    status: "Prototype",
    accent: "#FF8A3D",
    image: "/portfolio-bg/devices.webp",
    imagePosition: "center",
  },
  {
    slug: "rubigo",
    name: "Rubigo",
    category: "Delivery",
    description: "Solution de livraison pensée pour un lancement mobile-first à Adzopé.",
    story: [
      "Rubigo est une plateforme de livraison construite pour Adzopé, avec deux expériences distinctes : celle du client et celle du livreur. L'interface est pensée mobile-first, avec une navigation basse flottante pour chaque rôle.",
      "Le backend repose sur Supabase (Postgres, Storage, règles d'accès par ligne) et des fonctions serveur qui protègent les opérations sensibles comme la confirmation de livraison.",
    ],
    features: [
      { title: "Espace livreur", text: "Trois onglets (Accueil, Missions, Historique) avec tri des missions par distance grâce à la géolocalisation." },
      { title: "Livraison sécurisée par PIN", text: "La confirmation de livraison passe par une fonction serveur dédiée plutôt que par le navigateur." },
      { title: "Missions atomiques", text: "L'acceptation d'une mission est atomique : un seul livreur peut la prendre." },
      { title: "Catalogue marchands", text: "Catalogue de produits par marchand avec images stockées sur Supabase Storage." },
      { title: "Données réelles", text: "Profil et statistiques alimentés par les données en direct, carrousel de marchands sur l'accueil." },
    ],
    stack: ["React", "TypeScript", "Vite", "Supabase"],
    status: "MVP",
    accent: "#3B82F6",
    image: "/portfolio-bg/devices.webp",
    imagePosition: "center",
  },
  {
    slug: "locamatch",
    name: "LocaMatch",
    category: "Real estate",
    description: "Expérience immobilière pensée pour faciliter la recherche de logements en Côte d'Ivoire.",
    story: [
      "LocaMatch est un concept d'application immobilière pour simplifier la recherche de logements en Côte d'Ivoire : parcourir des annonces, filtrer par type de bien et situer les logements sur une carte.",
      "Le projet en est au stade de la conception : l'effort porte sur les écrans mobile et web, avant le développement.",
    ],
    features: [
      { title: "Recherche par filtres", text: "Appartements, maisons, chambres : un filtrage par type, prix et équipements." },
      { title: "Vue carte", text: "Les logements sont aussi présentés sur une carte pour se repérer par quartier." },
      { title: "Mobile et web", text: "Une même expérience conçue pour smartphone et ordinateur." },
    ],
    stack: ["Next.js", "React", "TypeScript"],
    status: "Concept",
    accent: "#22C55E",
    image: "/portfolio-bg/workspace.webp",
    imagePosition: "center",
  },
  {
    slug: "serverpatterns",
    name: "ServerPatterns",
    category: "Open source",
    description: "Framework de standards serveur léger et pragmatique pour Next.js App Router.",
    story: [
      "ServerPatterns est un framework open source qui apporte des briques serveur éprouvées à Next.js App Router, pour ne pas réécrire à chaque projet les mêmes mécanismes d'authentification, de cache ou de sécurité.",
      "Il est publié en trois packages — core, next et cli — en TypeScript strict.",
    ],
    features: [
      { title: "Autorisation", text: "Un garde « withAuth » avec gestion des rôles (RBAC)." },
      { title: "Protection des API", text: "Limitation de débit (rate limiting) et vérification de signature HMAC pour les webhooks." },
      { title: "Données", text: "Primitives de pagination et de cache." },
      { title: "Route handlers", text: "Des helpers pour écrire des route handlers cohérents." },
      { title: "Architecture", text: "Trois packages : @serverpatterns/core, /next et /cli." },
    ],
    stack: ["Next.js", "TypeScript", "Open Source"],
    status: "Framework",
    accent: "#E5E5E5",
    image: "/portfolio-bg/hero.webp",
    imagePosition: "center",
  },
];
