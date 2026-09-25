# Kayyalis cosplay portfolio

Separate visual identity at `/cosplay/` and `/th/cosplay/`, plus 11 character pages per language. The existing Dada MC portfolio remains at its existing URLs. Both portfolios link to one another.

## Content provenance

Collected September 26, 2026 from the requested public profiles:
- Instagram: https://www.instagram.com/kayyalis.cos/ — all 20 visible posts: 15 photo posts containing 68 images (including a Miyabi reaction illustration), and five reels.
- TikTok: https://www.tiktok.com/@keewadun — 20 posts with cosplay captions, curated from the public profile. Non-cosplay posts are excluded.

`src/data/cosplay-photos.json` preserves each original post URL and photographer credit when stated. `src/data/cosplay-videos.json` preserves source links, platform, duration and dimensions. Character names and series come from original captions/hashtags. Instagram and TikTok versions can overlap; 25 is the number of source posts, not 25 unique shoots.

Unresized images and downloaded source videos are preserved locally outside Git in `../Kayyalis source media/`. The website uses 640px thumbnails and up-to-1600px WebP photographs. Full videos retain downloaded resolution and use H.264/AAC for broad playback support; the highest source is 1916×1078. Platform compression varies and videos are not upscaled. Six-second previews are silent and smaller. No third-party iframe or tracking script is required to view the gallery.

## Interaction and accessibility

Native scrolling and horizontal scroll snap, no wheel hijacking. At most two visible silent previews play, with offscreen, hidden-tab and dialog suspension. Reduced motion and data saving use still previews. Explicit pause control is available. Native dialogs support keyboard focus, Escape, previous/next arrows and photo swipes. The photo gallery is visible without JavaScript; with JavaScript it has progressive loading, category/character filters, and a random-photo button.

## SEO and maintenance

24 cosplay pages have canonical and EN/TH alternate links, unique descriptions, structured data, and 1200×630 OG/Twitter thumbnails. TikTok videos with verified dates have VideoObject data. The sitemap contains both portfolios. Run `node scripts/generate-cosplay-social.mjs` after changing cover photographs, then `npm run build`.

Validated locally: 61 total HTML pages, 60 sitemap URLs, local asset references and structured JSON, all 25 complete H.264 videos and 25 silent previews, responsive widths 320–2560, gallery filtering/viewer navigation, menu, language/profile switches, reduced-motion behavior, playback and preview limit. Source links retain credits; additional permissions/ownership are not inferred from captions.
