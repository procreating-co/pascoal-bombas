"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "Nossas captações geraram 8 horas de material bruto...",
  "Muito desse material não pode estar aqui, mas ainda pode ser aproveitado!",
  "Queremos em breve apresentar uma forma de continuarmos essa parceria...",
];
const HIGHLIGHT_LINE_INDEX = 2;
const HIGHLIGHT_WORD = "em breve";

const TYPE_MS = 42;
const LINE_PAUSE_MS = 300;
const AT_BOTTOM_DELAY_MS = 2000;
const HOLD_MS = 2000;
const FADE_MS = 700;

function renderLine(lineIndex: number, typedLength: number) {
  const text = LINES[lineIndex];
  const typed = text.slice(0, typedLength);
  if (lineIndex !== HIGHLIGHT_LINE_INDEX) return typed;

  const start = text.indexOf(HIGHLIGHT_WORD);
  const end = start + HIGHLIGHT_WORD.length;
  const before = typed.slice(0, Math.min(typedLength, start));
  const highlighted = typed.slice(start, Math.min(typedLength, end));
  const after = typed.slice(end, typedLength);
  return (
    <>
      {before}
      <span className="text-[#d4af6a]">{highlighted}</span>
      {after}
    </>
  );
}

/**
 * Ao permanecer 2s parado no rodapé da página (uma única vez por sessão), abre um overlay
 * cinematográfico com digitação linha a linha.
 */
export function FooterEasterEgg() {
  const [visible, setVisible] = useState(false);
  const [typedLengths, setTypedLengths] = useState<number[]>(() => LINES.map(() => 0));
  const [done, setDone] = useState(false);
  const [closing, setClosing] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    let bottomTimer: ReturnType<typeof setTimeout> | null = null;

    const clearBottomTimer = () => {
      if (bottomTimer) {
        clearTimeout(bottomTimer);
        bottomTimer = null;
      }
    };

    const handleScroll = () => {
      if (triggeredRef.current) return;
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isBottom) {
        if (!bottomTimer) {
          bottomTimer = setTimeout(() => {
            triggeredRef.current = true;
            setVisible(true);
          }, AT_BOTTOM_DELAY_MS);
        }
      } else {
        clearBottomTimer();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearBottomTimer();
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(setTimeout(() => !cancelled && fn(), delay));
    };

    const typeLine = (lineIndex: number, onDone: () => void) => {
      let i = 0;
      const text = LINES[lineIndex];
      const step = () => {
        if (cancelled) return;
        setTypedLengths((prev) => {
          const next = [...prev];
          next[lineIndex] = i;
          return next;
        });
        if (i >= text.length) return onDone();
        i++;
        schedule(step, TYPE_MS);
      };
      step();
    };

    const typeAll = (lineIndex: number) => {
      if (lineIndex >= LINES.length) {
        setDone(true);
        schedule(() => setClosing(true), HOLD_MS);
        return;
      }
      typeLine(lineIndex, () => schedule(() => typeAll(lineIndex + 1), LINE_PAUSE_MS));
    };
    typeAll(0);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [visible]);

  useEffect(() => {
    if (!closing) return;
    const timeoutId = setTimeout(() => setVisible(false), FADE_MS);
    return () => clearTimeout(timeoutId);
  }, [closing]);

  if (!visible) return null;

  const activeLineIndex = LINES.findIndex((line, index) => typedLengths[index] < line.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mais conteúdos"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6 text-center backdrop-blur-md transition-opacity duration-700 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="max-w-2xl space-y-3">
        {LINES.map((line, index) => (
          <p key={line} className="text-balance font-display text-xl leading-relaxed text-white sm:text-2xl md:text-3xl">
            {renderLine(index, typedLengths[index])}
            {!done && index === activeLineIndex && <span className="animate-pulse">|</span>}
          </p>
        ))}
      </div>
    </div>
  );
}
