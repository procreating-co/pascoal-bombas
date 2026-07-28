"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Download, Play } from "lucide-react";
import { acquisitionVideo, presentationVideo, socialVideos, type VideoItem } from "@/lib/content/videos";
import { VideoCard, VideoPoster } from "@/components/landing/video-card";
import type { ActiveVideo } from "@/components/landing/video-lightbox";

const VideoLightbox = dynamic(() => import("@/components/landing/video-lightbox"));

/**
 * Vídeo "solto": cabeçalho acima da mídia, sem card/borda envolvendo os dois.
 * Cabeçalho reaproveita EXATAMENTE as classes do header do VideoCard (referência: Conteúdos para aquisição).
 */
function VideoTile({ video, title, onOpen }: { video: VideoItem; title: string; onOpen: () => void }) {
  return (
    <div className="w-full lg:w-80 lg:max-w-[340px] lg:flex-1">
      <div className="mb-4 flex shrink-0 items-center gap-4 lg:mb-5">
        <span className="shrink-0 font-display text-3xl text-[#d4af6a]">{video.number}.</span>
        <h3 className="min-w-0 shrink text-balance text-left font-display text-xl leading-snug lg:text-2xl">{title}</h3>
        <span className="h-px min-w-6 flex-1 bg-white/15" />
        {video.ready && (
          <a
            href={video.downloadHref}
            download
            className="flex size-10 shrink-0 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-[#d4af6a] hover:text-[#d4af6a]"
            aria-label={`Baixar vídeo ${video.number}`}
          >
            <Download className="size-4" />
          </a>
        )}
      </div>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Abrir vídeo em tela cheia: ${title}`}
        className="group relative block aspect-[9/16] w-full overflow-hidden rounded-lg"
      >
        <VideoPoster item={video} />
        <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/35" />
        <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/35 text-white backdrop-blur-sm transition-all group-hover:scale-110 group-hover:border-[#d4af6a] group-hover:text-[#d4af6a]">
          <Play className="ml-1 size-5 fill-current" />
        </span>
      </button>
    </div>
  );
}

export function HowItWorksSection({ firstVideoTitle }: { firstVideoTitle: string }) {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [verticalOne, verticalTwo, horizontalVideo] = socialVideos;

  return (
    <section id="how-it-works" ref={sectionRef} className="relative overflow-hidden bg-[oklch(0.09_0.01_260)] pb-8 pt-8 text-white lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <header className={`mx-auto mb-16 max-w-4xl text-center transition-all duration-1000 lg:mb-20 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <span className="mb-3 inline-flex items-center gap-3 font-mono text-sm text-white/45"><span className="h-px w-12 bg-[#d4af6a]" />Vídeos<span className="h-px w-12 bg-[#d4af6a]" /></span>
          <h2 className="text-balance font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-[96px]">Conteúdos <span className="block text-white/40">para redes sociais.</span></h2>
        </header>

        <div className="overflow-hidden bg-black text-white lg:grid lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="flex flex-col justify-center p-6 text-left sm:p-8 lg:p-12">
            <div className="flex items-baseline gap-3 sm:gap-4">
              <span className="font-mono text-sm text-white/40">02.</span>
              <h3 className="font-display text-2xl sm:text-4xl">Vídeos Produzidos.</h3>
            </div>
            <p className="mt-4 pl-0 text-base leading-relaxed text-white/55 sm:mt-6 sm:pl-10 sm:text-lg">Conteúdos estratégicos para ambos os perfis, programados para estreia a partir dessa sexta-feira.</p>
          </div>
          <div className="min-w-0 p-6 lg:p-10">
            <div className="flex w-full flex-col gap-6 lg:flex-row lg:justify-end">
              <VideoTile
                video={verticalOne}
                title="Processo"
                onOpen={() => setActiveVideo({ poster: verticalOne.poster, title: "Processo", videoSrc: verticalOne.videoSrc })}
              />
              <VideoTile
                video={verticalTwo}
                title="Serviços"
                onOpen={() => setActiveVideo({ poster: verticalTwo.poster, title: "Serviços", videoSrc: verticalTwo.videoSrc })}
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <VideoCard
            video={horizontalVideo}
            onOpen={() => setActiveVideo({ poster: horizontalVideo.poster, title: horizontalVideo.title, videoSrc: horizontalVideo.videoSrc })}
          />
        </div>

        {/* Conteúdos para estratégia de aquisição */}
        <div className="mt-8 lg:mt-10">
          <header className="mb-8 text-center lg:mb-10">
            <span className="mb-3 inline-flex items-center gap-3 font-mono text-sm text-white/45"><span className="h-px w-12 bg-[#d4af6a]" />Estratégia de Aquisição<span className="h-px w-12 bg-[#d4af6a]" /></span>
            <h2 className="text-balance font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-[96px]">Conteúdos <span className="block text-white/40">para aquisição.</span></h2>
          </header>

          <div className="flex flex-col gap-5 lg:h-[540px] lg:flex-row">
            <VideoCard
              video={acquisitionVideo}
              bare
              stretch
              className="lg:w-[320px] lg:shrink-0"
              onOpen={() => setActiveVideo({ poster: acquisitionVideo.poster, title: acquisitionVideo.title, videoSrc: acquisitionVideo.videoSrc })}
            />

            <VideoCard
              video={presentationVideo}
              stretch
              className="lg:flex-1"
              onOpen={() => setActiveVideo({ poster: presentationVideo.poster, title: presentationVideo.title, videoSrc: presentationVideo.videoSrc })}
            />
          </div>
        </div>
      </div>
      {activeVideo && <VideoLightbox item={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  );
}
