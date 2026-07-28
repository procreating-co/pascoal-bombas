/**
 * Tipos e helpers da Galeria que podem ser importados tanto no servidor quanto
 * no cliente. A leitura de arquivos (que precisa de `fs`/`path`, só funciona no
 * servidor) fica em `lib/gallery-server.ts` — não importe esse outro arquivo a
 * partir de um componente "use client".
 */

export type { GalleryPhoto, GalleryFolder, GalleryFolderDef } from "@/lib/clients/types";

/**
 * Compara o código digitado contra a lista de códigos válidos do cliente
 * (`config.gallery.accessCodes`). Quando for endurecer a segurança, mova essa
 * verificação para o servidor (ex.: uma Route Handler que valida contra uma
 * variável de ambiente e emite um cookie assinado) em vez de comparar no cliente.
 */
export function isValidGalleryCode(code: string, validCodes: string[]) {
  const normalized = code.trim().toLowerCase();
  return validCodes.some((valid) => valid.toLowerCase() === normalized);
}
