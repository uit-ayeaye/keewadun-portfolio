import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
const base = "/keewadun-portfolio";
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory()
          ? walk(path.join(dir, e.name))
          : [path.join(dir, e.name)],
      ),
    )
  ).flat();
}
const files = await walk("dist");
const pages = files.filter((f) => f.endsWith(".html"));
assert.equal(pages.length, 37, "Expected 36 bilingual pages plus a 404");
for (const file of pages) {
  const html = await readFile(file, "utf8");
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /name="description"/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /hreflang="th"/);
  assert.match(html, /type="application\/ld\+json"/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: one h1`);
  if (file === "dist/index.html" || file === "dist/th/index.html") {
    const cards = [...html.matchAll(/<a\s+class="event-row"[\s\S]*?<\/a>/g)].map(m => m[0]);
    assert.equal(cards.length, 17, `${file}: every hosting credit is present`);
    assert.ok(cards.every(card => /<img\b/.test(card)), `${file}: every credit needs a visual`);
    assert.equal(cards.filter(card => card.includes("portrait-visual")).length, 6, `${file}: unverified photographs must be labeled portraits`);
  }
  assert.match(html, /class="theme-toggle"/);
  assert.match(html, /id="menu-dialog"/);
  assert.match(html, /https:\/\/www.tiktok.com\/@keewadun/);
  assert.match(html, /tel:\+66969769369/);
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if (!url.startsWith(base + "/")) continue;
    const local = url.split("#")[0].split("?")[0].slice(base.length);
    const target = path.join(
      "dist",
      local,
      local.endsWith("/") ? "index.html" : "",
    );
    assert.ok((await stat(target)).isFile(), `${file}: missing ${target}`);
  }
  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(json);
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, 36);
const js = files.filter((f) => f.endsWith(".js"));
const jsBytes = (
  await Promise.all(js.map(async (f) => (await stat(f)).size))
).reduce((a, b) => a + b, 0);
console.log(
  JSON.stringify({
    pages: pages.length,
    sitemapURLs: 36,
    internalLinks: "passed",
    structuredData: "valid JSON",
    javascriptBytes: jsBytes,
    assets: files.length,
  }),
);
