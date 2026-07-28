import { getClientEntry, getRegisteredClientSlugs } from "@/lib/clients/registry";
import type { ClientConfig, ClientVideos, GalleryFolderDef } from "@/lib/clients/types";

export type { ClientConfig, ClientVideos, GalleryFolderDef, VideoItem, ProspeccaoConfig } from "@/lib/clients/types";

/**
 * As 4 funções abaixo satisfazem, juntas, o contrato `ClientDataProvider`
 * (`lib/clients/provider.ts`) — hoje como lookup síncrono em `data/<slug>/*.ts`. É este
 * arquivo que muda quando a origem dos dados virar Supabase; os componentes (que só
 * conhecem `@/lib/clients`, nunca `@/data/...` diretamente) não precisam mudar.
 */

export function getClientConfig(slug: string): ClientConfig | null {
  return getClientEntry(slug)?.config ?? null;
}

export function getClientVideos(slug: string): ClientVideos | null {
  return getClientEntry(slug)?.videos ?? null;
}

export function getClientGalleryFolderDefs(slug: string): GalleryFolderDef[] | null {
  return getClientEntry(slug)?.galleryFolderDefs ?? null;
}

export { getRegisteredClientSlugs };
