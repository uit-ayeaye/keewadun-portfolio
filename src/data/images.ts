import type { ImageMetadata } from "astro";
const files = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/*.{jpg,png}",
  { eager: true },
);
export const photo = (name: string): ImageMetadata =>
  files[`../assets/${name}`].default;
