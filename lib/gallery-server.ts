import fs from "node:fs";
import path from "node:path";
import type { GalleryFolder } from "@/lib/gallery";

/** Pastas da galeria, na ordem de exibição. Para criar uma nova pasta, adicione uma
 *  entrada aqui e crie o diretório correspondente em public/gallery/. */
const FOLDER_DEFS: { id: string; label: string }[] = [
  { id: "retratos-pascoal", label: "Retratos Pascoal" },
  { id: "individuais", label: "Individuais" },
  { id: "equipe", label: "Equipe" },
  { id: "zona-sul", label: "Pascoal Zona Sul" },
  { id: "zona-norte", label: "Pascoal Zona Norte" },
];

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/**
 * Lê as fotos de cada pasta em public/gallery/<id>/. Basta soltar novos arquivos
 * de imagem dentro da pasta correspondente — eles aparecem automaticamente na
 * Galeria, sem editar nenhum componente.
 *
 * Server-only: usa `fs`/`path`, por isso fica separado de lib/gallery.ts (que é
 * seguro para importar em componentes "use client"). Só importe este arquivo a
 * partir de Server Components (ex.: app/galeria/page.tsx).
 *
 * Migração futura para Supabase Storage: troque apenas o corpo desta função
 * (ex.: `await supabase.storage.from("gallery").list(id)` + `getPublicUrl`),
 * mantendo a mesma assinatura `Promise<GalleryFolder[]>`. Nenhum componente
 * de UI precisa mudar — todos consomem `GalleryFolder`/`GalleryPhoto`.
 */
export async function getGalleryFolders(): Promise<GalleryFolder[]> {
  const galleryRoot = path.join(process.cwd(), "public", "gallery");

  return FOLDER_DEFS.map(({ id, label }) => {
    let files: string[] = [];
    try {
      files = fs
        .readdirSync(path.join(galleryRoot, id))
        .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()));
    } catch {
      files = [];
    }
    files.sort();

    const photos = files.map((file) => ({ src: `/gallery/${id}/${file}`, alt: `${label} — ${file}` }));
    return { id, label, photos };
  });
}
