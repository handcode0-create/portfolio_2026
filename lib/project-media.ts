import fs from "node:fs";
import path from "node:path";
import type { Project } from "@/data/projects";

const MAX_SCREENS = 8;

const exists = (publicPath: string) =>
  fs.existsSync(path.join(process.cwd(), "public", publicPath));

export type ProjectMedia = {
  /** Image principale : hero réel s'il existe, sinon le placeholder du projet. */
  hero: string;
  /** Captures réelles trouvées, dans l'ordre screen-1, screen-2, ... */
  screens: string[];
  /** true dès qu'au moins une capture réelle est présente. */
  hasRealMedia: boolean;
};

/**
 * Convention : déposer les captures dans public/projects/<slug>/
 *   hero.webp, screen-1.webp, screen-2.webp, ... (jusqu'à screen-8.webp)
 * Aucun code à modifier : le build détecte les fichiers et remplace les placeholders.
 * Exécuté côté serveur (composants serveur / build) uniquement.
 */
export function getProjectMedia(project: Project): ProjectMedia {
  const dir = `/projects/${project.slug}`;
  const heroPath = `${dir}/hero.webp`;
  const hasHero = exists(heroPath);

  const screens: string[] = [];
  for (let i = 1; i <= MAX_SCREENS; i++) {
    const screenPath = `${dir}/screen-${i}.webp`;
    if (!exists(screenPath)) break;
    screens.push(screenPath);
  }

  return {
    hero: hasHero ? heroPath : project.image,
    screens,
    hasRealMedia: hasHero || screens.length > 0,
  };
}
