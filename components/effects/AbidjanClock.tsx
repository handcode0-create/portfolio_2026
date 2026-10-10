"use client";

import { useEffect, useState } from "react";

/** Heure locale d'Abidjan (GMT), mise à jour toutes les 15 s. Rendu après montage : pas de mismatch SSR. */
export function AbidjanClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Africa/Abidjan",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <span className="node mr-2 align-middle" aria-hidden />
      <span className="sr-only">Heure à Abidjan : </span>
      <time>{time ?? "--:--"}</time>&nbsp;GMT
    </span>
  );
}
