"use client";

import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { Car, ClipboardList, Handshake, Send, type LucideIcon } from "lucide-react";
import type { ProspeccaoConfig } from "@/lib/clients/types";
import { useCountdown } from "@/hooks/use-countdown";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        key={value}
        className="animate-char-in block font-display text-2xl tabular-nums text-[var(--client-accent)] drop-shadow-[0_0_18px_rgba(212,175,106,0.4)] sm:text-4xl lg:text-5xl"
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-mono text-[9px] uppercase tracking-wide text-white/40 sm:mt-2 sm:text-[10px]">{label}</span>
    </div>
  );
}

/** Notificação estilo tooltip nativo: aparece acima do elemento, com seta e leve deslize ao revelar. */
const Tooltip = memo(function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="group/tip relative inline-flex">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-white/15 bg-[#161616] px-3 py-1.5 font-sans text-xs text-white opacity-0 shadow-xl transition-all duration-200 group-hover/tip:translate-y-0 group-hover/tip:opacity-100">
        {label}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#161616]" />
      </div>
    </div>
  );
});

const FUNNEL_STEP_MS = 20000;

const FunnelStep = memo(function FunnelStep({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active: boolean }) {
  return (
    <Tooltip label={label}>
      <div
        className={`flex size-14 items-center justify-center rounded-full border transition-colors duration-500 lg:size-16 ${
          active ? "border-transparent bg-[var(--client-accent)]/10 text-[var(--client-accent)] shadow-[0_0_28px_rgba(212,175,106,0.5)]" : "border-white/15 bg-white/[0.03] text-white/50"
        }`}
      >
        <Icon className="size-6 lg:size-7" />
      </div>
    </Tooltip>
  );
});

/** Funil de aquisição em ícones (sem texto): lista de oficinas → disparo de vídeos → reunião.
 *  Os círculos acendem em sequência, tipo semáforo, cada um preenchendo o próprio anel. */
const AcquisitionFunnel = memo(function AcquisitionFunnel({ activeStep, labels }: { activeStep: number; labels: [string, string, string] }) {
  return (
    <div className="flex items-center justify-center gap-3 lg:gap-5">
      <FunnelStep icon={ClipboardList} label={labels[0]} active={activeStep === 0} />
      <div className="h-px w-6 bg-gradient-to-r from-white/15 to-[var(--client-accent)]/40 lg:w-10" />
      <FunnelStep icon={Send} label={labels[1]} active={activeStep === 1} />
      <div className="h-px w-6 bg-gradient-to-r from-[var(--client-accent)]/40 to-[var(--client-accent)] lg:w-10" />
      <FunnelStep icon={Handshake} label={labels[2]} active={activeStep === 2} />
    </div>
  );
});

const TYPE_MS = 70;
const ERASE_MS = 40;
const FIRST_PAUSE_MS = 10000;
const NEXT_PAUSE_MS = 5000;

/** "<prefixo> [palavra]" com a última palavra trocando em efeito de máquina de escrever. */
function TypingSuffix({ start, words }: { start: boolean; words: [string, string, string] }) {
  const [text, setText] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(setTimeout(() => !cancelled && fn(), delay));
    };

    const typeWord = (word: string, onDone: () => void) => {
      let i = 0;
      const step = () => {
        if (cancelled) return;
        setText(word.slice(0, i));
        if (i >= word.length) return onDone();
        i++;
        schedule(step, TYPE_MS);
      };
      step();
    };

    const eraseWord = (word: string, onDone: () => void) => {
      let i = word.length;
      const step = () => {
        if (cancelled) return;
        setText(word.slice(0, i));
        if (i <= 0) return onDone();
        i--;
        schedule(step, ERASE_MS);
      };
      step();
    };

    const cycle = (index: number, pauseBeforeSwap: number) => {
      typeWord(words[index], () => {
        schedule(() => {
          eraseWord(words[index], () => {
            cycle((index + 1) % words.length, NEXT_PAUSE_MS);
          });
        }, pauseBeforeSwap);
      });
    };

    cycle(0, FIRST_PAUSE_MS);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [start]);

  return (
    <>
      {text}
      <span className="animate-pulse text-[var(--client-accent)]">|</span>
    </>
  );
}

/** Carrinhos correndo em cima da borda inferior do card. */
function CarTrack() {
  return (
    <div className="pointer-events-none absolute inset-x-6 bottom-0 h-4 overflow-hidden sm:inset-x-10" aria-hidden="true">
      <Car className="absolute bottom-0 size-4 translate-y-[3px] text-[var(--client-accent)]/70 animate-race" style={{ animationDuration: "6.5s", animationDelay: "0s" }} />
      <Car className="absolute bottom-0 size-3 translate-y-[3px] text-white/25 animate-race" style={{ animationDuration: "8.5s", animationDelay: "2.5s" }} />
      <Car className="absolute bottom-0 size-3.5 translate-y-[3px] text-[var(--client-accent)]/45 animate-race" style={{ animationDuration: "7.5s", animationDelay: "4.8s" }} />
    </div>
  );
}

