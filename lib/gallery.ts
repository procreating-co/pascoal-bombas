/**
 * Tipos e constantes da Galeria que podem ser importados tanto no servidor quanto
 * no cliente. A leitura de arquivos (que precisa de `fs`/`path`, só funciona no
 * servidor) fica em `lib/gallery-server.ts` — não importe esse outro arquivo a
 * partir de um componente "use client".
 */

/**
 * Códigos de acesso à Galeria — fixos, só para a fase de testes.
 * Para adicionar/trocar códigos, edite a lista abaixo.
 * Quando for endurecer a segurança, mova essa verificação para o servidor
 * (ex.: uma Route Handler que valida contra uma variável de ambiente e emite
 * um cookie assinado) em vez de comparar no cliente como hoje.
 */
export const GALLERY_ACCESS_CODES = ["pascoal", "admin"];

export function isValidGalleryCode(code: string) {
  return GALLERY_ACCESS_CODES.includes(code.trim().toLowerCase());
}

export type GalleryPhoto = { src: string; alt: string };
export type GalleryFolder = { id: string; label: string; photos: GalleryPhoto[] };
