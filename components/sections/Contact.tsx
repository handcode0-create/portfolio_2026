import Image from "next/image";
import { ArrowUpRight, Github, Mail, MessageCircle } from "lucide-react";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { Reveal } from "@/components/Motion";
import { site } from "@/data/site";

/** 06 — CONVERSION. Appel à l'action unique, liens fonctionnels, email visible. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate scroll-mt-20 overflow-hidden border-t border-line bg-ink py-28 md:py-44">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/portfolio-bg/workspace.webp"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-[35%_40%] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />
      </div>

      <div className="container-page">
        <p className="eyebrow">
          <span className="node" aria-hidden /> Contact
        </p>
        <Reveal>
          <h2 id="contact-title" className="mt-6 max-w-5xl font-display text-display-2xl font-semibold">
            Un projet en tête ? <span className="text-orange">Construisons-le.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-8 text-paper-dim">
            Disponible pour de nouveaux produits, collaborations et missions freelance.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-wrap gap-3">
          <MagneticLink href={site.contact.emailHref} className="btn btn-primary">
            <Mail size={18} aria-hidden /> Écrire un email
          </MagneticLink>
          <MagneticLink href={site.contact.whatsappHref} external className="btn btn-ghost">
            <MessageCircle size={18} aria-hidden /> WhatsApp <ArrowUpRight size={16} aria-hidden />
          </MagneticLink>
          <MagneticLink href={site.contact.github} external className="btn btn-ghost">
            <Github size={18} aria-hidden /> GitHub <ArrowUpRight size={16} aria-hidden />
          </MagneticLink>
        </Reveal>

        <p className="mt-10 text-sm text-paper-faint">
          Ou directement :{" "}
          <a href={`mailto:${site.contact.email}`} className="u-link text-paper">
            {site.contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}
