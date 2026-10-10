import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Motion";
import { projects } from "@/data/projects";
import { getProjectMedia } from "@/lib/project-media";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  const media = getProjectMedia(project);
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} — HANCODE`,
      description: project.description,
      images: [{ url: media.hero, width: 1280, height: 800, alt: `${project.name} — aperçu des interfaces` }],
    },
  };
}

// Compositions asymétriques de la galerie (alternance de largeurs et de décalages)
const galleryLayout = [
  "md:col-span-7",
  "md:col-span-5 md:mt-24",
  "md:col-span-5",
  "md:col-span-7 md:mt-24",
];

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const position = projects.findIndex((item) => item.slug === slug);
  if (position === -1) notFound();

  const project = projects[position];
  const next = projects[(position + 1) % projects.length];
  const media = getProjectMedia(project);
  const nextMedia = getProjectMedia(next);

  return (
    <article>
      <header className="container-page pt-28 md:pt-40">
        <div className="reveal flex items-center justify-between gap-6">
          <Link href="/#projets" className="u-link inline-flex items-center gap-2 font-display text-sm text-paper-dim hover:text-paper">
            <ArrowLeft size={16} aria-hidden /> Tous les projets
          </Link>
          <span className="eyebrow">
            {String(position + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <p className="reveal reveal-delay-1 eyebrow mt-14 md:mt-20">
          <span className="node" aria-hidden /> {project.category}
        </p>
        <h1 className="reveal reveal-delay-1 mt-6 font-display text-display-2xl font-semibold">{project.name}</h1>
        <p className="reveal reveal-delay-2 mt-8 max-w-2xl text-lg leading-8 text-paper-dim">{project.description}</p>

        <dl className="reveal reveal-delay-3 mt-12 grid gap-8 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className="eyebrow">Statut</dt>
            <dd className="mt-3 flex items-center gap-3 font-display text-display-md">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: project.accent }} />
              {project.status}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Catégorie</dt>
            <dd className="mt-3 font-display text-display-md">{project.category}</dd>
          </div>
          <div>
            <dt className="eyebrow">Stack</dt>
            <dd className="mt-3 font-display text-display-md">{project.stack.join(" · ")}</dd>
          </div>
        </dl>

        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal reveal-delay-3 btn btn-ghost mt-10"
          >
            Voir le code sur GitHub <ArrowUpRight size={16} aria-hidden />
          </a>
        )}
      </header>

      <div className="container-page mt-14">
        <div className="reveal reveal-delay-3 relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-ink-2">
          <Image
            src={media.hero}
            alt={`${project.name} — aperçu des interfaces`}
            fill
            priority
            sizes="(min-width: 1320px) 1320px, 100vw"
            className="object-cover"
            style={{ objectPosition: project.imagePosition ?? "center" }}
          />
        </div>
      </div>

      <section aria-labelledby="projet-title" className="container-page mt-24 md:mt-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 id="projet-title" className="eyebrow">
              <span className="node" aria-hidden /> Le projet
            </h2>
          </div>
          <div className="space-y-6 md:col-span-7">
            {project.story.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-paper-dim first:text-xl first:text-paper md:first:text-2xl md:first:leading-10">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <RevealGroup className="mt-16 border-t border-line">
          {project.features.map((feature, i) => (
            <RevealItem key={feature.title} className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-10">
              <span className="font-display text-micro uppercase text-orange md:col-span-1 md:pt-2">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-display-md font-semibold md:col-span-4">{feature.title}</h3>
              <p className="leading-7 text-paper-dim md:col-span-6 md:col-start-7">{feature.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {media.screens.length > 0 && (
        <section aria-labelledby="apercu-title" className="container-page mt-24 md:mt-36">
          <h2 id="apercu-title" className="eyebrow">
            <span className="node" aria-hidden /> Aperçu — écran par écran
          </h2>
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-12 md:gap-8">
            {media.screens.map((src, i) => (
              <RevealItem key={src} className={galleryLayout[i % galleryLayout.length]}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-ink-2">
                  <Image
                    src={src}
                    alt={`${project.name} — écran ${i + 1}`}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Projet suivant */}
      <section aria-label="Projet suivant" className="mt-28 border-t border-line md:mt-44">
        <Link href={`/projets/${next.slug}`} className="group relative block overflow-hidden">
          <Image
            src={nextMedia.hero}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover opacity-25 transition duration-700 ease-[cubic-bezier(.2,0,0,1)] can-hover:group-hover:scale-105 can-hover:group-hover:opacity-45"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/20" />
          <div className="container-page relative flex items-end justify-between gap-6 py-20 md:py-32">
            <div>
              <p className="eyebrow">Projet suivant</p>
              <p className="mt-5 font-display text-display-2xl font-semibold transition-colors duration-300 can-hover:group-hover:text-orange">
                {next.name}
              </p>
            </div>
            <span
              aria-hidden
              className="mb-2 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line-strong transition duration-300 can-hover:group-hover:border-orange can-hover:group-hover:bg-orange can-hover:group-hover:text-ink md:h-20 md:w-20"
            >
              <ArrowUpRight size={26} />
            </span>
          </div>
        </Link>
      </section>
    </article>
  );
}
