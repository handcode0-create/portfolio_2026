export type Project={slug:string;name:string;category:string;description:string;stack:string[];status:string;accent:string};
export const projects:Project[]=[
{slug:"jse-express",name:"JSE Express",category:"Food delivery",description:"Plateforme locale de commande de repas connectant restaurants et clients à Adzopé.",stack:["Laravel","React","Inertia"],status:"En développement",accent:"#FF6A00"},
{slug:"devroad",name:"DevRoad",category:"Learning platform",description:"Plateforme d'apprentissage pour développeurs avec roadmaps, cours, mémos et DevLab.",stack:["Laravel","React","PostgreSQL"],status:"En développement",accent:"#7C5CFC"},
{slug:"koro-services",name:"Kôrô Services",category:"Marketplace",description:"Marketplace de services locaux mettant en relation clients et professionnels vérifiés.",stack:["React Native","Laravel","PostgreSQL"],status:"Prototype",accent:"#FF8A3D"},
{slug:"rubigo",name:"Rubigo",category:"Delivery",description:"Solution de livraison pensée pour un lancement mobile-first à Adzopé.",stack:["React","TypeScript","Vite"],status:"MVP",accent:"#3B82F6"},
{slug:"locamatch",name:"LocaMatch",category:"Real estate",description:"Expérience immobilière pensée pour faciliter la recherche de logements en Côte d'Ivoire.",stack:["Next.js","React","TypeScript"],status:"Concept",accent:"#22C55E"},
{slug:"serverpatterns",name:"ServerPatterns",category:"Open source",description:"Framework de standards serveur léger et pragmatique pour Next.js App Router.",stack:["Next.js","TypeScript","Open Source"],status:"Framework",accent:"#E5E5E5"}
];