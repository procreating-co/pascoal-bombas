"use client";

import { useEffect, useRef, useState } from "react";

const commitments = [
  { number: "01", title: "Estratégia de Conteúdo", detail: "Direcionamento editorial alinhado aos seus objetivos, público e posicionamento." },
  { number: "02", title: "Produção de Roteiros", detail: "Narrativas autorais, claras e envolventes para transformar conhecimento em conexão." },
  { number: "03", title: "Captação de Vídeo", detail: "Direção cuidadosa para registrar sua presença com naturalidade e excelência." },
  { number: "04", title: "Ensaio Fotográfico", detail: "Imagens profissionais que valorizam sua identidade e fortalecem sua autoridade." },
  { number: "05", title: "Edição", detail: "Acabamento visual consistente, sofisticado e fiel à identidade construída." },
  { number: "06", title: "Postagem", detail: "Organização e publicação estratégica para manter sua presença digital ativa." },
];

export function IntegrationsSection({ continuityMessage }: { continuityMessage: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrations" ref={sectionRef} className="relative overflow-hidden">
      <div className="relative z-10 px-6 pt-16 text-center lg:pt-20">
        <span
          className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-12 h-px bg-foreground/20" />
          Por enquanto é isso, mas...
          <span className="w-12 h-px bg-foreground/20" />
        </span>

        <h2
          className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Bora
          <br />
          <span className="text-muted-foreground">continuar?</span>
        </h2>

        <p
          className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {continuityMessage}
        </p>
      </div>

      <div
        className={`relative left-1/2 -mt-24 w-screen -translate-x-1/2 transition-all duration-1000 delay-200 lg:-mt-36 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png"
          alt="Conexões luminosas representando uma parceria de longo prazo"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto mt-10 max-w-[1400px] px-6 pb-16 lg:mt-16 lg:px-12 lg:pb-20">
        <h3 className="mb-10 text-center font-display text-4xl tracking-tight md:text-5xl">O que faríamos?</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {commitments.map((item, index) => (
            <article
              key={item.title}
              className={`group relative overflow-hidden p-6 lg:p-8 border transition-all duration-500 ${
                hoveredIndex === index
                  ? "border-foreground bg-foreground/[0.04] scale-[1.02]"
                  : "border-foreground/10 hover:border-foreground/30"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 40 + 300}ms` }}
              onMouseEnter={(event) => {
                setHoveredIndex(index);
                const rect = event.currentTarget.getBoundingClientRect();
                setMousePos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
              }}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setMousePos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setMousePos(null);
              }}
            >
              {hoveredIndex === index && mousePos && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                  }}
                />
              )}
              <span className="relative block text-xs font-mono text-muted-foreground mb-12">
                {item.number}
              </span>
              <h3 className="relative text-2xl lg:text-3xl font-display mb-2">{item.title}</h3>
              <p className="relative text-sm text-muted-foreground">{item.detail}</p>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20 overflow-hidden">
                <div
                  className={`h-full bg-foreground transition-all duration-500 ${
                    hoveredIndex === index ? "w-full" : "w-0"
                  }`}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
