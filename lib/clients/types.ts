/**
 * Tipos do template multi-cliente. Um cliente novo = uma pasta em `data/<slug>/`
 * exportando `clientConfig: ClientConfig`, `videos: ClientVideos` e
 * `galleryFolderDefs: GalleryFolderDef[]` (veja `data/_template/`).
 *
 * Campos sem `?` são obrigatórios — se um `config.ts` de cliente não preencher algo
 * essencial, o build/type-check falha imediatamente em vez de quebrar em produção.
 */

export type VideoFormat = "horizontal" | "vertical";

export type VideoItem = {
  id: string;
  number: string;
  /** Título completo (usado como legenda no lightbox). */
  title: string;
  /** Título curto para o cabeçalho do card, quando o completo não cabe. Se ausente, usa `title`. */
  shortTitle?: string;
  format: VideoFormat;
  poster: string;
  /** "contain-blur" evita cortar mal uma foto cujo formato não bate com o card. Padrão: "cover". */
  posterFit?: "cover" | "contain-blur";
  videoSrc: string;
  downloadHref: string;
  ready: boolean;
};

export type ClientVideos = {
  /** Bloco "Conteúdos para redes sociais" — ordem de exibição = ordem do array. */
  socialVideos: VideoItem[];
  /** Bloco "Conteúdos para aquisição" — par lado a lado. */
  acquisitionVideo: VideoItem;
  presentationVideo: VideoItem;
};

export type GalleryPhoto = { src: string; alt: string };
export type GalleryFolder = { id: string; label: string; photos: GalleryPhoto[] };
/** Metadata de uma pasta da galeria — as fotos em si vêm do filesystem (`public/gallery/<slug>/<id>/`). */
export type GalleryFolderDef = { id: string; label: string };

export type FeaturedPhoto = { src: string; alt: string; category: string };

export type ProspeccaoConfig = {
  /** Código de acesso da área de prospecção (independente da senha da galeria). */
  accessCode: string;
  /** Data-alvo do desbloqueio do contador, ISO 8601 com timezone (ex.: "2026-07-30T00:00:00-03:00"). */
  unlockAt: string;
  /** Eyebrow do card-teaser na Home (ex.: "Estratégia de Aquisição"). */
  eyebrow: string;
  /** Início do heading do teaser, seguido da palavra que alterna ("<headingPrefix> <typingWords[i]>"). */
  headingPrefix: string;
  /** Palavras que alternam na animação de digitação do heading. */
  typingWords: [string, string, string];
  /** Rótulos dos 3 passos do funil (ícones de lista → disparo → reunião). */
  funnelSteps: [string, string, string];
  /** Título da página /prospeccao já desbloqueada (ex.: "Central de Prospecção"). */
  title: string;
  ctaLabel: string;
  toastText: string;
};

export type FooterEasterEggConfig = {
  /** Linhas digitadas sequencialmente no overlay ao chegar no rodapé. */
  lines: string[];
  /** Palavra/trecho destacado em dourado dentro das linhas acima (deve ser um substring exato de alguma linha). */
  highlightWord: string;
} | null;

export type ClientConfig = {
  slug: string;
  brandName: string;
  logo: string;
  metadata: {
    title: string;
    description: string;
  };
  theme: {
    /** Cor de destaque do cliente (hex). Pascoal usa o dourado atual, "#d4af6a". */
    accentColor: string;
  };
  nav: {
    galleryLabel: string;
    prospeccaoCtaLabel: string;
  };
  hero: {
    /** As duas linhas da animação de boas-vindas digitada. */
    welcomeLines: [string, string];
    backgroundVideo: string;
    paragraph: string;
    stats: {
      videosCount: number;
      videosLabel: string;
      photosCount: number;
      photosLabel: string;
    };
  };
  features: {
    eyebrow: string;
    heading: string;
    blockNumber: string;
    blockTitle: string;
    subtitle: string;
    galleryButtonLabel: string;
    /** Fotos em destaque no carrossel da Home (teaser da galeria completa). */
    photos: FeaturedPhoto[];
  };
  videosSection: {
    eyebrow: string;
    headingPrefix: string;
    headingSuffix: string;
    blockNumber: string;
    blockTitle: string;
    subtitle: string;
    acquisitionEyebrow: string;
    acquisitionHeadingPrefix: string;
    acquisitionHeadingSuffix: string;
  };
  footer: {
    legalLine: string;
    /** Imagem de fundo do rodapé. Se ausente, usa a imagem decorativa padrão do template. */
    backgroundImage?: string;
  };
  footerEasterEgg: FooterEasterEggConfig;
  gallery: {
    accessCodes: string[];
    lockScreenTitle: string;
    /** Link para o Google Drive (ou outro storage) com o acervo completo. Se ausente, o convite some da Galeria. */
    driveUrl?: string;
  };
  /** Módulo opcional. `null` desativa a rota `/p/<slug>/prospeccao`, a seção na Home e o CTA no menu. */
  prospeccao: ProspeccaoConfig | null;
};
