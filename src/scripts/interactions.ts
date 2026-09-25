import { animate, inView, stagger } from "motion";
const lang = document.documentElement.lang;
const t = (en: string, th: string) => (lang === "th" ? th : en);
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const menu = document.querySelector<HTMLElement>(".main-nav");
const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
function closeMenu() {
  menu?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", t("Open menu", "เปิดเมนู"));
}
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menu?.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? t("Close menu", "ปิดเมนู") : t("Open menu", "เปิดเมนู"),
  );
});
menu
  ?.querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
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
