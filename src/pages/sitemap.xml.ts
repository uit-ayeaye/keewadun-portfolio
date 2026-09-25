import { characters, cosplayHome, characterPath } from "../data/cosplay";
import { events, home, eventPath, origin } from "../data/portfolio";
export function GET() {
  const routes = [
    { en: cosplayHome("en"), th: cosplayHome("th") },
    ...characters.map((c) => ({
      en: characterPath("en", c.id),
      th: characterPath("th", c.id),
    })),
    { en: home("en"), th: home("th") },
    ...events.map((e) => ({
      en: eventPath("en", e.id),
      th: eventPath("th", e.id),
    })),
  ];
  const urls = routes
    .flatMap((route) =>
      [route.en, route.th].map(
        (path) =>
          `<url><loc>${origin}${path}</loc><xhtml:link rel="alternate" hreflang="en" href="${origin}${route.en}"/><xhtml:link rel="alternate" hreflang="th" href="${origin}${route.th}"/><xhtml:link rel="alternate" hreflang="x-default" href="${origin}${route.en}"/></url>`,
      ),
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
