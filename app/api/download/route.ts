import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * O atributo `download` do HTML só é honrado pelo navegador em links same-origin; para os
 * vídeos (hospedados no bucket público do Cloudflare R2, origem diferente do site) o navegador
 * ignora `download` e apenas abre o arquivo. Esta rota faz o proxy do vídeo original (mesma
 * qualidade, sem recompressão) e define `Content-Disposition: attachment`, forçando o download
 * a partir do próprio domínio do site.
 */
const ALLOWED_HOST_SUFFIX = ".r2.dev";

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");
  if (!src) return new Response('Parâmetro "src" ausente.', { status: 400 });

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return new Response("URL inválida.", { status: 400 });
  }

  if (url.protocol !== "https:" || !url.hostname.endsWith(ALLOWED_HOST_SUFFIX)) {
    return new Response("Origem não permitida.", { status: 403 });
  }

  const upstream = await fetch(url);
  if (!upstream.ok || !upstream.body) {
    return new Response("Não foi possível baixar o arquivo.", { status: 502 });
  }

  const rawFilename = decodeURIComponent(url.pathname.split("/").pop() || "video.mp4");
  const asciiFallback = rawFilename.replace(/[^\x20-\x7E]/g, "_");

  const headers = new Headers();
  headers.set("Content-Type", upstream.headers.get("content-type") ?? "video/mp4");
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);
  headers.set("Content-Disposition", `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(rawFilename)}`);
  headers.set("Cache-Control", "private, max-age=0, no-store");

  return new Response(upstream.body, { headers });
}
