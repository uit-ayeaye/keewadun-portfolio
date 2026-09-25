import { animate, inView, stagger } from "motion";
const lang = document.documentElement.lang;
const t = (en: string, th: string) => (lang === "th" ? th : en);
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const menu = document.querySelector<HTMLDialogElement>("#menu-dialog");
const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
function closeMenu() {
  if (menu?.open) menu.close();
}
menuButton?.addEventListener("click", () => {
  if (menu?.open) return closeMenu();
  openDialog(menu);
  menuButton.setAttribute("aria-expanded", "true");
});
menu?.addEventListener("close", () =>
  menuButton?.setAttribute("aria-expanded", "false"),
);
menu
  ?.querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
window.matchMedia("(min-width: 1101px)").addEventListener("change", (e) => {
  if (e.matches) closeMenu();
});
const themeButton = document.querySelector<HTMLButtonElement>(".theme-toggle");
function syncTheme() {
  themeButton?.setAttribute(
    "aria-pressed",
    String(document.documentElement.dataset.theme === "dark"),
  );
}
syncTheme();
themeButton?.addEventListener("click", () => {
  const next =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("dada-theme", next);
  } catch {}
  syncTheme();
  if (!reduced.matches)
    animate(
      themeButton,
      { scale: [1, 0.92, 1] },
      { type: "spring", bounce: 0.4, duration: 0.5 },
    );
});
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    let saved = null;
    try {
      saved = localStorage.getItem("dada-theme");
    } catch {}
    if (!saved) {
      document.documentElement.dataset.theme = e.matches ? "dark" : "light";
      syncTheme();
    }
  });
function syncLanguageLinks() {
  document
    .querySelectorAll<HTMLAnchorElement>(".language-switch a")
    .forEach((a) => {
      const url = new URL(a.href);
      url.hash = location.hash;
      url.search = location.search;
      a.href = url.href;
    });
}
syncLanguageLinks();
window.addEventListener("hashchange", syncLanguageLinks);
function openDialog(dialog: HTMLDialogElement | null) {
  if (!dialog) return;
  closeMenu();
  dialog.showModal();
  document.body.classList.add("modal-open");
  if (!reduced.matches)
    animate(
      dialog,
      { opacity: [0, 1], scale: [0.94, 1] },
      { type: "spring", bounce: 0.22, duration: 0.42 },
    );
}
document.querySelectorAll<HTMLDialogElement>("dialog").forEach((dialog) => {
  dialog
    .querySelector("[data-close]")
    ?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    if (!document.querySelector("dialog[open]"))
      document.body.classList.remove("modal-open");
  });
  dialog.addEventListener("click", (e) => {
    if (e.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (
      e.clientX < box.left ||
      e.clientX > box.right ||
      e.clientY < box.top ||
      e.clientY > box.bottom
    )
      dialog.close();
  });
});
document.querySelectorAll<HTMLAnchorElement>("[data-contact]").forEach((link) =>
  link.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    openDialog(document.querySelector("#contact-dialog"));
  }),
);
document.querySelectorAll<HTMLAnchorElement>("[data-preview]").forEach((link) =>
  link.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const template = document.getElementById(
      `preview-${link.dataset.preview}`,
    ) as HTMLTemplateElement | null;
    const content = document.querySelector(".event-dialog-content");
    if (!template || !content) return;
    e.preventDefault();
    content.replaceChildren(template.content.cloneNode(true));
    openDialog(document.querySelector("#event-dialog"));
  }),
);
document
  .querySelector("[data-lightbox]")
  ?.addEventListener("click", () =>
    openDialog(document.querySelector("#photo-dialog")),
  );
