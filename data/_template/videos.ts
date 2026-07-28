import type { ClientVideos } from "@/lib/clients/types";

/**
 * Vídeos hospedados no bucket público do Cloudflare R2 (arquivos grandes demais para o git).
 * Para um cliente novo, suba os arquivos em `clients/<slug>/videos/` dentro do bucket — esse
 * prefixo por cliente é o padrão a partir daqui (a Pascoal é a única exceção histórica, com
 * vídeos soltos na raiz do bucket; veja `data/README.md`).
 */
const R2_PUBLIC_BASE = "https://<seu-bucket>.r2.dev/clients/cliente-exemplo/videos";

export const clientVideos: ClientVideos = {
  socialVideos: [
    {
      id: "social-vertical-01",
      number: "01",
      title: "Título completo do vídeo (legenda no lightbox).",
      shortTitle: "Título curto", // opcional — cabeçalho do card quando o completo não cabe
      format: "vertical",
      poster: "/images/gallery/video-01-vertical.jpg",
      videoSrc: `${R2_PUBLIC_BASE}/social-01.mp4`,
      downloadHref: `${R2_PUBLIC_BASE}/social-01.mp4`,
      ready: true,
    },
    {
      id: "social-vertical-02",
      number: "02",
      title: "Título completo do vídeo.",
      format: "vertical",
      poster: "/images/gallery/video-02-vertical.jpg",
      videoSrc: `${R2_PUBLIC_BASE}/social-02.mp4`,
      downloadHref: `${R2_PUBLIC_BASE}/social-02.mp4`,
      ready: true,
    },
    {
      id: "social-horizontal-01",
      number: "03",
      title: "Título completo do vídeo.",
      format: "horizontal",
      poster: "/images/gallery/video-03-horizontal.jpg",
      videoSrc: `${R2_PUBLIC_BASE}/social-03.mp4`,
      downloadHref: `${R2_PUBLIC_BASE}/social-03.mp4`,
      ready: true,
    },
  ],
  acquisitionVideo: {
    id: "acquisition-01",
    number: "01",
    title: "Disparo",
    format: "vertical",
    poster: "/images/gallery/video-disparo.jpg",
    videoSrc: `${R2_PUBLIC_BASE}/acquisition-01.mp4`,
    downloadHref: `${R2_PUBLIC_BASE}/acquisition-01.mp4`,
    ready: true,
  },
  presentationVideo: {
    id: "presentation-02",
    number: "02",
    title: "Vídeo de Apresentação",
    format: "horizontal",
    poster: "/images/gallery/video-apresentacao.jpg",
    videoSrc: `${R2_PUBLIC_BASE}/presentation-02.mp4`,
    downloadHref: `${R2_PUBLIC_BASE}/presentation-02.mp4`,
    ready: true,
  },
};
