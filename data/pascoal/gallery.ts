import type { GalleryFolderDef } from "@/lib/clients/types";

/**
 * Pastas da galeria, na ordem de exibição. Para criar uma nova pasta, adicione uma
 * entrada aqui e crie o diretório correspondente em `public/gallery/pascoal/`.
 */
export const galleryFolderDefs: GalleryFolderDef[] = [
  { id: "retratos-pascoal", label: "Retratos Pascoal" },
  { id: "individuais", label: "Individuais" },
  { id: "equipe", label: "Equipe" },
  { id: "zona-sul", label: "Pascoal Zona Sul" },
  { id: "zona-norte", label: "Pascoal Zona Norte" },
];
