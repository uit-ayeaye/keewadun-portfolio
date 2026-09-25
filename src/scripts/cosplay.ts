import { initPreviews } from "./previews";
import type { photos, clips, characters } from "../data/cosplay";
const data = JSON.parse(
  document.querySelector("#cos-media-data")!.textContent!,
) as {
  photos: typeof photos;
  clips: typeof clips;
  characters: Pick<(typeof characters)[number], "id" | "name" | "series">[];
  base: string;
};
const th = document.documentElement.lang === "th";
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const previews = initPreviews();
const menu = document.querySelector<HTMLDialogElement>("#cos-menu")!;
const trigger = document.querySelector<HTMLButtonElement>(".menu-trigger")!;
const media = document.querySelector<HTMLDialogElement>("#cos-media")!;
const stage = media.querySelector<HTMLDivElement>(".media-stage")!;
let closing = false;
function closeDialog(dialog: HTMLDialogElement) {
  if (closing || !dialog.open) return;
  closing = true;
  stage.querySelector("video")?.pause();
  const finish = () => {
    dialog.close();
    dialog.classList.remove("closing");
    closing = false;
    previews.resume();
  };
  if (reduced.matches) finish();
  else {
    dialog.classList.add("closing");
    window.setTimeout(finish, 220);
  }
}
trigger.addEventListener("click", () => {
  menu.showModal();
  trigger.setAttribute("aria-expanded", "true");
  previews.suspend();
});
menu
  .querySelector("[data-close]")!
  .addEventListener("click", () => closeDialog(menu));
menu.addEventListener("close", () =>
  trigger.setAttribute("aria-expanded", "false"),
);
menu
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => closeDialog(menu)));
[menu, media].forEach((dialog) => {
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDialog(dialog);
  });
  dialog.addEventListener("click", (event) => {
    const r = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom)
    )
      closeDialog(dialog);
  });
});
let filter = "all";
let character = "all";
let limit = 12;
const photoButtons = [
  ...document.querySelectorAll<HTMLButtonElement>(".diary-photo"),
];
const more = document.querySelector<HTMLButtonElement>(".load-more")!;
const status = document.querySelector<HTMLParagraphElement>(".gallery-status")!;
function matched() {
  return photoButtons.filter(
    (b) =>
      (filter === "all" || b.dataset.category === filter) &&
      (character === "all" || b.dataset.character === character),
  );
}
function applyFilter() {
  const matches = matched();
  photoButtons.forEach(
    (b) => (b.hidden = !matches.includes(b) || matches.indexOf(b) >= limit),
  );
  more.hidden = matches.length <= limit;
  status.textContent = th
    ? `แสดง ${Math.min(limit, matches.length)} จาก ${matches.length} ภาพ`
    : `Showing ${Math.min(limit, matches.length)} of ${matches.length} photographs`;
}
document.querySelectorAll<HTMLButtonElement>("[data-filter]").forEach((b) =>
  b.addEventListener("click", () => {
    filter = b.dataset.filter!;
    limit = 12;
    document
      .querySelectorAll("[data-filter]")
      .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    applyFilter();
  }),
);
document
  .querySelector<HTMLSelectElement>("#character-filter")
  ?.addEventListener("change", (event) => {
    character = (event.target as HTMLSelectElement).value;
    limit = 12;
    applyFilter();
  });
