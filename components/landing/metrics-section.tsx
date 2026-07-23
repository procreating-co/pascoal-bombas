"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const basePosts = [
  { doctor: "Dra. Maria T.", topic: "Avaliações no Google", messages: 12 },
  { doctor: "Dra. Bruna M.", topic: "Casos de Burnout", messages: 9 },
  { doctor: "Dra. Aline M.", topic: "Caso do Neymar", messages: 7 },
  { doctor: "Dra. Maria T.", topic: "Palestra", messages: 6 },
  { doctor: "Dra. Maria T.", topic: "Carrossel de Vídeos", messages: 4 },
  { doctor: "Dra. Bruna M.", topic: "Depoimento da Semana", messages: 6 },
];

function daySeed(date: Date) {
  return date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate();
}

export function MetricsSection() {
  const [now, setNow] = useState<Date | null>(null);
  const [views, setViews] = useState(12_847_392);
  const [elapsed, setElapsed] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const clock = setInterval(tick, 1000);
    const counter = setInterval(() => {
      setViews((value) => value + 1);
      setElapsed((value) => value + 1);
    }, 1000);
    return () => { clearInterval(clock); clearInterval(counter); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const posts = useMemo(() => {
    const seed = now ? daySeed(now) : 0;
    const dailyShift = seed % 3;
    const updated = basePosts.map((post, index) => ({
      ...post,
      messages: post.messages + ((seed + index) % 2),
    }));
    if (elapsed >= 8) updated[0].messages = 13;
    if (elapsed >= 30) {
      updated[3].messages = 8;
      const [palestra] = updated.splice(3, 1);
      updated.splice(2, 0, palestra);
    }
    return updated;
  }, [elapsed, now]);

  const brazilTime = now?.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const today = now?.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] [background-size:60px_60px]" aria-hidden="true" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-20 lg:mb-32">
          <div className="lg:col-span-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center gap-2 px-3 py-1 bg-[#eca8d6]/10 text-[#eca8d6] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#eca8d6] animate-pulse" /> LIVE
              </span>
              <span className="text-sm font-mono text-muted-foreground">{brazilTime ? `${brazilTime} BRT` : ""}</span>
            </div>
            <h2 className={`text-5xl md:text-7xl lg:text-[120px] font-display tracking-tight leading-[0.95] text-balance transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Métricas dos nossos clientes<br /><span className="text-muted-foreground">em tempo real.</span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <article className="lg:col-span-2 border border-foreground/10 bg-foreground/[0.02] p-8 lg:p-12">
            <div className="text-4xl md:text-6xl lg:text-7xl font-display tabular-nums mb-5">{views.toLocaleString("pt-BR")}</div>
            <p className="text-lg">{views.toLocaleString("pt-BR")} visualizações esse mês</p>
          </article>
          <article className="border border-foreground/10 bg-foreground/[0.02] p-8 lg:p-12 flex flex-col justify-between gap-10">
            <div><span className="text-sm font-mono text-muted-foreground">{today}</span><h3 className="text-5xl font-display mt-3">48 vídeos</h3></div>
            <p className="text-muted-foreground">entregues esse mês<br />conteúdos com melhor performance</p>
          </article>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <article key={`${post.doctor}-${post.topic}`} className={`border border-foreground/10 bg-foreground/[0.02] p-7 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${index * 70}ms` }}>
              <div className="flex items-start justify-between gap-4 mb-10">
                <span className="text-sm font-mono text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <span className="w-2 h-2 rounded-full bg-[#eca8d6] animate-pulse" />
              </div>
              <h3 className="text-2xl font-display mb-2">{post.doctor}</h3>
              <p className="text-muted-foreground mb-8">{post.topic}</p>
              <p className="font-mono text-sm">{String(post.messages).padStart(2, "0")} mensagens recebidas</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
