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
  /** Dépôt public (code source), si disponible. */
  repo?: string;
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
    description: "Plateforme de commande et de livraison de repas pour Adzopé : client, restaurant, livreur et administrateur sur une même application.",
    story: [
      "JSE Express met en relation les habitants d'Adzopé et les restaurants de la ville. Un client parcourt les restaurants, compose son panier, choisit son adresse et son mode de paiement, puis suit sa commande jusqu'à la livraison.",
      "Chaque métier a son propre espace : le restaurant gère ses commandes et son menu, le livreur suit ses courses, et l'administrateur pilote l'ensemble — restaurants, livreurs, zones de livraison, tarification, notifications et utilisateurs. Les permissions sont contrôlées côté serveur.",
      "Le projet repose sur un design system « Local Modern » appliqué à tous les écrans, et sur une vingtaine de fichiers de tests automatisés couvrant les parcours sensibles : PIN de livraison, accès administrateur, limitation de requêtes, en-têtes de sécurité, unicité des numéros de téléphone.",
    ],
    features: [
      { title: "Quatre espaces dédiés", text: "Client, restaurant, livreur et administration, avec des interfaces et des droits distincts." },
      { title: "Livraison sécurisée par PIN", text: "Un code PIN généré à la validation de la commande doit être saisi pour clôturer la livraison, vérifié côté serveur." },
      { title: "Zones et tarification", text: "Zones de livraison d'Adzopé, tarifs selon la distance et affectation des livreurs gérées depuis l'administration." },
      { title: "Mobile Money", text: "Paiement prévu via Orange Money, MTN MoMo, Moov Money ou en espèces à la livraison." },
      { title: "Suivi et notifications", text: "Historique des statuts de commande, annulation, notifications dans l'application." },
      { title: "Sécurité", text: "Limitation de débit sur les routes sensibles, en-têtes de sécurité HTTP, intégrité des zones testée." },
    ],
    stack: ["Laravel", "React", "Inertia"],
    repo: "https://github.com/handcode0-create/jse_express",
    status: "En développement",
    accent: "#FF6A00",
    image: "/projects/jse-express.webp",
    imagePosition: "center",
  },
  {
    slug: "devroad",
    name: "DevRoad",
    category: "Learning platform",
    description: "Plateforme d'apprentissage pour développeurs : roadmaps, leçons, exercices, mémos et un DevLab pour coder dans le navigateur.",
    story: [
      "DevRoad rapproche deux choses souvent séparées : apprendre une technologie et écrire réellement du code. Le parcours suit une logique simple — cours, leçon, exercice, code dans le DevLab, validation, puis progression.",
      "Chaque roadmap est une suite d'étapes ordonnées : les étapes futures restent verrouillées, un exercice peut conditionner le passage à la suivante, et la progression est suivie au fil de l'eau. Quinze technologies sont référencées, de Laravel et React à Docker et PostgreSQL, avec une leçon riche par étape.",
      "L'application est une PWA installable en français, avec une documentation intégrée, un thème nuit et des thèmes clairs, et un parcours dédié aux professeurs qui suivent la progression de leurs élèves sans accéder à leurs données privées.",
    ],
    features: [
      { title: "DevLab intégré", text: "Un environnement de développement dans le navigateur : explorateur de fichiers, onglets, éditeur, terminal pédagogique et aperçu." },
      { title: "Roadmaps et exercices", text: "Étapes verrouillées, exercices à valider, passage automatique à l'étape suivante." },
      { title: "Mémos", text: "Les leçons génèrent des mémos organisés en dossiers, avec favoris, pièces jointes et annulation des suppressions." },
      { title: "Documentation en français", text: "Bibliothèque de documentation officielle, traduite automatiquement quand la version française n'existe pas, avec un assistant." },
      { title: "Parcours professeur", text: "Groupes avec code d'invitation, suivi de la progression et des élèves inactifs, sans accès aux mémos ni au code des élèves." },
      { title: "PWA et rappels", text: "Installable sur mobile, avec rappels d'apprentissage par notification push à l'heure choisie." },
    ],
    stack: ["Laravel", "React", "PostgreSQL"],
    repo: "https://github.com/handcode0-create/devroad",
    status: "En développement",
    accent: "#7C5CFC",
    image: "/projects/devroad.webp",
    imagePosition: "center",
  },
  {
    slug: "koro-services",
    name: "Kôrô Services",
    category: "Marketplace",
    description: "Marketplace de services à domicile : un client décrit son besoin, des prestataires vérifiés répondent.",
    story: [
      "Kôrô Services met en relation des clients et des prestataires de services du quotidien. Le client publie une demande — plomberie, électricité, climatisation — avec des photos si besoin, et les prestataires lui répondent.",
      "Le cœur métier est modélisé de bout en bout : demande de service, réponses des prestataires, rendez-vous, intervention, puis avis, publié uniquement après une intervention terminée et validée. Les documents des prestataires sont contrôlés par un administrateur, et les actions sensibles sont tracées.",
      "Le projet est un prototype : l'API Laravel gère aujourd'hui l'authentification et les demandes de service, et l'application mobile Expo reprend le design system issu de la maquette (Poppins, cartes claires, navigation basse à cinq positions).",
    ],
    features: [
      { title: "Demande de service", text: "Création d'une demande avec photos, consultation, annulation, et historique de ses changements de statut." },
      { title: "Prestataires vérifiés", text: "Profils de prestataires avec catégories, zones d'intervention et vérification des documents par un administrateur." },
      { title: "Données locales", text: "Communes et quartiers comme repère géographique, sans dépendre d'une carte." },
      { title: "Avis fiables", text: "Un avis n'est possible qu'après une intervention terminée, et une seule fois par intervention." },
      { title: "API sécurisée", text: "API REST Laravel avec authentification Sanctum et tests automatisés (authentification, demandes)." },
      { title: "Application mobile", text: "Expo et React Native avec routage par fichiers et état géré avec Zustand." },
    ],
    stack: ["React Native", "Laravel", "PostgreSQL"],
    repo: "https://github.com/handcode0-create/koroservice",
    status: "Prototype",
    accent: "#FF8A3D",
    image: "/portfolio-bg/devices.webp",
    imagePosition: "center",
  },
  {
    slug: "rubigo",
    name: "Rubigo",
    category: "Delivery",
    description: "Application de livraison pensée pour Adzopé : catalogue de marchands, commandes suivies et espace livreur.",
    story: [
      "Rubigo est une application de livraison construite pour Adzopé. Le client explore les marchands sur une carte ou une liste, ajoute des produits à son panier, choisit son adresse et suit sa commande ; le panier gère le cas d'un changement de marchand en cours de route.",
      "Quatre rôles se partagent l'application : client, marchand, livreur et administrateur. Les marchands gèrent leur catalogue et le statut de leurs commandes, les livreurs voient les missions disponibles triées par distance, et l'administration valide les demandes professionnelles.",
      "Tout repose sur Supabase : base Postgres avec règles d'accès par ligne, stockage des images produits et fonctions serveur pour les opérations sensibles comme la confirmation de livraison par code PIN ou l'acceptation d'une mission.",
    ],
    features: [
      { title: "Exploration cartographique", text: "Carte des marchands et sélecteur d'adresse, avec une carte de repli centrée sur Adzopé." },
      { title: "Espace livreur", text: "Accueil, missions et historique, avec tri des missions par distance grâce à la géolocalisation." },
      { title: "PIN de livraison", text: "Code généré côté base de données et confirmation par une fonction serveur dédiée." },
      { title: "Missions atomiques", text: "L'acceptation d'une mission est atomique : un seul livreur peut la prendre." },
      { title: "Espace marchand", text: "Catalogue de produits avec images et mise à jour du statut des commandes." },
      { title: "Administration", text: "Validation des demandes d'accès professionnelles et affectation des marchands." },
    ],
    stack: ["React", "TypeScript", "Vite", "Supabase"],
    repo: "https://github.com/handcode0-create/rubigo",
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
    description: "Framework open source de patterns serveur pour Next.js App Router : erreurs typées, route handlers, authentification, webhooks et idempotence.",
    story: [
      "ServerPatterns standardise la couche serveur d'une application Next.js App Router : clients d'API, route handlers et Server Actions partagent le même modèle d'erreurs basé sur un type Result, au lieu de dépendre de try/catch dispersés.",
      "Le framework est livré en trois packages — core, next et cli — en TypeScript strict. Il n'utilise aucun fichier de configuration : les choix se font de façon interactive dans la CLI, qui génère le code dans le projet.",
      "Un site de documentation accompagne le framework, avec guide d'installation, démarrage rapide, référence des primitives, journal des changements, et des fichiers llms.txt pour les agents IA.",
    ],
    features: [
      { title: "Modèle Result", text: "Les opérations renvoient un succès ou une erreur typée, sans exceptions à attraper." },
      { title: "Route handlers validés", text: "Validation des requêtes avec Zod pour les routes GET, POST, PUT et PATCH." },
      { title: "Autorisation", text: "Un wrapper « withAuth » pour protéger routes et actions." },
      { title: "Webhooks", text: "Vérification des signatures HMAC SHA-256 pour recevoir des webhooks en sécurité." },
      { title: "Idempotence", text: "Clés d'idempotence pour éviter qu'une action sensible soit exécutée deux fois." },
      { title: "Pagination", text: "Résolution et normalisation des paramètres de pagination." },
    ],
    stack: ["Next.js", "TypeScript", "Open Source"],
    repo: "https://github.com/handcode0-create/serverpatterns",
    status: "Framework",
    accent: "#E5E5E5",
    image: "/portfolio-bg/hero.webp",
    imagePosition: "center",
  },
];
