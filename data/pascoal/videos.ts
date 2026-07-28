import type { ClientVideos } from "@/lib/clients/types";

/**
 * Os arquivos de vídeo são grandes demais para o git (acima do limite de 100MB do GitHub) e
 * ficam hospedados no bucket público do Cloudflare R2. Para trocar um vídeo, suba o novo
 * arquivo no bucket e aponte `videoSrc`/`downloadHref` para a URL pública correspondente.
 *
 * Nota: os vídeos da Pascoal já estavam no R2 antes deste template existir, soltos na raiz
 * do bucket (sem prefixo de pasta) — por isso `R2_PUBLIC_BASE` aqui aponta direto pros
 * arquivos, sem o prefixo `clients/pascoal/videos/...` usado como padrão para clientes novos
 * (veja `data/README.md`). Não há necessidade de reorganizar o bucket já em produção.
 */
const R2_PUBLIC_BASE = "https://pub-925b76414c3f40558af2fc11a5d46fb4.r2.dev";

export const clientVideos: ClientVideos = {
  socialVideos: [
    {
      id: "social-vertical-01",
      number: "01",
      title: "Nosso processo de produção.",
      shortTitle: "Processo",
      format: "vertical",
      poster: "/images/gallery/video-02-vertical.jpg",
      videoSrc: `${R2_PUBLIC_BASE}/V%C3%ADdeo%20de%20Rede%20Social%2002%20%28Nosso%20processo%20de%20produ%C3%A7%C3%A3o%20%7BVertical%29.mp4`,
      downloadHref: `${R2_PUBLIC_BASE}/V%C3%ADdeo%20de%20Rede%20Social%2002%20%28Nosso%20processo%20de%20produ%C3%A7%C3%A3o%20%7BVertical%29.mp4`,
      ready: true,
    },
    {
      id: "social-vertical-02",
      number: "02",
      title: "Nossos Serviços",
      shortTitle: "Serviços",
      format: "vertical",
      poster: "/images/gallery/video-03-vertical.jpg",
      videoSrc: `${R2_PUBLIC_BASE}/video%2003%20rede%20social%20os%20nossos%20servi%C3%A7os%20vertical.mp4`,
      downloadHref: `${R2_PUBLIC_BASE}/video%2003%20rede%20social%20os%20nossos%20servi%C3%A7os%20vertical.mp4`,
      ready: true,
    },
    {
      id: "social-horizontal-01",
      number: "03",
      title: "Entrevista com Pascoal.",
      format: "horizontal",
      poster: "/images/gallery/video-01-horizontal.jpg",
      videoSrc: `${R2_PUBLIC_BASE}/V%C3%ADdeo%20de%20Rede%20Social%2001%20%28Nosso%20processo%20de%20produ%C3%A7%C3%A3o%20%7BHorizontal%29.mp4`,
      downloadHref: `${R2_PUBLIC_BASE}/V%C3%ADdeo%20de%20Rede%20Social%2001%20%28Nosso%20processo%20de%20produ%C3%A7%C3%A3o%20%7BHorizontal%29.mp4`,
      ready: true,
    },
  ],
  acquisitionVideo: {
    id: "acquisition-01",
    number: "01",
    title: "Disparo",
    format: "vertical",
    poster: "/images/gallery/video-disparo.jpg",
    videoSrc: `${R2_PUBLIC_BASE}/01.%20Disparo.mp4`,
    downloadHref: `${R2_PUBLIC_BASE}/01.%20Disparo.mp4`,
    ready: true,
  },
  presentationVideo: {
    id: "presentation-02",
    number: "02",
    title: "Vídeo de Apresentação",
    format: "horizontal",
    poster: "/images/gallery/video-apresentacao.jpg",
    videoSrc: `${R2_PUBLIC_BASE}/compress%20V%C3%ADdeo%20de%20Aquisi%C3%A7%C3%A3o%2002%20%28V%C3%ADdeo%20de%20Apresenta%C3%A7%C3%A3o%20-%20Reuni%C3%A3o%20Horizontal%29.mp4`,
    downloadHref: `${R2_PUBLIC_BASE}/compress%20V%C3%ADdeo%20de%20Aquisi%C3%A7%C3%A3o%2002%20%28V%C3%ADdeo%20de%20Apresenta%C3%A7%C3%A3o%20-%20Reuni%C3%A3o%20Horizontal%29.mp4`,
    ready: true,
  },
};
