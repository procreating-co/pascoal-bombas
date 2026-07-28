import Image from "next/image";

const DEFAULT_BACKGROUND_IMAGE = "/images/footer-earth-gradient.png";

export type FooterSectionProps = {
  brandName: string;
  /** Duas frases legais separadas por `\n` (ex.: razão social e CNPJ), renderizadas em linhas separadas. */
  legalLine: string;
  backgroundImage?: string;
};

export function FooterSection({ brandName, legalLine, backgroundImage }: FooterSectionProps) {
  const legalLines = legalLine.split("\n");

  return (
    <footer className="relative bg-black pt-14 text-white lg:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-background via-black/70 to-black lg:h-20" />
      <div className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
        <Image src={backgroundImage ?? DEFAULT_BACKGROUND_IMAGE} alt="Paisagem luminosa encerrando a apresentação" fill sizes="100vw" loading="lazy" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="py-10">
          <div className="max-w-4xl">
            <a href="#" className="inline-flex font-display text-3xl">{brandName}</a>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              {legalLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < legalLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-white/65">Planejado e Executado por Procreating Co. © 2026</p>
        </div>
      </div>
    </footer>
  );
}
