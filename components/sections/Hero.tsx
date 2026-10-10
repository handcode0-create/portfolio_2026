import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { AbidjanClock } from "@/components/effects/AbidjanClock";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { hero, site } from "@/data/site";
import { projects } from "@/data/projects";

// Retrait éditorial de chaque ligne (asymétrie), uniquement à partir de md
const indents = ["", "md:ml-[8vw]", "", "md:ml-[17vw]"];

/**
 * 01 — HOOK. Composition : fond plein cadre, panneau d'image en superposition derrière le titre,
 * titre monumental asymétrique, microtypographie technique (coordonnées, heure d'Abidjan).
 * Le contenu est rendu côté serveur ; GSAP n'orchestre que l'intro et la parallaxe.
 */
export function Hero() {
  return (
    <HeroMotion className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      {/* Couches de fond */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div data-bg className="absolute inset-0 will-change-transform">
          <Image
            src="/portfolio-bg/hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_50%] opacity-70"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="noise absolute inset-0 opacity-40" />
      </div>

      {/* Panneau d'image (desktop/tablette) — passe derrière le titre pour créer de la profondeur */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[var(--gutter)] top-[18%] z-10 hidden aspect-[3/4] w-[min(26vw,380px)] md:block"
      >
        <div
          data-mask
          className="relative h-full w-full overflow-hidden rounded-md border border-line-strong shadow-[0_30px_120px_rgba(255,106,0,.12)] will-change-transform"
        >
          <div data-mask-img className="absolute inset-0 will-change-transform">
            <Image
              src="/portfolio-bg/devices.webp"
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 26vw, 0px"
              className="object-cover object-[62%_50%]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
        </div>
      </div>

      <div className="container-page relative z-20 flex flex-1 flex-col pb-8 pt-28 md:pt-28">
        {/* Rangée haute */}
        <div className="flex items-start justify-between gap-6">
          <p data-fade className="eyebrow !text-orange">
            <span className="node" aria-hidden /> {hero.eyebrow}
          </p>
          <p data-fade className="eyebrow hidden sm:inline-flex">
            Portfolio 2026 — {String(projects.length).padStart(2, "0")} projets
          </p>
        </div>

        {/* Titre monumental */}
        <h1
          id="hero-title"
          className="mt-8 font-display text-display-2xl font-semibold text-paper md:mt-8"
        >
          {hero.lines.map((line, i) => (
            <span
              key={line}
              data-line
              className={`block overflow-hidden pb-[.12em] -mb-[.12em] ${indents[i]}`}
            >
              <span className={`block will-change-transform ${i === 2 ? "text-orange" : ""}`}>
                {i === hero.lines.length - 1 ? (
                  <>
                    {line.replace(/\.$/, "")}
                    <span className="text-orange">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        {/* Rangée basse */}
        <div className="mt-auto grid gap-10 pt-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6 lg:col-span-5">
            <p data-fade className="max-w-md text-base leading-7 text-paper-dim md:text-lg md:leading-8">
              {hero.lede}
            </p>
            <div data-fade className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticLink href="#projets" className="btn btn-primary">
                Voir mes projets <ArrowUpRight size={17} aria-hidden />
              </MagneticLink>
              <MagneticLink href="#contact" className="btn btn-ghost">
                Me contacter
              </MagneticLink>
            </div>
          </div>

          <div data-fade className="hidden items-end justify-between gap-8 md:col-span-4 md:col-start-9 md:flex md:flex-col md:items-end">
            <div className="text-right">
              <p className="eyebrow !text-paper-dim">
                {site.location.city}, {site.location.country}
              </p>
              <p className="mt-2 text-micro uppercase text-paper-faint">{site.location.coords}</p>
              <AbidjanClock className="mt-2 inline-flex items-center text-micro uppercase text-paper-faint" />
            </div>
            <a href="#projets" className="group flex items-center gap-3 text-micro uppercase text-paper-faint hover:text-paper">
              Défiler
              <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-line-strong">
                <span className="scroll-cue absolute inset-0 bg-orange" />
              </span>
              <ArrowDown size={14} aria-hidden className="sr-only" />
            </a>
          </div>
        </div>
      </div>
    </HeroMotion>
  );
}
