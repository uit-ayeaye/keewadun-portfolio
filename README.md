# DADA — Kunwadee Phanompotivong

A responsive Thai–English portfolio for Dada’s public MC, creator and voice work, with a cosmetic science biography, six photo stories and all 17 hosting credits from her published portfolio.

## Run locally

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. No install, build, backend, secret or tracking service is required.

## Editing

- `dist/index.html`: page structure and bilingual copy (`data-en`, `data-th`).
- `dist/app.js`: event credits, categories, descriptions, language and interaction behavior.
- `dist/styles.css`: responsive typography, layout and motion preferences.
- `dist/assets`: photographs extracted from the subject’s public portfolio; favicon.

Language preference is stored locally when browser storage is available. English is the default. The site links directly to the original documents and public work-contact channels. Contact links do not send messages automatically.

## Publishing

GitHub Actions deploys `dist` to GitHub Pages on pushes to `main`. In repository settings, Pages must use GitHub Actions. All asset paths are relative so project-path hosting works.

## Sources and editorial boundaries

Reviewed September 25, 2026:

- https://www.instagram.com/keewadun/ — public profile, MC identity, highlights and visible reel listing.
- https://linktr.ee/keewadun — public professional description, document and work-contact links.
- https://drive.google.com/file/d/1jvUtFgMHGjMw3YsM0ot72_wx1Mcp1B2C/view — 16-page portfolio; primary event and photograph source.
- https://drive.google.com/file/d/1Ul89mVOEIkb7XQD8qq0aTuRZPu94k14Z/view — résumé; professional and education cross-check.

The portfolio lists the School of Cosmetic Science at Mae Fah Luang University, senior year. It does not say School of Science. The portfolio has 17 hosting credit entries, some spanning multiple years. Unknown dates stay undated. The résumé lists Khan Toke 2024/2025; the portfolio additionally names and illustrates the 2026 ceremony, so the archive uses 2024–2026. Thai event titles have editorial English translations; those translations are not claimed as official names. Individual Instagram post/reel details were login-limited, so no unseen captions, videos or additional events are claimed. The site does not claim to include every event of her career.

The design is an editorial interpretation of her burgundy portrait and rose-toned portfolio. No personal photo is AI generated. Photograph rights remain with their respective owners; this repository grants no reuse license for those photographs. Sensitive or irrelevant personal résumé fields are not transcribed onto the site. No affiliation, award, client testimonial, endorsement, current availability or scientific qualification beyond the source material is invented. This site was commissioned by the repository owner, and is not represented as an account verified by the subject.
