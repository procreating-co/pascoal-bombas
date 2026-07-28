/**
 * Tipos da Galeria que podem ser importados tanto no servidor quanto no cliente. A leitura
 * de arquivos (que precisa de `fs`/`path`, só funciona no servidor) fica em
 * `lib/gallery-server.ts` — não importe esse outro arquivo a partir de um componente
 * "use client". Validação de código de acesso fica em `lib/access-code.ts`.
 */

export type { GalleryPhoto, GalleryFolder, GalleryFolderDef } from "@/lib/clients/types";
