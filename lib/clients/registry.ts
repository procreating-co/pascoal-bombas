import type { ClientConfig, ClientVideos, GalleryFolderDef } from "@/lib/clients/types";
import { clientConfig as pascoalConfig } from "@/data/pascoal/config";
import { clientVideos as pascoalVideos } from "@/data/pascoal/videos";
import { galleryFolderDefs as pascoalGalleryDefs } from "@/data/pascoal/gallery";

export type ClientEntry = {
  config: ClientConfig;
  videos: ClientVideos;
  galleryFolderDefs: GalleryFolderDef[];
};

/**
 * Switchboard de clientes ativos. Next.js precisa de imports estáticos para incluir
 * cada `data/<slug>/*` no bundle corretamente — por isso um cliente novo exige uma
 * linha aqui além da pasta em `data/`. Veja o passo a passo completo em `data/README.md`.
 */
const REGISTRY: Record<string, ClientEntry> = {
  pascoal: { config: pascoalConfig, videos: pascoalVideos, galleryFolderDefs: pascoalGalleryDefs },
};

export function getClientEntry(slug: string): ClientEntry | null {
  return REGISTRY[slug] ?? null;
}
