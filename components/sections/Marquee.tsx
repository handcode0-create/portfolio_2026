import { stackMarquee } from "@/data/site";

/**
 * 02 — CONTEXT. Bandeau de la stack : animation 100 % CSS (aucun JS), pausée au survol,
 * statique en reduced-motion. La 2e copie est masquée aux lecteurs d'écran.
 */
export function Marquee() {
  const group = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {stackMarquee.map((tech) => (
        <li key={tech} className="flex items-center whitespace-nowrap">
          <span className="px-8 font-display text-display-md text-paper-dim md:px-12">{tech}</span>
          <span className="node !animate-none" aria-hidden />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Technologies utilisées" className="marquee overflow-hidden border-y border-line bg-ink-2 py-6 md:py-8">
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </section>
  );
}
