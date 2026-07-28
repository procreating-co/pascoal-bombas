"use client";

import { useEffect, useState } from "react";

/**
 * Contagem regressiva até um timestamp ISO 8601, atualizada a cada segundo. Usada pelo
 * teaser de "Estratégia de Aquisição" na Home e pela Central de Prospecção — a apresentação
 * visual de cada `CountdownUnit` continua própria de cada um (estilos diferentes).
 */
export function useCountdown(targetISO: string) {
  const [msLeft, setMsLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(targetISO).getTime();
    const tick = () => setMsLeft(Math.max(0, target - Date.now()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetISO]);

  const locked = msLeft === null || msLeft > 0;
  const totalSeconds = Math.floor((msLeft ?? 0) / 1000);

  return {
    locked,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
