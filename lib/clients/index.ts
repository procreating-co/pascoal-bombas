import { getClientEntry } from "@/lib/clients/registry";
import type { ClientConfig, ClientVideos, GalleryFolderDef } from "@/lib/clients/types";

export type { ClientConfig, ClientVideos, GalleryFolderDef, VideoItem, ProspeccaoConfig } from "@/lib/clients/types";

export function getClientConfig(slug: string): ClientConfig | null {
  return getClientEntry(slug)?.config ?? null;
}

export function getClientVideos(slug: string): ClientVideos | null {
  return getClientEntry(slug)?.videos ?? null;
}

export function getClientGalleryFolderDefs(slug: string): GalleryFolderDef[] | null {
  return getClientEntry(slug)?.galleryFolderDefs ?? null;
}
