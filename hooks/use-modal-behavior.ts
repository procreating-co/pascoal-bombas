"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

type UseModalBehaviorOptions = {
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

/**
 * Comportamento comum aos overlays em tela cheia (vídeo/foto): Escape fecha, setas
 * esquerda/direita navegam quando fornecidas, o scroll do body trava enquanto aberto, o foco
 * vai pro primeiro elemento focável ao abrir e fica preso dentro do modal (Tab/Shift+Tab),
 * voltando pro elemento que tinha foco antes ao fechar.
 */
export function useModalBehavior<T extends HTMLElement>({ onClose, onPrev, onNext }: UseModalBehaviorOptions) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const container = containerRef.current;
    container?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft" && onPrev) onPrev();
      if (event.key === "ArrowRight" && onNext) onNext();
      if (event.key === "Tab" && container) {
        const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [onClose, onPrev, onNext]);

  return containerRef;
}
