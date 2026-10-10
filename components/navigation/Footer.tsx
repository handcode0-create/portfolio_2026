import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { AbidjanClock } from "@/components/effects/AbidjanClock";
import { nav, site } from "@/data/site";

/** Conclusion de l'expérience : wordmark monumental, liens, heure d'Abidjan. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="container-page grid gap-12 pb-10 pt-16 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-5">
          <p className="eyebrow">
            <span className="node" aria-hidden /> {site.location.city}, {site.location.country}
          </p>
          <p className="mt-6 max-w-sm font-display text-display-md text-paper">
            Des produits numériques conçus pour des usages réels.
          </p>
          <AbidjanClock className="mt-6 inline-flex items-center text-micro uppercase text-paper-faint" />
        </div>

        <nav aria-label="Pied de page" className="md:col-span-3 md:col-start-7">
          <p className="eyebrow">Navigation</p>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="u-link font-display text-lg text-paper-dim hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-3 font-display text-lg text-paper-dim">
            <li>
              <a href={site.contact.emailHref} className="u-link hover:text-paper">
                Email
              </a>
            </li>
            <li>
              <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="u-link hover:text-paper">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={site.contact.github} target="_blank" rel="noopener noreferrer" className="u-link hover:text-paper">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-line py-6 text-sm text-paper-faint sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 handCode Studio — {site.owner.name}.</span>
        <a href="#main" className="u-link inline-flex items-center gap-2 self-start text-paper-dim hover:text-paper sm:self-auto">
          Retour en haut <ArrowUp size={14} aria-hidden />
        </a>
      </div>

      {/* Wordmark rogné : il « sort » de la page */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[.16em] translate-y-[.06em] text-center font-display text-[clamp(4rem,21vw,21rem)] font-bold leading-[.8] tracking-[-.06em] text-ink-3">
          HANCODE<span className="text-orange">.</span>
        </p>
      </div>
    </footer>
  );
}
