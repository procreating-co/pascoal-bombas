"use client";

import { useEffect } from "react";
import { Download, Play, X } from "lucide-react";
import type { VideoItem } from "@/lib/content/videos";

export type ActiveVideo = { poster: string; title: string; videoSrc: string };

export function VideoLightbox({ item, onClose }: { item: ActiveVideo; onClose: () => void }) {
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

/** Renderiza a capa do vídeo. `contain-blur` evita cortar mal uma foto cujo formato
 *  não bate com o card (ex.: foto horizontal usada provisoriamente num card vertical). */
export function VideoPoster({ item }: { item: VideoItem }) {
  if (item.posterFit === "contain-blur") {
    return (
      <>
        <img src={item.poster} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
        <img src={item.poster} alt="" className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" />
      </>
    );
  }
  return <img src={item.poster || "/placeholder.svg"} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />;
}

/**
 * Card de vídeo padrão do site: número, linha divisória, título e botão de download (ou selo de
 * status) juntos numa única linha acima da mídia. Vídeos verticais mantêm moldura completa
 * (acabamento premium); vídeos horizontais não têm borda/padding lateral, para aproveitar melhor
 * o espaço.
 */
export function VideoCard({ video, titleOverride, badgeOverride, bare, stretch, onOpen, className }: { video: VideoItem; titleOverride?: string; badgeOverride?: string; bare?: boolean; stretch?: boolean; onOpen: () => void; className?: string }) {
  const isHorizontal = video.format === "horizontal" || bare;
  const aspectClass = video.format === "horizontal" ? "aspect-video" : "aspect-[9/16]";
  const mediaClass = stretch ? `${aspectClass} lg:aspect-auto lg:min-h-0 lg:flex-1` : aspectClass;
  const title = titleOverride ?? video.title;

  return (
    <article className={`group ${stretch ? "flex flex-col lg:h-full" : ""} ${isHorizontal ? "py-4 lg:py-5" : "bg-black p-5 lg:p-7"} ${className ?? ""}`}>
      <div className="mb-4 flex shrink-0 items-center gap-4 lg:mb-5">
        <span className="shrink-0 font-display text-3xl text-[#d4af6a]">{video.number}.</span>
        <h3 className="min-w-0 shrink text-balance text-left font-display text-xl leading-snug lg:text-2xl">{title}</h3>
        <span className="h-px min-w-6 flex-1 bg-white/15" />
        {video.ready ? (
          <a href={video.downloadHref} download className="flex size-10 shrink-0 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-[#d4af6a] hover:text-[#d4af6a]" aria-label={`Baixar vídeo ${video.number}`}><Download className="size-4" /></a>
        ) : (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-white/35">{badgeOverride ?? "Em produção"}</span>
        )}
      </div>
      {video.ready ? (
        <button type="button" onClick={onOpen} className={`relative block ${mediaClass} w-full overflow-hidden text-left`} aria-label={`Abrir vídeo em tela cheia: ${title}`}>
          <VideoPoster item={video} />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/35" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/35 text-white backdrop-blur-sm transition-all group-hover:scale-110 group-hover:border-[#d4af6a] group-hover:text-[#d4af6a]"><Play className="ml-1 size-5 fill-current" /></span>
        </button>
      ) : (
        <div className={`relative block ${mediaClass} w-full overflow-hidden opacity-60`} aria-hidden="true">
          <VideoPoster item={video} />
          <span className="absolute inset-0 bg-black/50" />
        </div>
      )}
    </article>
  );
}
