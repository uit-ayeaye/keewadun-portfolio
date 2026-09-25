import { defineConfig } from "astro/config";
export default defineConfig({
  site: "https://thomasdlynn.dev",
  base: "/keewadun-portfolio",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  compressHTML: true,
  devToolbar: { enabled: false },
});
