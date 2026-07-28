/**
 * Valida o código digitado contra o `accessCode` do módulo de prospecção do
 * cliente (`config.prospeccao.accessCode`). Independente do código da Galeria,
 * mesmo que o valor coincida. Quando for endurecer a segurança, mova essa
 * verificação para o servidor.
 */
export function isValidProspeccaoCode(code: string, accessCode: string) {
  return code.trim().toLowerCase() === accessCode.trim().toLowerCase();
}
