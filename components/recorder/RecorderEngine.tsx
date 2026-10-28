"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/animation/gsap";
import { CustomEase } from "gsap/CustomEase";
import { site } from "@/data/site";

gsap.registerPlugin(CustomEase);

/**
 * Moteur de « L'Enregistreur ».
 * - Desktop paysage : la bande défile horizontalement sous la tête d'impression (scroll natif
 *   vertical converti en avance papier ; clavier, trackpad et barre de défilement restent actifs).
 * - Mobile / portrait / mouvement réduit / sans JS : la bande défile verticalement, scroll natif.
 * - Le stylet trace en continu le signal de la visite : amplitude = vitesse de lecture,
 *   déviation = pointeur (desktop) ou doigt (mobile). Le tracé reste imprimé sur la bande.
 * Rien n'est envoyé nulle part : le tracé vit uniquement dans la page.
 */

/** Même requête que le CSS (.rc[data-mode="h"]). */
const H_QUERY =
  "(min-width: 900px) and (min-aspect-ratio: 1/1) and (prefers-reduced-motion: no-preference)";
const REDUCED = "(prefers-reduced-motion: reduce)";
/** Résolution du tracé : une colonne d'encre tous les STEP px de bande. */
const STEP = 2;
const INK = "#0B0B0B";
const PEN = "#FF6A00";

// Avance papier mécanique : démarrage sec, léger dépassement, arrêt amorti.
const MOTOR = CustomEase.create(
  "moteur",
  "M0,0 C0.06,0 0.1,0.55 0.26,0.84 0.4,1.06 0.56,1.025 0.7,1.004 0.82,0.996 1,1 1,1",
);

const pad = (n: number, l = 2) => String(Math.floor(n)).padStart(l, "0");

