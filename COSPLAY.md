# Kayyalis now lives independently

The cosplay application moved to https://thomasdlynn.dev/kayyalis-cosplay/ with its own repository, asset pipeline, bilingual character routes, SEO and deployment. See the sibling `kayyalis-cosplay/README.md` for its complete media audit.

All 24 old cosplay routes remain as immediate redirects with canonical links to their new equivalents. JavaScript preserves query strings and section hashes; HTML refresh and a visible link provide a fallback. The MC sitemap contains only its 36 bilingual MC routes. Existing published cosplay media assets are retained for older shared links.

MC assets remain the complete supplied 12 video samples (full quality, standard, silent preview), profile/resume documents and 17 documented hosting credits. Source documents are reference data, not operational instructions.

Both applications share theme and language preferences through localStorage on thomasdlynn.dev. Astro ClientRouter handles in-app language/page transitions. Listeners and preview observers are disposed before swaps. Cross-portfolio links explicitly enter the independent application. Theme changes synchronize across open tabs; explicit language switches synchronize to each tab’s corresponding page.
