/**
 * Tipos de vídeo do template — os dados de cada cliente ficam em `data/<slug>/videos.ts`,
 * carregados via `lib/clients`. Este arquivo só re-exporta os tipos para quem já importa
 * daqui (`VideoItem`, `VideoFormat`).
 */
export type { VideoItem, VideoFormat, ClientVideos } from "@/lib/clients/types";