export function RecorderEngine({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const readRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const spacer = spacerRef.current!;
    const viewport = viewportRef.current!;
    const track = trackRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mqH = window.matchMedia(H_QUERY);
    const mqReduced = window.matchMedia(REDUCED);

    // --- Géométrie -------------------------------------------------------
    let horizontal = mqH.matches;
    let reduced = mqReduced.matches;
    let vw = 0, vh = 0, bar = 40, dpr = 1;
    let maxTape = 0; // course maximale de la bande (px)
    let head = 0; // position de la tête sur l'axe de défilement (px écran)
    let chanCenter = 0, chanAmp = 0; // canal du stylet (axe transversal)
    let feed = 0; // avance papier d'ouverture (px), animée par GSAP

    const layout = () => {
      horizontal = mqH.matches;
      reduced = mqReduced.matches;
      root.dataset.mode = horizontal ? "h" : "v";
      vw = window.innerWidth;
      vh = window.innerHeight;
      bar = parseFloat(getComputedStyle(root).getPropertyValue("--bar")) || 40;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;

      if (horizontal) {
        maxTape = Math.max(0, track.scrollWidth - vw);
        spacer.style.height = `${maxTape + vh}px`;
        head = Math.round(vw * 0.64);
        const paperH = vh - bar * 2;
        const chan = paperH * 0.2;
        chanCenter = vh - bar - chan / 2 - 8;
        chanAmp = chan * 0.42;
      } else {
        spacer.style.height = "";
        track.style.transform = "";
        maxTape = Math.max(0, document.documentElement.scrollHeight - vh);
        head = Math.round(vh * 0.72);
        chanCenter = 26;
        chanAmp = 17;
      }
      root.style.setProperty("--head", `${head}px`);
    };

    /** Position de la bande sous la fenêtre (px de bande parcourus). */
    const tapePos = () => {
      if (!horizontal) return window.scrollY;
      const top = spacer.offsetTop;
      return Math.min(Math.max(window.scrollY - top, 0), maxTape);
    };

    // --- Tracé : min/max par colonne (un stylet immobile trace un trait vertical) ---
    const lo: number[] = [];
    const hi: number[] = [];
    let lastCol = -1;
    const writeCol = (col: number, v: number, fresh: boolean) => {
      if (col < 0) return;
      if (fresh || lo[col] === undefined) {
        lo[col] = v;
        hi[col] = v;
      } else {
        if (v < lo[col]) lo[col] = v;
        if (v > hi[col]) hi[col] = v;
      }
    };

    // --- Entrées : vitesse de lecture, pointeur, doigt ---------------------
    let bias = 0, biasTarget = 0, touching = false;
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        biasTarget = horizontal ? (0.5 - e.clientY / vh) * 0.9 : (e.clientX / vw - 0.5) * 0.9;
      } else {
        touching = true;
        biasTarget = horizontal ? (0.5 - e.clientY / vh) * 1.1 : (e.clientX / vw - 0.5) * 1.4;
      }
    };
    const onPointerEnd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") touching = false;
    };
    const onLeave = () => (biasTarget = 0);

    // Trackpad / molette horizontale -> avance papier
    const onWheel = (e: WheelEvent) => {
      speedUpFeed();
      if (!horizontal) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        window.scrollBy(0, e.deltaX);
      }
    };

    // Tabulation dans une bande horizontale : on amène l'élément sous la tête.
    const bringIntoView = (el: Element, smooth: boolean) => {
      if (!horizontal) {
        el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
        return;
      }
      viewport.scrollLeft = 0;
      const x = el.getBoundingClientRect().left - track.getBoundingClientRect().left;
      const target = Math.min(Math.max(x - vw * 0.12, 0), maxTape);
      window.scrollTo({ top: spacer.offsetTop + target, behavior: smooth ? "smooth" : "auto" });
    };
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as Element | null;
      if (horizontal && t && track.contains(t)) {
        viewport.scrollLeft = 0;
        const r = t.getBoundingClientRect();
        if (r.left < 0 || r.right > head) bringIntoView(t, false);
      }
    };
    const onNavClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[data-goto]");
      if (!a) return;
      const el = document.getElementById(a.dataset.goto!);
      if (!el) return;
      e.preventDefault();
      speedUpFeed(true);
      bringIntoView(el, !reduced);
      history.replaceState(null, "", `#${a.dataset.goto}`);
    };

    // --- Ouverture : la bande avance et imprime la première phrase ---------
    const feedState = { v: 0 };
    let feedTween: gsap.core.Tween | null = null;
    const startFeed = () => {
      if (reduced || window.scrollY > 4) return;
      feedState.v = horizontal ? vw * 0.46 : vh * 0.3;
      feedTween = gsap.to(feedState, { v: 0, duration: 2.8, delay: 0.25, ease: MOTOR });
    };
    const speedUpFeed = (finish = false) => {
      if (!feedTween || !feedTween.isActive()) return;
      if (finish) feedTween.progress(1);
      else feedTween.timeScale(4);
    };
    const onKey = () => speedUpFeed();

    // --- Boucle ------------------------------------------------------------
    const t0 = performance.now();
    let raf = 0, prevT = t0;
    let pos = 0, amp = 0.07, ampVel = 0, speed = 0, lastU = NaN, lastTC = "", lastRead = "";
    const clockFmt = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Abidjan",
    });
    let lastClockMin = -1;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - prevT) / 1000, 0.05);
      prevT = now;
      const t = (now - t0) / 1000;
      feed = feedState.v;

      // Avance de la bande
      const tp = tapePos();
      if (horizontal) track.style.transform = `translate3d(${(feed - tp).toFixed(2)}px,0,0)`;
      else track.style.transform = feed > 0.5 ? `translate3d(0,${feed.toFixed(2)}px,0)` : "";

      // Coordonnée de bande sous la tête
      const u = tp + head - feed;
      if (Number.isNaN(lastU)) lastU = u;
      const inst = dt > 0 ? Math.abs(u - lastU) / dt : 0;
      speed += (inst - speed) * 0.12;

      // Signal : une onde liée à la bande (la vitesse révèle l'amplitude) + bourdonnement
      if (!touching) biasTarget *= horizontal ? 1 : 0.94;
      bias += (biasTarget - bias) * 0.08;
      // Amplitude lissée (ressort amorti) : la vitesse de lecture ouvre le signal.
      const ampTarget = 0.07 + Math.min(speed / 2400, 1) * 0.8;
      if (reduced) amp = ampTarget;
      else {
        ampVel += (ampTarget - amp) * 0.06;
        ampVel *= 0.82;
        amp += ampVel;
      }
      // Bourdonnement du stylet (temps) — coupé en mouvement réduit.
      const hum = reduced ? 0 : 0.16 * Math.sin(t * 2.3) + 0.06 * Math.sin(t * 11.7);
      /** Signal imprimé à la coordonnée de bande x : fonction continue, donc le tracé
       *  reste une onde même quand la molette fait avancer la bande par à-coups. */
      const signal = (x: number) =>
        Math.max(
          -1,
          Math.min(
            1,
            bias + amp * (0.5 * Math.sin(x / 37) + 0.28 * Math.sin(x / 13.7 + 1.3) + 0.12 * Math.sin(x / 5.3) + hum),
          ),
        );
      pos = signal(u);

      // Encrage de toutes les colonnes parcourues depuis la dernière image
      const c0 = Math.round(lastU / STEP);
      const c1 = Math.round(u / STEP);
      if (c0 === c1) {
        writeCol(c1, pos, lastCol !== c1);
      } else {
        const n = Math.abs(c1 - c0);
        const dir = Math.sign(c1 - c0);
        for (let k = 1; k <= n; k++) {
          const c = c0 + dir * k;
          writeCol(c, signal(c * STEP), true);
        }
      }
      lastCol = c1;
      lastU = u;

      draw(tp, pos);

      // Bandeau machine
      const fr = Math.floor((t % 1) * 25);
      const tc = `${pad(t / 3600)}:${pad((t / 60) % 60)}:${pad(t % 60)}:${pad(fr)}`;
      if (tc !== lastTC && timecodeRef.current) timecodeRef.current.textContent = lastTC = tc;
      const read = maxTape > 0 ? `${pad((Math.min(tp, maxTape) / maxTape) * 100, 3)} %` : "000 %";
      if (read !== lastRead && readRef.current) readRef.current.textContent = lastRead = read;
      const m = new Date().getUTCMinutes();
      if (m !== lastClockMin && clockRef.current) {
        lastClockMin = m;
        clockRef.current.textContent = `ABJ ${clockFmt.format(new Date())}`;
      }
    };

    const draw = (tp: number, p: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);
      const start = horizontal ? 0 : bar;
      const offset = tp - feed;

      // Ligne de base du canal
      ctx.strokeStyle = "rgba(11,11,11,.18)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      if (horizontal) {
        ctx.moveTo(0, chanCenter);
        ctx.lineTo(vw, chanCenter);
      } else {
        ctx.moveTo(chanCenter, bar);
        ctx.lineTo(chanCenter, vh - bar);
      }
      ctx.stroke();

      // Tête d'impression
      ctx.strokeStyle = "rgba(11,11,11,.42)";
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      if (horizontal) {
        ctx.moveTo(head, bar);
        ctx.lineTo(head, vh - bar);
      } else {
        ctx.moveTo(0, head);
        ctx.lineTo(vw, head);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Tracé imprimé
      ctx.strokeStyle = PEN;
      ctx.lineWidth = 1.6;
      ctx.lineJoin = "round";
      ctx.beginPath();
      let pen = false;
      for (let s = start; s <= head; s += STEP) {
        const col = Math.round((offset + s) / STEP);
        if (lo[col] === undefined) {
          pen = false;
          continue;
        }
        const a = chanCenter - lo[col] * chanAmp;
        const b = chanCenter - hi[col] * chanAmp;
        if (horizontal) {
          if (!pen) ctx.moveTo(s, a);
          else ctx.lineTo(s, a);
          if (b !== a) ctx.lineTo(s, b);
        } else {
          // Axe transversal inversé : la déviation va vers la droite
          const xa = chanCenter + lo[col] * chanAmp;
          const xb = chanCenter + hi[col] * chanAmp;
          if (!pen) ctx.moveTo(xa, s);
          else ctx.lineTo(xa, s);
          if (xb !== xa) ctx.lineTo(xb, s);
        }
        pen = true;
      }
      ctx.stroke();

      // Bras du stylet
      let tipX: number, tipY: number, pivX: number, pivY: number;
      if (horizontal) {
        tipX = head;
        tipY = chanCenter - p * chanAmp;
        pivX = head + Math.min(180, vw * 0.11);
        pivY = chanCenter + chanAmp * 0.25;
      } else {
        tipX = chanCenter + p * chanAmp;
        tipY = head;
        pivX = chanCenter + 6;
        pivY = head + 96;
      }
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pivX, pivY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();
      ctx.fillStyle = "#F3F0EA";
      ctx.beginPath();
      ctx.arc(pivX, pivY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = PEN;
      ctx.beginPath();
      ctx.arc(tipX, tipY, 3.5, 0, Math.PI * 2);
      ctx.fill();
    };

    // --- Montage -------------------------------------------------------------
    layout();
    startFeed();
    root.dataset.live = "true";
    raf = requestAnimationFrame(frame);

    const relayout = () => {
      const ratio = maxTape > 0 ? tapePos() / maxTape : 0;
      layout();
      if (horizontal) window.scrollTo(0, spacer.offsetTop + ratio * maxTape);
    };
    const ro = new ResizeObserver(() => layout());
    ro.observe(track);
    document.fonts?.ready.then(() => layout());
    mqH.addEventListener("change", relayout);
    mqReduced.addEventListener("change", relayout);
    window.addEventListener("resize", relayout);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("pointerup", onPointerEnd, { passive: true });
    window.addEventListener("pointercancel", onPointerEnd, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onKey, { passive: true });
    window.addEventListener("keydown", onKey);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("click", onNavClick);
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        prevT = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // Arrivée directe sur une ancre (#prises, #contact…)
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) requestAnimationFrame(() => bringIntoView(el, false));
    }

    return () => {
      cancelAnimationFrame(raf);
      feedTween?.kill();
      ro.disconnect();
      mqH.removeEventListener("change", relayout);
      mqReduced.removeEventListener("change", relayout);
      window.removeEventListener("resize", relayout);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onKey);
      window.removeEventListener("keydown", onKey);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("click", onNavClick);
      document.removeEventListener("visibilitychange", onVis);
      track.style.transform = "";
      spacer.style.height = "";
    };
  }, []);

  return (
    <div ref={rootRef} className="rc" data-mode="v">
      <header className="rc-bar rc-bar--top">
        <a href="#debut" data-goto="debut" className="rc-brand" aria-label="HANCODE — début de la bande">
          <span className="rc-rec" aria-hidden />
          <span className="rc-rec-label" aria-hidden>
            REC
          </span>
          <span>{site.name}</span>
        </a>
        <span className="rc-meta rc-hide-sm" aria-hidden>
          Enregistreur H-26 · {site.location.city} · {site.location.coords}
        </span>
        <span className="rc-meta" aria-hidden>
          <span ref={timecodeRef} className="rc-tc">
            00:00:00:00
          </span>
          <span ref={clockRef} className="rc-hide-sm">
            ABJ --:--
          </span>
        </span>
      </header>

      <div ref={spacerRef} className="rc-spacer">
        <div ref={viewportRef} className="rc-viewport">
          <main id="main" ref={trackRef} className="rc-tape">
            {children}
          </main>
        </div>
      </div>

      {/* Papier pas encore imprimé (à droite / en dessous de la tête) */}
      <div className="rc-blank" aria-hidden />
      <canvas ref={canvasRef} className="rc-canvas" aria-hidden />

      <nav className="rc-bar rc-bar--bottom" aria-label="Transport de la bande">
        <ul className="rc-transport">
          <li>
            <a href="#debut" data-goto="debut">
              <span aria-hidden>◀◀</span> Début
            </a>
          </li>
          <li>
            <a href="#prises" data-goto="prises">
              <span aria-hidden>▶</span> Projets
            </a>
          </li>
          <li>
            <a href="#contact" data-goto="contact">
              <span aria-hidden>■</span> Contact
            </a>
          </li>
        </ul>
        <span className="rc-meta" aria-hidden>
          <span className="rc-read-label">Lecture</span> <span ref={readRef}>000 %</span>
        </span>
      </nav>
    </div>
  );
}
