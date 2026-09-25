import { origin, base } from "../data/portfolio";
export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${origin}${base}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain" } },
  );
}
