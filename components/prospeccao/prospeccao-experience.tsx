"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Lock, LockOpen } from "lucide-react";
import { LockScreen } from "@/components/prospeccao/lock-screen";
import { AnimatedRevealText } from "@/components/shared/animated-reveal-text";
import { useCountdown } from "@/hooks/use-countdown";

const CLICK_FEEDBACK_MS = 600;
const TOAST_MS = 2200;

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span key={value} className="animate-char-in block font-display text-4xl font-light tabular-nums text-black sm:text-5xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-black/35">{label}</span>
    </div>
  );
}

/** Cadeado que "tranca" com uma animação de jogo ao passar o mouse ou ao clicar. */
function LockToggle({ onClick, triggered }: { onClick: () => void; triggered: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Cadeado da Central de Prospecção"
      className="group/lock relative flex size-12 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white/90 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-[#b8863b]/40 hover:shadow-[0_10px_30px_-6px_rgba(184,134,59,0.35)] sm:size-14"
    >
      <LockOpen
        className={`absolute size-5 text-black/60 transition-all duration-200 group-hover/lock:scale-75 group-hover/lock:opacity-0 ${triggered ? "scale-75 opacity-0" : ""}`}
      />
      <Lock
        className={`absolute size-5 scale-75 text-[#b8863b] opacity-0 transition-all duration-200 group-hover/lock:scale-100 group-hover/lock:opacity-100 group-hover/lock:animate-[lock-shake_450ms_ease-in-out] ${
          triggered ? "scale-100 opacity-100 animate-[lock-shake_450ms_ease-in-out]" : ""
        }`}
      />
    </button>
  );
}

export type ProspeccaoExperienceProps = {
  accessCode: string;
  unlockAt: string;
  title: string;
  toastText: string;
  logo: string;
  brandName: string;
  homeHref: string;
};

export function ProspeccaoExperience({ accessCode, unlockAt, title, toastText, logo, brandName, homeHref }: ProspeccaoExperienceProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [lockTriggered, setLockTriggered] = useState(false);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { days, hours, minutes, seconds } = useCountdown(unlockAt);

  useEffect(() => () => timeoutIds.current.forEach(clearTimeout), []);

  const handleLockClick = () => {
    setLockTriggered(true);
    setShakeScreen(true);
    setShowToast(true);
    timeoutIds.current.push(
      setTimeout(() => setLockTriggered(false), CLICK_FEEDBACK_MS),
      setTimeout(() => setShakeScreen(false), CLICK_FEEDBACK_MS),
      setTimeout(() => setShowToast(false), TOAST_MS),
    );
  };

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} accessCode={accessCode} title={title} logo={logo} brandName={brandName} />;
  }

  return (
    <main
      className={`relative flex h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 text-center text-black ${
        shakeScreen ? "animate-[screen-shake_500ms_ease-in-out]" : ""
      }`}
    >
      <a
        href={homeHref}
        aria-label="Voltar para a página inicial"
        className="fixed left-6 top-6 z-50 flex size-12 items-center justify-center border border-black/15 bg-white/80 text-black backdrop-blur-xl transition-colors hover:border-[#b8863b] hover:text-[#b8863b] lg:left-12 lg:top-8"
      >
        <ArrowLeft className="size-5" />
      </a>

      <h1 className="text-balance font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        <AnimatedRevealText text={title} delayMs={26} />
      </h1>

      <div className="relative mt-10 lg:mt-14">
        {showToast && (
          <span className="pointer-events-none absolute -top-12 left-1/2 whitespace-nowrap border border-black/10 bg-black px-4 py-2 font-mono text-xs uppercase tracking-wide text-white shadow-xl animate-[toast-in_200ms_ease-out_both]">
            {toastText}
          </span>
        )}
        <div className="inline-flex items-center gap-5 rounded-[28px] border border-black/[0.06] bg-white/70 px-6 py-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:gap-7 sm:px-9 sm:py-5">
          <LockToggle onClick={handleLockClick} triggered={lockTriggered} />
          <div className="h-10 w-px bg-black/[0.08] sm:h-12" />
          <div className="inline-flex items-center">
            <CountdownUnit value={days} label="Dias" />
            <span className="mx-2 font-display text-xl font-light text-black/10 sm:mx-3 sm:text-2xl">:</span>
            <CountdownUnit value={hours} label="Horas" />
            <span className="mx-2 font-display text-xl font-light text-black/10 sm:mx-3 sm:text-2xl">:</span>
            <CountdownUnit value={minutes} label="Minutos" />
            <span className="mx-2 font-display text-xl font-light text-black/10 sm:mx-3 sm:text-2xl">:</span>
            <CountdownUnit value={seconds} label="Segundos" />
          </div>
        </div>
      </div>
    </main>
  );
}