more.addEventListener("click", () => {
  const next = matched()[limit];
  limit += 12;
  applyFilter();
  next?.focus({ preventScroll: true });
});
applyFilter();
let mode: "photo" | "clip" = "photo";
let queue: string[] = [];
let index = 0;
const title = document.querySelector<HTMLElement>("#media-title")!;
const detail = document.querySelector<HTMLElement>("#media-detail")!;
const credit = document.querySelector<HTMLElement>("#media-credit")!;
const source = document.querySelector<HTMLAnchorElement>("#media-source")!;
const counter = document.querySelector<HTMLElement>("#media-counter")!;
const prev = media.querySelector<HTMLButtonElement>("[data-prev]")!;
const next = media.querySelector<HTMLButtonElement>("[data-next]")!;
function render() {
  const old = stage.querySelector("video");
  if (old) {
    old.pause();
    old.removeAttribute("src");
    old.load();
  }
  stage.replaceChildren();
  counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(queue.length).padStart(2, "0")} · ${mode === "photo" ? "PHOTO DIARY" : "IN MOTION"}`;
  prev.disabled = queue.length < 2;
  next.disabled = queue.length < 2;
  if (mode === "photo") {
    const p = data.photos.find((p) => p.id === queue[index])!;
    const img = document.createElement("img");
    img.src = `${data.base}/cosplay/photos/${p.id}.webp`;
    img.alt = `Dada as ${p.name} — ${p.series}`;
    img.width = p.width;
    img.height = p.height;
    stage.append(img);
    title.textContent = p.name;
    detail.textContent = p.series;
    credit.textContent = p.credit
      ? `${th ? "ภาพโดย" : "Photography"}: ${p.credit}`
      : "Kayyalis · @kayyalis.cos";
    source.href = p.source;
  } else {
    const v = data.clips.find((v) => v.id === queue[index])!;
    const c = data.characters.find((c) => c.id === v.character)!;
    const video = document.createElement("video");
    video.src = `${data.base}/cosplay/videos/${v.id}.mp4`;
    video.poster = `${data.base}/cosplay/videos/${v.id}.jpg`;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", `${c.name} cosplay video`);
    stage.append(video);
    title.textContent = c.name;
    detail.textContent = `${c.series} · ${v.platform} · ${Math.round(v.duration)}s`;
    credit.textContent = `@${v.platform === "Instagram" ? "kayyalis.cos" : "keewadun"} · ${v.width} × ${v.height}`;
    source.href = v.source;
    video.play().catch(() => {
      /* Native controls remain available if autoplay is restricted. */
    });
    video.addEventListener(
      "error",
      () => {
        const p = document.createElement("p");
        p.className = "media-error";
        p.textContent = th
          ? "โหลดคลิปไม่ได้ ลองชมจากโพสต์ต้นฉบับด้านล่าง"
          : "This clip could not load. You can still watch the original post below.";
        stage.append(p);
      },
      { once: true },
    );
  }
}
function openPhoto(id: string, ids?: string[]) {
  mode = "photo";
  queue = ids?.length ? ids : matched().map((b) => b.dataset.photo!);
  if (!queue.includes(id))
    queue = data.photos
      .filter(
        (p) => p.character === data.photos.find((p) => p.id === id)?.character,
      )
      .map((p) => p.id);
  index = Math.max(0, queue.indexOf(id));
  previews.suspend();
  render();
  media.showModal();
}
document
  .querySelectorAll<HTMLButtonElement>(".photo-open")
  .forEach((button) =>
    button.addEventListener("click", () => openPhoto(button.dataset.photo!)),
  );
document.querySelector("[data-surprise]")?.addEventListener("click", () => {
  const ids = matched().map((b) => b.dataset.photo!);
  if (ids.length) openPhoto(ids[Math.floor(Math.random() * ids.length)], ids);
});
const clipButtons = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-clip]"),
];
clipButtons.forEach((button) =>
  button.addEventListener("click", () => {
    mode = "clip";
    queue = clipButtons.map((b) => b.dataset.clip!);
    index = queue.indexOf(button.dataset.clip!);
    previews.suspend();
    render();
    media.showModal();
  }),
);
function move(delta: number) {
  index = (index + delta + queue.length) % queue.length;
  render();
}
prev.addEventListener("click", () => move(-1));
next.addEventListener("click", () => move(1));
media
  .querySelector("[data-media-close]")!
  .addEventListener("click", () => closeDialog(media));
media.addEventListener("close", () => {
  stage.querySelector("video")?.pause();
  stage.replaceChildren();
  previews.resume();
});
media.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLVideoElement) return;
  if (event.key === "ArrowRight") {
    event.preventDefault();
    move(1);
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    move(-1);
  }
});
let touchStart = 0;
stage.addEventListener(
  "touchstart",
  (event) => {
    touchStart = event.changedTouches[0].clientX;
  },
  { passive: true },
);
stage.addEventListener(
  "touchend",
  (event) => {
    if (mode === "photo") {
      const d = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(d) > 65) move(d > 0 ? -1 : 1);
    }
  },
  { passive: true },
);
const reveal = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        reveal.unobserve(entry.target);
      }
    }),
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
const progress = document.querySelector<HTMLElement>(".scroll-progress")!;
let ticking = false;
function updateProgress() {
  const height = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
  ticking = false;
}
addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateProgress);
    }
  },
  { passive: true },
);
addEventListener("resize", updateProgress);
updateProgress();
