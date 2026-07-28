"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export type ActiveVideo = { poster: string; title: string; videoSrc: string };

export default function VideoLightbox({ item, onClose }: { item: ActiveVideo; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={`Vídeo: ${item.title}`} onClick={onClose}>
      <button type="button" onClick={onClose} className="absolute right-6 top-6 z-10 flex size-12 items-center justify-center border border-white/20 text-white hover:border-[#d4af6a] hover:text-[#d4af6a]" aria-label="Fechar vídeo"><X className="size-5" /></button>
      <video autoPlay controls playsInline poster={item.poster} onClick={(event) => event.stopPropagation()} className="max-h-[90vh] max-w-[92vw] bg-black object-contain"><source src={item.videoSrc} type="video/mp4" /></video>
    </div>
  );
}
