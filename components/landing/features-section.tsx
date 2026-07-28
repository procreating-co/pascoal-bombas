"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const photos: { src: string | null; alt: string; category: string }[] = [
  { src: "/images/gallery/retratos-pascoal.jpg", alt: "Retratos da Pascoal Bombas", category: "Retratos Pascoal" },
  { src: "/images/gallery/individuais.jpg", alt: "Retratos individuais da equipe", category: "Individuais" },
  { src: "/images/gallery/equipe.jpg", alt: "Equipe da Pascoal Bombas", category: "Equipe" },
  { src: "/images/gallery/pascoal-zona-sul.jpg", alt: "Unidade Pascoal Zona Sul", category: "Pascoal Zona Sul" },
  { src: "/images/gallery/zona-norte.jpg", alt: "Unidade Pascoal Zona Norte", category: "Pascoal Zona Norte" },
];

const AUTO_ADVANCE_MS = 2000;

function PhotoCarousel({ isVisible }: { isVisible: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pausedRef = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    if (!mql.matches) return;

    let index = 0;
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      index = (index + 1) % photos.length;
      slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, []);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  return (
    <div
      ref={trackRef}
      onWheel={(event) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
          event.currentTarget.scrollBy({ left: event.deltaY, behavior: "smooth" });
        }
      }}
      onPointerDown={pause}
      onPointerUp={resume}
      onPointerCancel={resume}
      className="flex w-full cursor-grab touch-pan-x snap-x snap-mandatory gap-4 overflow-x-scroll scroll-smooth pb-2 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {photos.map((photo, index) => (
        <a
          key={photo.category}
          ref={(el) => { slideRefs.current[index] = el; }}
          href="/galeria"
          className={`group relative h-[380px] w-[78vw] max-w-[280px] shrink-0 snap-start overflow-hidden bg-black transition-all duration-700 sm:h-[430px] sm:w-[46%] sm:max-w-none lg:w-[38%] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ transitionDelay: isVisible ? `${index * 120}ms` : "0ms" }}
          aria-label={`Acessar galeria: ${photo.category}`}
        >
          {photo.src ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 46vw, 78vw"
              loading="lazy"
              className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-focus-visible:scale-105 group-focus-visible:opacity-100"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/[0.02]">
              <span className="font-mono text-xs uppercase tracking-wide text-white/30">Em breve</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-100 transition-opacity duration-300 lg:opacity-40 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100" />
          <span className="absolute bottom-5 left-5 right-5 translate-y-0 text-left font-display text-lg text-white opacity-100 transition-all duration-300 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">{photo.category}</span>
        </a>
      ))}
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="relative overflow-hidden pb-8 pt-[38px] lg:pb-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mx-auto mb-4 max-w-5xl text-center md:mb-5">
          <span className="mb-4 inline-flex items-center gap-3 font-sans text-sm text-muted-foreground md:mb-5"><span className="h-px w-12 bg-[#d4af6a]" />Projeto Inicial<span className="h-px w-12 bg-[#d4af6a]" /></span>
          <h2 className={`text-balance font-display text-4xl leading-[0.95] tracking-tight transition-all duration-1000 sm:text-5xl md:text-7xl lg:text-[92px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            Posicionamento e Aquisição.
          </h2>
        </div>

        <div id="fotos" className="scroll-mt-24 overflow-hidden bg-black text-white lg:grid lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="flex flex-col justify-center p-6 text-left sm:p-8 lg:p-12">
            <div className="flex items-baseline gap-3 sm:gap-4">
              <span className="font-mono text-sm text-white/40">01.</span>
              <h3 className="font-display text-2xl sm:text-4xl">Fotos Produzidas</h3>
            </div>
            <p className="mt-4 pl-0 text-base leading-relaxed text-white/55 sm:mt-6 sm:pl-10 sm:text-lg">Captamos a essência da equipe, dos ambientes e processos das Oficinas Pascoal.</p>
            <div className="mt-4 hidden pl-0 sm:mt-6 sm:pl-10 lg:block">
              <a href="/galeria" className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#d4af6a] px-6 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white">
                Acessar Galeria
              </a>
            </div>
          </div>
          <div className="min-w-0 p-6 lg:p-10"><PhotoCarousel isVisible={isVisible} /></div>
          <div className="px-6 pb-6 pt-2 lg:hidden">
            <a href="/galeria" className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#d4af6a] px-6 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white">
              Acessar Galeria
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