export type InfrastructureSectionProps = {
  prospeccao: ProspeccaoConfig;
  prospeccaoHref: string;
};

export function InfrastructureSection({ prospeccao, prospeccaoHref }: InfrastructureSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const funnelRef = useRef<HTMLDivElement>(null);
  const [matchedWidth, setMatchedWidth] = useState<number | null>(null);
  const [funnelWidth, setFunnelWidth] = useState<number | null>(null);
  const { locked, days, hours, minutes, seconds } = useCountdown(prospeccao.unlockAt);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!locked) return;
    const interval = setInterval(() => setActiveStep((step) => (step + 1) % 3), FUNNEL_STEP_MS);
    return () => clearInterval(interval);
  }, [locked]);

  useEffect(() => {
    if (!locked || !countdownRef.current) return;
    const el = countdownRef.current;
    const updateWidth = () => setMatchedWidth(el.offsetWidth);
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);
    window.addEventListener("resize", updateWidth);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [locked]);

  useEffect(() => {
    if (!locked || !funnelRef.current) return;
    const el = funnelRef.current;
    const updateWidth = () => setFunnelWidth(el.offsetWidth);
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);
    window.addEventListener("resize", updateWidth);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [locked]);

  const matchedButtonWidth = locked ? Math.max(matchedWidth ?? 0, funnelWidth ?? 0) || null : null;
  const buttonWidthStyle = matchedButtonWidth ? { width: matchedButtonWidth, maxWidth: "100%" } : undefined;

  return (
    <section id="estrategia-aquisicao" ref={sectionRef} className="relative scroll-mt-24 overflow-hidden pb-8 pt-8 lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className={`group relative transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 -inset-y-16 -z-10 rounded-[3rem] opacity-50 blur-[100px] transition-opacity duration-700 group-hover:opacity-80 sm:-inset-x-16 sm:-inset-y-20"
            style={{ background: "radial-gradient(closest-side, rgba(212,175,106,0.32), transparent 75%)" }}
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center backdrop-blur-2xl transition-colors duration-500 hover:border-[var(--client-accent)]/40 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            {locked && <CarTrack />}

            <div className="relative z-10">
              <span className="mb-3 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground"><span className="h-px w-12 bg-[var(--client-accent)]" />{prospeccao.eyebrow}<span className="h-px w-12 bg-[var(--client-accent)]" /></span>
              <h2 className="text-balance font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-[92px]">
                <span className="block lg:inline">{prospeccao.headingPrefix}</span>{" "}
                <span className="block lg:inline"><TypingSuffix start={isVisible} words={prospeccao.typingWords} /></span>
              </h2>

              {locked && (
                <>
                  <div ref={funnelRef} className="mt-10 lg:mt-14">
                    <AcquisitionFunnel activeStep={activeStep} labels={prospeccao.funnelSteps} />
                  </div>

                  <div ref={countdownRef} className="mt-10 inline-flex flex-wrap items-center justify-center lg:mt-14">
                    <CountdownUnit value={days} label="Dias" />
                    <span className="mx-1 font-display text-lg text-white/15 sm:mx-2 sm:text-2xl lg:mx-4 lg:text-3xl">:</span>
                    <CountdownUnit value={hours} label="Horas" />
                    <span className="mx-1 font-display text-lg text-white/15 sm:mx-2 sm:text-2xl lg:mx-4 lg:text-3xl">:</span>
                    <CountdownUnit value={minutes} label="Minutos" />
                    <span className="mx-1 font-display text-lg text-white/15 sm:mx-2 sm:text-2xl lg:mx-4 lg:text-3xl">:</span>
                    <CountdownUnit value={seconds} label="Segundos" />
                  </div>
                </>
              )}

              <div className="mt-10 flex justify-center lg:mt-14">
                <a
                  href={prospeccaoHref}
                  style={buttonWidthStyle}
                  className="inline-flex h-16 w-full max-w-md items-center justify-center gap-3 rounded-full bg-[var(--client-accent)] text-base font-medium text-black shadow-[0_8px_30px_rgba(212,175,106,0.35)] transition-all hover:scale-[1.04] hover:shadow-[0_10px_40px_rgba(212,175,106,0.5)]"
                >
                  <Handshake className="size-5" />
                  {prospeccao.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
