# DADA — Kunwadee Phanompotivong

A bilingual Astro 7 + TypeScript portfolio, with Motion animations, 17 source-backed hosting stories in English and Thai, event preview dialogs, full photograph lightboxes, and a contact dialog.

**Live:** https://thomasdlynn.dev/keewadun-portfolio/

## Development

Requires Node 22.12+ and npm. Install the locked dependencies, then start Astro:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321/keewadun-portfolio/.

```sh
npm run build   # Type-check, generate optimized pages/images, verify output
npm run preview # Serve the production build on port 4321
npm test        # Recheck the generated routes, metadata and internal links
```

## Architecture

- `src/data/portfolio.ts`: typed, bilingual source data for every event.
- `src/components/Home.astro`: responsive homepage, gallery, searchable archive.
- `src/components/EventPage.astro`: individual event pages with source links and related navigation.
- `src/layouts/Layout.astro`: shared navigation, SEO metadata, JSON-LD, and contact dialog.
- `src/scripts/interactions.ts`: progressive enhancement with Motion; event filters, search, dialogs, clipboard, progress indicator and mobile menu.
- `src/styles/global.css`: design system, responsive layout, keyboard focus, print styles and reduced-motion support.
- `src/assets`: original portfolio photographs; Astro builds responsive WebP variants.
- `scripts/verify-build.mjs`: checks all generated HTML pages, sitemap count, JSON-LD and local href/src targets.

The main content and event links work without JavaScript. Real `/th/` URLs preserve the same event when changing language. No API keys, tracking, remote fonts, runtime framework hydration or backend are needed. The JavaScript bundle is approximately 21 KB gzipped. Images below the fold load lazily; the main portrait loads eagerly with explicit dimensions and responsive candidates. Motion uses transform/opacity and respects reduced motion. Copying email is user initiated; contact links never send a message automatically.

## SEO and deployment

GitHub Actions builds and deploys on pushes to `main`. The site generates 36 indexable URLs (2 homepages and 34 event pages) plus a noindex 404 page. Every page includes a title, description, canonical URL, EN/TH/x-default alternates, Open Graph and Twitter metadata, and JSON-LD. The XML sitemap lists all 36 language URLs. No unsupported Event dates, reviews or ratings are emitted. The site's `robots.txt` is emitted under its GitHub Pages project path; the domain owner controls the authoritative root `/robots.txt`.

If hosting changes, update `astro.config.mjs` and `base`/`origin` in `src/data/portfolio.ts` together. Source files are tracked; `dist/` is generated and ignored. HTTPS and the existing inherited GitHub Pages domain are preserved.

## Sources and editorial boundaries

Reviewed September 25, 2026:

- https://www.instagram.com/keewadun/ — public profile, MC identity, highlights and visible reel listing.
- https://linktr.ee/keewadun — public professional description, document and work-contact links.
- https://drive.google.com/file/d/1jvUtFgMHGjMw3YsM0ot72_wx1Mcp1B2C/view — 16-page portfolio; primary event and photograph source.
- https://drive.google.com/file/d/1Ul89mVOEIkb7XQD8qq0aTuRZPu94k14Z/view — résumé; professional and education cross-check.

The portfolio lists the School of Cosmetic Science at Mae Fah Luang University, senior year. It does not say School of Science. The portfolio has 17 hosting credit entries, some spanning multiple years. Unknown dates stay undated. The résumé lists Khan Toke 2024/2025; the portfolio additionally names and illustrates the 2026 ceremony, so the archive uses 2024–2026. Thai event titles have editorial English translations; those translations are not claimed as official names. Individual Instagram post/reel details were login-limited, so no unseen captions, videos or additional events are claimed. The site does not claim to include every event of her career.

The design is an editorial interpretation of her burgundy portrait and rose-toned portfolio. No personal photo is AI generated. Photograph rights remain with their respective owners; this repository grants no reuse license for those photographs. Sensitive or irrelevant personal résumé fields are not transcribed onto the site. No affiliation, award, client testimonial, endorsement, current availability or scientific qualification beyond the source material is invented. This site was commissioned by the repository owner, and is not represented as an account verified by the subject.
