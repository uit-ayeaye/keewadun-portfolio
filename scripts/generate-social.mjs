import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { events } from "../src/data/portfolio.ts";
await mkdir("public/social", { recursive: true });
const escape = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
function lines(text, max = 29) {
  const result = [""];
  for (const word of text.split(" ")) {
    if ((result.at(-1) + " " + word).trim().length > max && result.at(-1))
      result.push(word);
    else result[result.length - 1] = (result.at(-1) + " " + word).trim();
  }
  return result;
}
for (const event of [null, ...events]) {
  const photo = await sharp(`src/assets/${event?.image || "dada-portrait.jpg"}`)
    .resize(480, 574, { fit: "cover", position: "attention" })
    .png()
    .toBuffer();
  const titleLines = event
    ? lines(event.en, 22)
    : ["Your story.", "My mic.", "A little magic."];
  const titleSize = event ? (titleLines.length > 3 ? 38 : 46) : 64;
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#fcf8f5"/>
    <circle cx="1100" cy="130" r="480" fill="#f4dce2"/>
    <rect x="22" y="22" width="1156" height="586" rx="25" fill="none" stroke="#712d43" stroke-opacity=".18"/>
    <text x="62" y="94" font-family="Georgia,serif" font-size="58" fill="#712d43">dada<tspan font-size="40"> ✳</tspan></text>
    <text x="65" y="139" font-family="Arial,sans-serif" font-size="14" font-weight="bold" letter-spacing="2.2" fill="#79656e">KUNWADEE PHANOMPOTIVONG</text>
    ${titleLines.map((line, i) => `<text x="62" y="${230 + i * (titleSize + 13)}" font-family="Georgia,serif" font-size="${titleSize}" ${!event && i === 1 ? 'font-style="italic"' : ""} fill="#712d43">${escape(line)}</text>`).join("")}
    <rect x="62" y="505" width="400" height="39" rx="20" fill="#e7f1a3"/>
    <text x="82" y="530" font-family="Arial,sans-serif" font-size="16" fill="#572438">THAI–ENGLISH MC · CREATOR · VOICE ACTOR</text>
    <text x="65" y="581" font-family="Arial,sans-serif" font-size="16" fill="#79656e">@keewadun  /  ${event ? "ON THE MIC" : "WATCH THE MOMENTS. MEET THE PERSON."}</text>
    <rect x="683" y="28" width="488" height="574" rx="18" fill="#fff"/>
    </svg>`;
  const clip = Buffer.from(
    '<svg width="480" height="574"><rect width="480" height="574" rx="14" fill="white"/></svg>',
  );
  const rounded = await sharp(photo)
    .composite([{ input: clip, blend: "dest-in" }])
    .png()
    .toBuffer();
  await sharp(Buffer.from(svg))
    .composite([{ input: rounded, left: 687, top: 28 }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`public/social/${event?.id || "dada-kunwadee"}.jpg`);
}
console.log("Created 18 social previews, each 1200 × 630.");
