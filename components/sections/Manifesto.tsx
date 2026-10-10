import { Fragment } from "react";
import { ManifestoMotion } from "@/components/sections/ManifestoMotion";
import { manifesto } from "@/data/site";

const strip = (word: string) => word.replace(/[.,;:!?]/g, "").toLowerCase();

/** 03 — STORY. Un énoncé typographique unique ; les mots-clés ressortent en orange. */
export function Manifesto() {
  const words = manifesto.text.split(" ");
  return (
    <section aria-labelledby="manifesto-title" className="relative bg-ink py-28 md:py-44">
      <div className="container-page grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <h2 id="manifesto-title" className="eyebrow">
            <span className="node" aria-hidden /> Manifeste
          </h2>
        </div>
        <ManifestoMotion className="md:col-span-9">
          <p className="font-display text-display-lg font-medium text-paper">
            {words.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                <span
                  data-word
                  className={`inline-block ${manifesto.emphasis.some((k) => k === strip(word)) ? "text-orange" : ""}`}
                >
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </p>
        </ManifestoMotion>
      </div>
    </section>
  );
}
