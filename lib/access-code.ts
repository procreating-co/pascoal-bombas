/**
 * Validação de código de acesso compartilhada pela Galeria (`config.gallery.accessCodes`,
 * uma lista) e pela Prospecção (`config.prospeccao.accessCode`, um valor único). Comparação
 * é case-insensitive e ignora espaços nas pontas.
 *
 * Client-safe (sem `fs`), pode ser importado em componentes "use client".
 *
 * Quando for endurecer a segurança, mova essa verificação para o servidor (ex.: uma Route
 * Handler que valida contra uma variável de ambiente e emite um cookie assinado) em vez de
 * comparar no cliente.
 */
export function isValidAccessCode(code: string, validCodes: string | string[]): boolean {
  const normalized = code.trim().toLowerCase();
  const candidates = Array.isArray(validCodes) ? validCodes : [validCodes];
  return candidates.some((valid) => valid.trim().toLowerCase() === normalized);
}
