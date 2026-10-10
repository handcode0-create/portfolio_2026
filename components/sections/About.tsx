import Image from "next/image";
import { AboutMotion } from "@/components/sections/AboutMotion";
import { Reveal, RevealGroup, RevealItem } from "@/components/Motion";
import { approach, site, stackGroups } from "@/data/site";

/** 03 — STORY. Portrait en masque, positionnement, approche et stack réelle. */
export function About() {
  return (
    <section id="a-propos" aria-labelledby="apropos-title" className="scroll-mt-20 border-t border-line bg-ink-2 py-24 md:py-36">
      <div className="container-page grid gap-14 md:grid-cols-12 md:gap-10">
        <AboutMotion className="md:col-span-5">
          <div data-portrait className="relative aspect-[2/3] w-full overflow-hidden rounded-md border border-line-strong md:sticky md:top-28">
            <div data-portrait-img className="absolute inset-0 will-change-transform">
              <Image
                src="/about/me.webp"
                alt={`Portrait de ${site.owner.name}, ${site.owner.role}`}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <p className="absolute inset-x-5 bottom-5 font-display text-sm text-paper">
              <span className="block text-lg font-semibold">{site.owner.name}</span>
              <span className="text-micro uppercase text-paper-dim">{site.owner.role}</span>
            </p>
          </div>
        </AboutMotion>

        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow">
            <span className="node" aria-hidden /> À propos
          </p>
          <Reveal>
            <h2 id="apropos-title" className="mt-6 font-display text-display-xl font-semibold">
              Je construis des produits, <span className="text-orange">pas seulement du code.</span>
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 border-t border-line">
            {approach.map((item, i) => (
              <RevealItem key={item.title} className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-line py-7 md:gap-x-10">
                <span className="pt-1 font-display text-micro uppercase text-orange">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-display-md font-semibold">{item.title}</h3>
                  <p className="mt-2 max-w-md leading-7 text-paper-dim">{item.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-14">
            <h3 className="eyebrow">Technologies utilisées dans mes projets</h3>
            <dl className="mt-6 grid gap-6 sm:grid-cols-3">
              {stackGroups.map((group) => (
                <div key={group.title}>
                  <dt className="font-display text-sm font-semibold text-paper">{group.title}</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((tech) => (
                      <span key={tech} className="rounded-full border border-line-strong px-3 py-1 text-sm text-paper-dim">
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
