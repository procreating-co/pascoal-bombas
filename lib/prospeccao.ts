/**
 * Código de acesso à área de Prospecção — fixo, só para a fase de testes.
 * Independente do código da Galeria (lib/gallery.ts), mesmo que o valor coincida.
 * Quando for endurecer a segurança, mova essa verificação para o servidor.
 */
export const PROSPECCAO_ACCESS_CODE = "admin";

export function isValidProspeccaoCode(code: string) {
  return code.trim().toLowerCase() === PROSPECCAO_ACCESS_CODE;
}
