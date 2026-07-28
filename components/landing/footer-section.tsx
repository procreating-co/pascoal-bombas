import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="relative bg-black pt-14 text-white lg:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-background via-black/70 to-black lg:h-20" />
      <div className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
        <Image src="/images/footer-earth-gradient.png" alt="Paisagem luminosa encerrando a apresentação" fill sizes="100vw" loading="lazy" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="py-10">
          <div className="max-w-4xl">
            <a href="#" className="inline-flex font-display text-3xl">Pascoal Bombas</a>
            <p className="mt-5 text-sm leading-relaxed text-white/50">Desenvolvido para Pascoal Zona Sul Comércio de Auto Peças Ltda. <br />CNPJ 90.041.187/0001-64.</p>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-white/65">Planejado e Executado por Procreating Co. © 2026</p>
        </div>
      </div>
    </footer>
  );
}
