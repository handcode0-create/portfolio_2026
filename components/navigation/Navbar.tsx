"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/data/site";
import { DUR, EASE, STAGGER } from "@/lib/animation/tokens";

const CLOSED = "circle(0% at 92% 4%)";
const OPEN = "circle(150% at 92% 4%)";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.md, delayChildren: 0.15 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.emphasized } },
};

/**
 * Navigation. Propriétaire d'animation : Framer Motion (masquage au scroll, menu immersif).
 * - Se masque en descendant, réapparaît en remontant (et au focus clavier).
 * - Section active suivie par IntersectionObserver.
 * - Menu mobile : plein écran, focus piégé, Échap, scroll verrouillé.
 */
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    setScrolled(y > 24);
    if (y < 200) setActive(null);
    if (!open) {
      if (y > 160 && delta > 6) setHidden(true);
      else if (delta < -6 || y <= 160) setHidden(false);
    }
    lastY.current = y;
  });

  // Section active (accueil uniquement)
  useEffect(() => {
    if (!isHome) return;
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  const close = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  // Ferme le menu lors d'un changement de page
  useEffect(() => setOpen(false), [pathname]);

  // Verrouillage du scroll + focus initial
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  const onOverlayKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") return close();
    if (e.key !== "Tab" || !overlayRef.current) return;
    const focusable = overlayRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const goHome = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <m.header
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: DUR.normal + 0.1, ease: EASE.standard }}
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-ink/75 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            onClick={goHome}
            aria-label="HANCODE — retour en haut de la page d'accueil"
            className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight"
          >
            <span className="node" aria-hidden />
            HANCODE
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-10 md:flex">
            {nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active === item.id ? "location" : undefined}
                className={`u-link font-display text-sm tracking-wide ${
                  active === item.id ? "text-orange" : "text-paper-dim hover:text-paper"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" className="btn btn-primary !min-h-11 !px-5 !py-2 text-sm">
              Me contacter <ArrowUpRight size={16} aria-hidden />
            </Link>
          </nav>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-controls="menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] rounded-full border border-line-strong md:hidden"
          >
            <span className="block h-px w-5 bg-paper" />
            <span className="block h-px w-5 bg-paper" />
          </button>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            ref={overlayRef}
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            onKeyDown={onOverlayKey}
            initial={{ clipPath: CLOSED }}
            animate={{ clipPath: OPEN }}
            exit={{ clipPath: CLOSED }}
            transition={{ duration: 0.6, ease: EASE.emphasized }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink-2 md:hidden"
          >
            <div className="container-page flex h-16 shrink-0 items-center justify-between">
              <span className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight">
                <span className="node" aria-hidden />
                HANCODE
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Fermer le menu"
                className="relative h-11 w-11 rounded-full border border-line-strong"
              >
                <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 rotate-45 bg-paper" />
                <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -rotate-45 bg-paper" />
              </button>
            </div>

            <m.ul
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="container-page flex flex-1 flex-col justify-center gap-2"
            >
              {nav.map((item, i) => (
                <m.li key={item.id} variants={itemVariants} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5 font-display text-display-xl"
                  >
                    <span className="text-micro text-orange">0{i + 1}</span>
                    {item.label}
                  </Link>
                </m.li>
              ))}
            </m.ul>

            <div className="container-page shrink-0 pb-8 pt-4 text-sm text-paper-dim">
              <a href={site.contact.emailHref} className="u-link block py-1">
                {site.contact.email}
              </a>
              <p className="mt-3 text-micro uppercase text-paper-faint">
                {site.location.city}, {site.location.country}
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
