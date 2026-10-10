"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, MQ } from "@/lib/animation/gsap";
import { Reveal } from "@/components/Motion";

export type ProjectRow = {
  slug: string;
  index: string;
  name: string;
  category: string;
  status: string;
  stack: string[];
  accent: string;
  image: string;
  imagePosition?: string;
  alt: string;
};

type Preview = {
  place: (x: number, y: number) => void;
  move: (x: number, y: number) => void;
  show: () => void;
  hide: () => void;
};

const PREVIEW_W = 384;

/**
 * Index éditorial des réalisations.
 * - Desktop (souris) : liste typographique + aperçu qui suit le curseur (propriétaire : GSAP).
 *   Accessible au clavier : le focus affiche aussi l'aperçu.
 * - Tactile : chaque ligne affiche son visuel en ligne, aucun survol requis.
 * - Apparition des lignes au scroll : Framer Motion (Reveal). Survols visuels : CSS.
 */
export function ProjectsIndex({ rows }: { rows: ProjectRow[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const previewEl = useRef<HTMLDivElement>(null);
  const api = useRef<Preview | null>(null);
  const shown = useRef(false);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = previewEl.current;
      if (!el) return;
      const mm = gsap.matchMedia(wrap.current ?? undefined);

      mm.add({ hover: MQ.hover, reduce: MQ.reduce }, (ctx) => {
        const { hover, reduce } = ctx.conditions as { hover: boolean; reduce: boolean };
        if (!hover) return;
        const follow = reduce ? 0 : 0.55;

        gsap.set(el, { autoAlpha: 0, scale: 0.92, xPercent: -50, yPercent: -50, x: 0, y: 0 });
        const qx = gsap.quickTo(el, "x", { duration: follow, ease: "power3" });
        const qy = gsap.quickTo(el, "y", { duration: follow, ease: "power3" });

        api.current = {
          place: (x, y) => gsap.set(el, { x, y }),
          move: (x, y) => {
            qx(x);
            qy(y);
          },
          show: () => {
            shown.current = true;
            gsap.to(el, { autoAlpha: 1, scale: 1, duration: reduce ? 0 : 0.45, ease: "power3.out", overwrite: "auto" });
          },
          hide: () => {
            shown.current = false;
            gsap.to(el, { autoAlpha: 0, scale: 0.92, duration: reduce ? 0 : 0.3, ease: "power3.in", overwrite: "auto" });
          },
        };

        return () => {
          api.current = null;
          shown.current = false;
          gsap.set(el, { clearProps: "all" });
        };
      });

      return () => mm.revert();
    },
    { scope: wrap },
  );

  // L'aperçu se place à droite du curseur, sans sortir de l'écran
  const target = (clientX: number, clientY: number) => ({
    x: Math.min(clientX + 250, window.innerWidth - PREVIEW_W / 2 - 16),
    y: clientY,
  });

  const reveal = (x: number, y: number) => {
    const a = api.current;
    if (!a) return;
    if (!shown.current) a.place(x, y);
    else a.move(x, y);
    a.show();
  };

  const onEnter = (i: number, e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    setActive(i);
    const t = target(e.clientX, e.clientY);
    reveal(t.x, t.y);
  };

  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !shown.current) return;
    const t = target(e.clientX, e.clientY);
    api.current?.move(t.x, t.y);
  };

  const onFocus = (i: number, e: FocusEvent<HTMLAnchorElement>) => {
    if (!e.currentTarget.matches(":focus-visible")) return;
    setActive(i);
    const r = e.currentTarget.getBoundingClientRect();
    reveal(Math.min(r.left + r.width * 0.62, window.innerWidth - PREVIEW_W / 2 - 16), r.top + r.height / 2);
  };

  return (
    <div ref={wrap} className="relative">
      <ul onPointerMove={onMove} onPointerLeave={() => api.current?.hide()} className="border-b border-line">
        {rows.map((row, i) => (
          <li key={row.slug} className="border-t border-line">
            <Reveal>
              <Link
                href={`/projets/${row.slug}`}
                onPointerEnter={(e) => onEnter(i, e)}
                onFocus={(e) => onFocus(i, e)}
                onBlur={() => api.current?.hide()}
                className="group block py-7 md:py-10"
              >
                <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-4 md:gap-x-10">
                  <span className="pt-2 font-display text-micro uppercase text-orange md:pt-6">{row.index}</span>
                  <div>
                    <h3 className="font-display text-display-xl font-semibold transition-[transform,color] duration-500 ease-[cubic-bezier(.2,0,0,1)] can-hover:group-hover:translate-x-3 can-hover:group-hover:text-orange">
                      {row.name}
                    </h3>
                    <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-micro uppercase text-paper-faint">
                      <span className="inline-flex items-center gap-2">
                        <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: row.accent }} />
                        {row.category}
                      </span>
                      <span>{row.status}</span>
                      <span className="text-paper-dim">{row.stack.join(" · ")}</span>
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-1 grid h-11 w-11 place-items-center rounded-full border border-line-strong transition duration-300 can-hover:group-hover:border-orange can-hover:group-hover:bg-orange can-hover:group-hover:text-ink md:h-14 md:w-14"
                  >
                    <ArrowUpRight size={20} />
                  </span>
                </div>

                {/* Visuel en ligne : appareils sans survol (mobile, tablette tactile) */}
                <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-md border border-line can-hover:hidden">
                  <Image
                    src={row.image}
                    alt={row.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 90vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: row.imagePosition ?? "center" }}
                  />
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Aperçu qui suit le curseur (souris uniquement) */}
      <div
        ref={previewEl}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-60 w-96 overflow-hidden rounded-md border border-line-strong shadow-[0_30px_100px_rgba(0,0,0,.6)] can-hover:block"
      >
        {rows.map((row, i) => (
          <Image
            key={row.slug}
            src={row.image}
            alt=""
            fill
            sizes="384px"
            className="object-cover transition-opacity duration-300"
            style={{ opacity: active === i ? 1 : 0, objectPosition: row.imagePosition ?? "center" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-4 font-display text-micro uppercase text-paper">Voir le projet →</span>
      </div>
    </div>
  );
}
