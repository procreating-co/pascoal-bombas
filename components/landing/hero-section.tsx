"use client";

import { useEffect, useRef, useState } from "react";

const WELCOME_TYPE_MS = 40;

/** Digita "Sejam bem-vindos, Pascoal e equipe." uma \u00FAnica vez ao carregar a p\u00E1gina. */
function useTypedWelcome() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [activeLine, setActiveLine] = useState<1 | 2 | null>(1);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(setTimeout(() => !cancelled && fn(), delay));
    };

    const typeText = (text: string, setter: (value: string) => void, onDone: () => void) => {
      let i = 0;
      const step = () => {
        if (cancelled) return;
        setter(text.slice(0, i));
        if (i >= text.length) return onDone();
        i++;
        schedule(step, WELCOME_TYPE_MS);
      };
      step();
    };

    setActiveLine(1);
    typeText("Sejam bem-vindos,", setLine1, () => {
      setActiveLine(2);
      typeText("Pascoal e equipe.", setLine2, () => setActiveLine(null));
    });

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return { line1, line2, activeLine };
}

function AnimatedTitle() {
  const { line1, line2, activeLine } = useTypedWelcome();
  return (
    <span aria-label="Sejam bem-vindos, Pascoal e equipe.">
      <span className="block" aria-hidden="true">
        {line1}
        {activeLine === 1 && <span className="animate-pulse">|</span>}
      </span>
      <span className="block font-medium text-white" aria-hidden="true">
        {line2}
        {activeLine === 2 && <span className="animate-pulse">|</span>}
      </span>
    </span>
  );
}

/** Contador em passos discretos, cada um com um leve "rolar" — como o marcador de um posto de gasolina. */
function AnimatedNumber({ value, pad = 0, start, duration = 1700, linear = false, onDone }: { value: number; pad?: number; start: boolean; duration?: number; linear?: boolean; onDone?: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      onDone?.();
      return;
    }
    const steps = Math.max(Math.min(value, 40), 1);
    let step = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    const tick = () => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = linear ? progress : 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (step < steps) {
        timeoutId = setTimeout(tick, duration / steps);
      } else {
        onDone?.();
      }
    };
    timeoutId = setTimeout(tick, duration / steps);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, value, duration, linear]);

  return (
    <span key={count} className="animate-char-in inline-block">
      {String(count).padStart(pad, "0")}
    </span>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [videosDone, setVideosDone] = useState(false);
  const [photosDone, setPhotosDone] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => setIsVisible(true), []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setStatsVisible(true), { threshold: 0.35 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline aria-hidden="true" className="h-full w-full object-cover object-center opacity-75">
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col justify-center px-6 lg:px-12">
        <div className={`max-w-6xl transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <h1 className="text-balance font-display text-[clamp(2.25rem,5vw,5rem)] leading-[1.02] tracking-tight"><AnimatedTitle /></h1>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-44 bg-gradient-to-b from-transparent via-black/55 to-background" />
      <div ref={statsRef} className={`absolute bottom-[57px] left-0 right-0 z-10 transition-all delay-500 duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-3 gap-y-2 pl-6 pr-6 sm:gap-x-8 lg:gap-x-12 lg:pl-12 lg:pr-[88px]">
          <p className="truncate font-display text-base font-light leading-none tracking-tight sm:text-3xl md:text-4xl">
            {statsVisible && <span className="inline-block animate-wipe-breathe">Todos materiais captados estão aqui...</span>}
          </p>
          <div className="flex shrink-0 items-baseline gap-1.5 sm:gap-2">
            <span className="font-display text-2xl leading-none text-[#d4af6a] sm:text-4xl"><AnimatedNumber value={5} pad={2} start={statsVisible} duration={3000} onDone={() => setVideosDone(true)} /></span>
            <span className={`whitespace-nowrap text-[10px] leading-none text-white/50 transition-all duration-500 ease-out sm:text-sm ${videosDone ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0"}`}>vídeos produzidos</span>
          </div>
          <div className="flex shrink-0 items-baseline gap-1.5 sm:gap-2">
            <span className="font-display text-2xl leading-none text-[#d4af6a] sm:text-4xl"><AnimatedNumber value={116} start={statsVisible} duration={1300} linear onDone={() => setPhotosDone(true)} /></span>
            <span className={`whitespace-nowrap text-[10px] leading-none text-white/50 transition-all duration-500 ease-out sm:text-sm ${photosDone ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0"}`}>fotos editadas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