document.querySelector(".copy-email")?.addEventListener("click", async () => {
  const status = document.querySelector(".copy-status");
  try {
    await navigator.clipboard.writeText("wwkunwadee05@gmail.com");
    if (status)
      status.textContent = t(
        "Copied — ready when you are.",
        "คัดลอกแล้ว พร้อมติดต่อได้เลย",
      );
  } catch {
    if (status)
      status.textContent = t(
        "Please select and copy: wwkunwadee05@gmail.com",
        "เลือกและคัดลอกอีเมล: wwkunwadee05@gmail.com",
      );
  }
});
const rows = Array.from(
  document.querySelectorAll<HTMLAnchorElement>(".event-row"),
);
const filters = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-filter]"),
);
const search = document.querySelector<HTMLInputElement>('input[name="events"]');
let activeFilter = "all";
function filterEvents() {
  const query = (search?.value || "")
    .trim()
    .toLocaleLowerCase()
    .normalize("NFC");
  let count = 0;
  rows.forEach((row) => {
    const visible =
      (activeFilter === "all" || row.dataset.category === activeFilter) &&
      (row.dataset.search || "")
        .toLocaleLowerCase()
        .normalize("NFC")
        .includes(query);
    row.hidden = !visible;
    if (visible) count++;
  });
  const status = document.querySelector(".archive-status");
  if (status)
    status.textContent = t(
      `${count} ${count === 1 ? "moment" : "moments"} to explore`,
      `${count} ผลงานให้คุณได้รู้จัก`,
    );
  const empty = document.querySelector<HTMLElement>(".empty-state");
  if (empty) empty.hidden = count > 0;
}
filters.forEach((button) =>
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filters.forEach((b) =>
      b.setAttribute("aria-pressed", String(b === button)),
    );
    filterEvents();
  }),
);
search?.addEventListener("input", filterEvents);
document.querySelector("[data-reset]")?.addEventListener("click", () => {
  activeFilter = "all";
  if (search) search.value = "";
  filters.forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.filter === "all")),
  );
  filterEvents();
  search?.focus();
});
if (!reduced.matches) {
  animate(
    ".hero-enter",
    { opacity: [0, 1], y: [22, 0] },
    { type: "spring", bounce: 0.2, duration: 0.7, delay: stagger(0.065) },
  );
  if (document.querySelector(".hero-art"))
    animate(
      ".hero-art",
      { opacity: [0, 1], y: [32, 0], rotate: [-3, 0] },
      { type: "spring", bounce: 0.28, duration: 1.1, delay: 0.15 },
    );
  inView(
    "[data-reveal]",
    (element) => {
      if (!reduced.matches)
        animate(
          element,
          { opacity: [0, 1], y: [24, 0] },
          { type: "spring", bounce: 0.15, duration: 0.65 },
        );
    },
    { margin: "0px 0px -35px 0px" },
  );
}
const progress = document.querySelector<HTMLElement>(".reading-progress");
let framePending = false;
function updateProgress() {
  framePending = false;
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
}
window.addEventListener(
  "scroll",
  () => {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(updateProgress);
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateProgress);
updateProgress();

// Video sources live in inert templates: no movie bytes until a visitor chooses one.
const videoDialog = document.querySelector<HTMLDialogElement>("#video-dialog");
document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const trigger = event.target.closest<HTMLAnchorElement>("[data-video]");
  if (
    !trigger ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  const template = document.getElementById(
    `video-${trigger.dataset.video}`,
  ) as HTMLTemplateElement | null;
  const content = videoDialog?.querySelector(".video-dialog-content");
  if (!template || !content || !videoDialog) return;
  event.preventDefault();
  content.replaceChildren(template.content.cloneNode(true));
  openDialog(videoDialog);
  const player = content.querySelector("video");
  const shell = content.querySelector(".video-player-shell");
  const status = content.querySelector(".video-status");
  if (!player) return;
  const ready = () => shell?.classList.remove("is-buffering");
  player.addEventListener("waiting", () =>
    shell?.classList.add("is-buffering"),
  );
  player.addEventListener("playing", ready);
  player.addEventListener("loadeddata", ready);
  player.addEventListener("pause", ready);
  player.querySelector("source")?.addEventListener("error", () => {
    ready();
    if (status)
      status.textContent = t(
        "This film couldn’t load. Try the separate player below.",
        "โหลดวิดีโอไม่ได้ ลองเปิดเครื่องเล่นแยกด้านล่าง",
      );
  });
  player.play().catch(() => {
    ready();
    if (status && videoDialog.open)
      status.textContent = t(
        "Press play to watch with the original audio.",
        "กดเล่นเพื่อชมพร้อมเสียงจริงจากงาน",
      );
  });
});
videoDialog?.addEventListener("close", () => {
  const player = videoDialog.querySelector("video");
  if (player) {
    player.pause();
    player.removeAttribute("src");
    player.querySelector("source")?.removeAttribute("src");
    player.load();
  }
  videoDialog.querySelector(".video-dialog-content")?.replaceChildren();
});
document
  .querySelectorAll<HTMLAnchorElement>("[data-close-on-navigate]")
  .forEach((link) => {
    link.addEventListener("click", () => link.closest("dialog")?.close());
  });
const videoFilters = document.querySelectorAll<HTMLButtonElement>(
  "[data-video-filter]",
);
videoFilters.forEach((button) =>
  button.addEventListener("click", () => {
    const category = button.dataset.videoFilter;
    videoFilters.forEach((b) =>
      b.setAttribute("aria-pressed", String(b === button)),
    );
    let count = 0;
    document
      .querySelectorAll<HTMLElement>(".video-section [data-video-category]")
      .forEach((card) => {
        card.hidden =
          category !== "all" && card.dataset.videoCategory !== category;
        if (!card.hidden) count++;
      });
    const status = document.querySelector(".video-count");
    if (status)
      status.textContent = t(
        `${count} films to explore · original event audio`,
        `${count} วิดีโอให้ชม · เสียงจริงจากงาน`,
      );
  }),
);
// A finite welcome flourish, never a blocking loading screen.
const charm = document.querySelector<HTMLElement>(".arrival-charm");
if (charm) {
  let shown = false;
  try {
    shown = sessionStorage.getItem("dada-arrived") === "yes";
    sessionStorage.setItem("dada-arrived", "yes");
  } catch {}
  if (!shown && !reduced.matches) {
    charm.classList.add("is-arriving");
    window.setTimeout(() => charm.remove(), 1800);
  } else charm.remove();
}
