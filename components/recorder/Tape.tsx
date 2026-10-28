import Link from "next/link";
import { approach, hero, manifesto, site } from "@/data/site";
import { projects } from "@/data/projects";
import { ContactForm } from "./ContactForm";

/**
 * Contenu imprimé sur la bande. Composant serveur : tout est lisible et indexable sans JS.
 * Chaque <section data-take> est une « prise » ; le moteur (RecorderEngine) la fait défiler
 * sous la tête d'impression.
 */

const pad = (n: number) => String(n).padStart(2, "0");

/** Met en exergue les mots-clés du manifeste comme des tampons encrés. */
function Stamped({ text, words }: { text: string; words: readonly string[] }) {
  const parts = text.split(new RegExp(`(${words.join("|")})`, "g"));
  return (
    <>
      {parts.map((part, i) =>
        words.includes(part) ? (
          <mark key={i} className="tp-stamp">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function TakeLabel({ n, title, note }: { n: number; title: string; note?: string }) {
  return (
    <p className="tp-label">
      <span>Prise {pad(n)}</span>
      <span aria-hidden>—</span>
      <span>{title}</span>
      {note ? <span className="tp-label-note">{note}</span> : null}
    </p>
  );
}

export function Tape() {
  const [first, ...rest] = hero.lines;
  const last = rest.pop();

  return (
    <>
      {/* 00 — MISE SOUS TENSION */}
      <section id="debut" data-take="00" aria-labelledby="t00" className="tp-take tp-take--open">
        <TakeLabel n={0} title="Mise sous tension" note={site.location.coords} />

        <h1 id="t00" className="tp-title">
          <span className="tp-line">{first}</span>
          {rest.map((line) => (
            <span key={line} className="tp-line tp-line--in">
              {line}
            </span>
          ))}
          <span className="tp-line tp-line--heavy">{last}</span>
        </h1>

        <div className="tp-open-aside">
          <p className="tp-who">
            <strong>{site.owner.name}</strong>
            <span>{site.owner.role}</span>
            <span>{hero.eyebrow} · {site.location.city}</span>
          </p>
          <p className="tp-lede">{hero.lede}</p>
        </div>
      </section>

      {/* 01 — CALIBRAGE (manifeste) */}
      <section id="calibrage" data-take="01" aria-labelledby="t01" className="tp-take tp-take--calib">
        <TakeLabel n={1} title="Calibrage" />
        <h2 id="t01" className="sr-only">
          Méthode
        </h2>
        <p className="tp-manifesto">
          <Stamped text={manifesto.text} words={manifesto.emphasis} />
        </p>
        <ol className="tp-channels">
          {approach.map((a, i) => (
            <li key={a.title}>
              <span className="tp-ch">CH.{pad(i + 1)}</span>
              <strong>{a.title}</strong>
              <span>{a.text}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Sommaire provisoire : les prises plein cadre arrivent à l'étape suivante. */}
      <section id="prises" data-take="02" aria-labelledby="t02" className="tp-take tp-take--index">
        <TakeLabel n={2} title="Sommaire des prises" note={`${projects.length} projets`} />
        <h2 id="t02" className="tp-h2">Projets</h2>
        <ol className="tp-index">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/projets/${p.slug}`} className="tp-index-link">
                <span className="tp-ch">{pad(i + 3)}</span>
                <span className="tp-index-name">{p.name}</span>
                <span className="tp-index-meta">
                  {p.category} · {p.status}
                </span>
                <span aria-hidden className="tp-index-go">
                  ▶
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Fin de bande */}
      <section id="contact" data-take="fin" aria-labelledby="tfin" className="tp-take tp-take--end">
        <p className="tp-label">
          <span>Fin de bande</span>
          <span aria-hidden>■</span>
        </p>
        <h2 id="tfin" className="tp-h2">On enregistre le vôtre ?</h2>
        <ContactForm />
        <p className="tp-form-note">Ou directement :</p>
        <div className="tp-actions">
          <a href={site.contact.emailHref} className="tp-btn tp-btn--rec">
            <span aria-hidden className="tp-rec-dot" /> {site.contact.email}
          </a>
          <a href={site.contact.whatsappHref} className="tp-btn" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={site.contact.github} className="tp-btn" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </section>
    </>
  );
}
