/**
 * Helper para montar URLs públicas do Cloudflare R2 a partir de um nome de arquivo "legível"
 * (com espaços, acentos, parênteses etc.), sem precisar montar o percent-encoding na mão em
 * cada `data/<slug>/videos.ts` — troque `${base}/${encodeURIComponent(file)}` por
 * `r2Url(base, file)`.
 *
 * Usado a partir de agora só em clientes novos (`data/_template/videos.ts` e os que vierem
 * depois). `data/pascoal/videos.ts` já tem suas URLs funcionando em produção com
 * percent-encoding montado manualmente — não vale o risco de reescrever URLs que já
 * funcionam, então esse arquivo continua como está.
 */
export function r2Url(base: string, filename: string): string {
  return `${base.replace(/\/+$/, "")}/${encodeURIComponent(filename)}`;
}
