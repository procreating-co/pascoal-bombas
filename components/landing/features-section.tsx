"use client";

import { useEffect, useRef, useState } from "react";

const photos: { src: string | null; alt: string; category: string }[] = [
  { src: "/images/gallery/retratos-pascoal.jpg", alt: "Retratos da Pascoal Bombas", category: "Retratos Pascoal" },
  { src: "/images/gallery/individuais.jpg", alt: "Retratos individuais da equipe", category: "Individuais" },
  { src: "/images/gallery/equipe.jpg", alt: "Equipe da Pascoal Bombas", category: "Equipe" },
  { src: "/images/gallery/pascoal-zona-sul.jpg", alt: "Unidade Pascoal Zona Sul", category: "Pascoal Zona Sul" },
  { src: "/images/gallery/zona-norte.jpg", alt: "Unidade Pascoal Zona Norte", category: "Pascoal Zona Norte" },
];

function PhotoCarousel({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      onWheel={(event) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
          event.currentTarget.scrollBy({ left: event.deltaY, behavior: "smooth" });
        }
      }}
      className="flex w-full cursor-grab touch-pan-x snap-x snap-mandatory gap-4 overflow-x-scroll scroll-smooth pb-2 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {photos.map((photo, index) => (
        <a
          key={photo.category}
          href="/galeria"
          className={`group relative h-[380px] w-[78vw] max-w-[280px] shrink-0 snap-start overflow-hidden bg-black transition-all duration-700 sm:h-[430px] sm:w-[46%] sm:max-w-none lg:w-[38%] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ transitionDelay: isVisible ? `${index * 120}ms` : "0ms" }}
          aria-label={`Acessar galeria: ${photo.category}`}
        >
          {photo.src ? (
            <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-focus-visible:scale-105 group-focus-visible:opacity-100" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/[0.02]">
              <span className="font-mono text-xs uppercase tracking-wide text-white/30">Em breve</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
          <span className="absolute bottom-5 left-5 right-5 translate-y-2 text-left font-display text-lg text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">{photo.category}</span>
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
          <div className="flex flex-col justify-center p-8 text-left lg:p-12">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-white/40">01.</span>
              <h3 className="font-display text-4xl">Fotos Produzidas</h3>
            </div>
            <p className="mt-6 pl-10 text-lg leading-relaxed text-white/55">Captamos a essência da equipe, dos ambientes e processos das Oficinas Pascoal.</p>
            <div className="mt-6 pl-10">
              <a href="/galeria" className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#d4af6a] px-6 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white">
                Acessar Galeria
              </a>
            </div>
          </div>
          <div className="min-w-0 p-6 lg:p-10"><PhotoCarousel isVisible={isVisible} /></div>
        </div>
      </div>
    </section>
  );
}
