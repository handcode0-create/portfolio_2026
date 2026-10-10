import { ProjectsIndex, type ProjectRow } from "@/components/sections/ProjectsIndex";
import { Reveal } from "@/components/Motion";
import { projects } from "@/data/projects";
import { getProjectMedia } from "@/lib/project-media";

/** 04 — INTERACTION / 05 — PROOF. Index éditorial des vrais produits. */
export function Projects() {
  const rows: ProjectRow[] = projects.map((project, i) => ({
    slug: project.slug,
    index: String(i + 1).padStart(2, "0"),
    name: project.name,
    category: project.category,
    description: project.description,
    status: project.status,
    stack: project.stack,
    accent: project.accent,
    image: getProjectMedia(project).hero,
    imagePosition: project.imagePosition,
    alt: `${project.name} — aperçu des interfaces (${project.category})`,
  }));

  return (
    <section id="projets" aria-labelledby="projets-title" className="scroll-mt-20 bg-ink py-24 md:py-36">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">
              <span className="node" aria-hidden /> Réalisations — {String(projects.length).padStart(2, "0")}
            </p>
            <Reveal>
              <h2 id="projets-title" className="mt-6 font-display text-display-xl font-semibold">
                Des applications réelles pour des besoins <span className="text-orange">réels.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-3 md:col-start-10">
            <p className="text-sm leading-6 text-paper-dim">
              Une sélection de produits conçus, développés ou prototypés avec une approche centrée sur
              l&apos;expérience utilisateur.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24">
          <ProjectsIndex rows={rows} />
        </div>
      </div>
    </section>
  );
}
