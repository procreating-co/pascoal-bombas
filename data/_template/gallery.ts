import type { GalleryFolderDef } from "@/lib/clients/types";

/**
 * Pastas da galeria, na ordem de exibição. Para cada entrada aqui, crie o diretório
 * correspondente em `public/gallery/<slug>/<id>/` e solte as fotos dentro — elas
 * aparecem automaticamente, sem editar nenhum componente.
 */
export const galleryFolderDefs: GalleryFolderDef[] = [
  { id: "categoria-1", label: "Categoria 1" },
  { id: "categoria-2", label: "Categoria 2" },
];
