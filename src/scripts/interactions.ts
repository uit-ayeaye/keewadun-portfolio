import { initPreviews } from "./previews";
import { animate, inView, stagger } from "motion";
let teardown: (() => void) | undefined;
function initializePage() {
  teardown?.();
  if (!document.querySelector("#menu-dialog")) return;
  const controller = new AbortController();
  const { signal } = controller;
  const lang = document.documentElement.lang;
  const t = (en: string, th: string) => (lang === "th" ? th : en);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const previews = initPreviews(signal);
  const menu = document.querySelector<HTMLDialogElement>("#menu-dialog");
  const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
  function closeMenu() {
    if (menu?.open) closeDialog(menu);
  }
  menuButton?.addEventListener(
    "click",
    () => {
      if (menu?.open) return closeMenu();
      openDialog(menu);
      menuButton.setAttribute("aria-expanded", "true");
    },
    { signal },
  );
  menu?.addEventListener(
    "close",
    () => menuButton?.setAttribute("aria-expanded", "false"),
    { signal },
  );
  menu
    ?.querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu, { signal }));
  window.matchMedia("(min-width: 1101px)").addEventListener(
    "change",
    (e) => {
      if (e.matches) closeMenu();
    },
    { signal },
  );
  const closing = new WeakSet<HTMLDialogElement>();
  function closeDialog(dialog: HTMLDialogElement) {
    if (!dialog.open || closing.has(dialog)) return;
    if (reduced.matches) {
      dialog.close();
      return;
    }
    closing.add(dialog);
    dialog.classList.add("is-closing");
    dialog.querySelectorAll("video").forEach((v) => v.pause());
    dialog.getAnimations().forEach((a) => a.cancel());
    const exit = dialog.animate(
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(14px) scale(.97)" },
      ],
      { duration: 180, easing: "ease-in", fill: "forwards" },
    );
    exit.finished
      .catch(() => {})
      .then(() => {
        dialog.close();
        exit.cancel();
        closing.delete(dialog);
        dialog.classList.remove("is-closing");
      });
  }
  function openDialog(dialog: HTMLDialogElement | null) {
    if (!dialog || dialog.open) return;
    if (menu?.open && menu !== dialog) menu.close();
    previews.suspend();
    dialog.showModal();
    document.body.classList.add("modal-open");
    if (!reduced.matches) {
      dialog.animate(
        [
          {
            opacity: 0,
            transform: "translateY(32px) scale(.94) rotate(-.7deg)",
          },
          { opacity: 1, transform: "translateY(0) scale(1) rotate(0deg)" },
        ],
        { duration: 480, easing: "cubic-bezier(.16,.85,.25,1.18)" },
      );
      const items = dialog.querySelectorAll(
        ".drawer-nav a, .menu-ticket, .menu-portrait, .contact-option, .service-picker",
      );
      items.forEach((item, index) =>
        item.animate(
          [
            { opacity: 0, transform: "translateY(14px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 420,
            delay: Math.min(index, 5) * 45 + 75,
            easing: "cubic-bezier(.2,.8,.2,1.25)",
            fill: "backwards",
          },
        ),
      );
    }
  }
  document.querySelectorAll<HTMLDialogElement>("dialog").forEach((dialog) => {
    dialog
      .querySelector("[data-close]")
      ?.addEventListener("click", () => closeDialog(dialog), { signal });
    dialog.addEventListener(
      "cancel",
      (event) => {
        event.preventDefault();
        closeDialog(dialog);
      },
      { signal },
    );
    dialog.addEventListener(
      "close",
      () => {
        if (!document.querySelector("dialog[open]")) {
          document.body.classList.remove("modal-open");
          previews.resume();
        }
      },
      { signal },
    );
    dialog.addEventListener(
      "click",
      (e) => {
        if (e.target !== dialog) return;
        const box = dialog.getBoundingClientRect();
        if (
          e.clientX < box.left ||
          e.clientX > box.right ||
          e.clientY < box.top ||
          e.clientY > box.bottom
        )
          closeDialog(dialog);
      },
      { signal },
    );
  });
  document
    .querySelectorAll<HTMLAnchorElement>("[data-contact]")
    .forEach((link) =>
      link.addEventListener(
        "click",
        (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          openDialog(document.querySelector("#contact-dialog"));
        },
        { signal },
      ),
    );
  document
    .querySelectorAll<HTMLAnchorElement>("[data-preview]")
    .forEach((link) =>
      link.addEventListener(
        "click",
        (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          const template = document.getElementById(
            `preview-${link.dataset.preview}`,
          ) as HTMLTemplateElement | null;
          const content = document.querySelector(".event-dialog-content");
          if (!template || !content) return;
          e.preventDefault();
          content.replaceChildren(template.content.cloneNode(true));
          openDialog(document.querySelector("#event-dialog"));
        },
        { signal },
      ),
    );
  document
    .querySelector("[data-lightbox]")
    ?.addEventListener(
      "click",
      () => openDialog(document.querySelector("#photo-dialog")),
      { signal },
    );
  document.querySelector(".copy-email")?.addEventListener(
    "click",
    async () => {
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
    },
    { signal },
  );
  const rows = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".event-row"),
  );
  const filters = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-filter]"),
  );
  const search = document.querySelector<HTMLInputElement>(
    'input[name="events"]',
  );
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
    button.addEventListener(
      "click",
      () => {
        activeFilter = button.dataset.filter || "all";
        filters.forEach((b) =>
          b.setAttribute("aria-pressed", String(b === button)),
        );
        filterEvents();
      },
      { signal },
    ),
  );
  search?.addEventListener("input", filterEvents, { signal });
  document.querySelector("[data-reset]")?.addEventListener(
    "click",
    () => {
      activeFilter = "all";
      if (search) search.value = "";
      filters.forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.filter === "all")),
      );
      filterEvents();
      search?.focus();
    },
    { signal },
  );
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
    const stopReveals = inView(
      "[data-reveal]",
      (element) => {
        if (!reduced.matches)
          animate(
            element,
            { opacity: [0, 1], y: [32, 0], scale: [0.97, 1] },
            {
              type: "spring",
              bounce: 0.28,
              duration: 0.75,
              delay:
                (Array.from(element.parentElement?.children || []).indexOf(
                  element,
                ) %
                  4) *
                0.045,
            },
          );
      },
      { margin: "0px 0px -35px 0px" },
    );
    signal.addEventListener("abort", stopReveals, { once: true });
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
    { signal, passive: true },
  );
  window.addEventListener("resize", updateProgress, { signal });
  updateProgress();

  // Full-length films only load on demand; separate tiny previews are managed above.
  const videoDialog =
    document.querySelector<HTMLDialogElement>("#video-dialog");
  document.addEventListener(
    "click",
    (event) => {
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
      const connection = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      if (connection?.saveData) {
        const standard = content.querySelector<HTMLButtonElement>(
          '[data-quality="standard"]',
        );
        if (standard) {
          player.querySelector("source")!.src = standard.dataset.qualitySrc!;
          content
            .querySelectorAll<HTMLButtonElement>("[data-quality]")
            .forEach((b) =>
              b.setAttribute("aria-pressed", String(b === standard)),
            );
        }
      }
      content
        .querySelectorAll<HTMLButtonElement>("[data-quality-src]")
        .forEach((button) =>
          button.addEventListener(
            "click",
            () => {
              if (button.getAttribute("aria-pressed") === "true") return;
              const time = player.currentTime;
              const wasPaused = player.paused;
              const volume = player.volume;
              const muted = player.muted;
              content
                .querySelectorAll<HTMLButtonElement>("[data-quality]")
                .forEach((b) =>
                  b.setAttribute("aria-pressed", String(b === button)),
                );
              player.pause();
              player.src = button.dataset.qualitySrc!;
              player.addEventListener(
                "loadedmetadata",
                () => {
                  player.currentTime = Math.min(time, player.duration);
                  player.volume = volume;
                  player.muted = muted;
                  if (!wasPaused) player.play().catch(() => {});
                },
                { signal, once: true },
              );
              player.load();
            },
            { signal },
          ),
        );
      player.addEventListener(
        "error",
        () => {
          shell?.classList.remove("is-buffering");
          if (status)
            status.textContent = t(
              "Try Less data or open the separate player below.",
              "ลองโหมดประหยัดเน็ต หรือเปิดเครื่องเล่นแยกด้านล่าง",
            );
        },
        { signal },
      );
      const ready = () => shell?.classList.remove("is-buffering");
      player.addEventListener(
        "waiting",
        () => shell?.classList.add("is-buffering"),
        { signal },
      );
      player.addEventListener("playing", ready, { signal });
      player.addEventListener("loadeddata", ready, { signal });
      player.addEventListener("pause", ready, { signal });
      player.querySelector("source")?.addEventListener(
        "error",
        () => {
          ready();
          if (status)
            status.textContent = t(
              "This film couldn’t load. Try the separate player below.",
              "โหลดวิดีโอไม่ได้ ลองเปิดเครื่องเล่นแยกด้านล่าง",
            );
        },
        { signal },
      );
      player.play().catch(() => {
        ready();
        if (status && videoDialog.open)
          status.textContent = t(
            "Press play to watch with the original audio.",
            "กดเล่นเพื่อชมพร้อมเสียงจริงจากงาน",
          );
      });
    },
    { signal },
  );
  videoDialog?.addEventListener(
    "close",
    () => {
      const player = videoDialog.querySelector("video");
      if (player) {
        player.pause();
        player.removeAttribute("src");
        player.querySelector("source")?.removeAttribute("src");
        player.load();
      }
      videoDialog.querySelector(".video-dialog-content")?.replaceChildren();
    },
    { signal },
  );
  document
    .querySelectorAll<HTMLAnchorElement>("[data-close-on-navigate]")
    .forEach((link) => {
      link.addEventListener("click", () => link.closest("dialog")?.close(), {
        signal,
      });
    });
  const videoFilters = document.querySelectorAll<HTMLButtonElement>(
    "[data-video-filter]",
  );
  videoFilters.forEach((button) =>
    button.addEventListener(
      "click",
      () => {
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
        previews.refresh();
      },
      { signal },
    ),
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

  // Helpful little moments: a random film, booking prompts and tactile feedback.
  document
    .querySelector<HTMLButtonElement>("[data-surprise]")
    ?.addEventListener(
      "click",
      () => {
        const choices = [
          ...document.querySelectorAll<HTMLAnchorElement>(
            ".video-card:not([hidden]) .video-poster",
          ),
        ];
        const choice = choices[Math.floor(Math.random() * choices.length)];
        choice?.focus({ preventScroll: true });
        choice?.click();
      },
      { signal },
    );
  document
    .querySelectorAll<HTMLButtonElement>("[data-service]")
    .forEach((button) =>
      button.addEventListener(
        "click",
        () => {
          document
            .querySelectorAll<HTMLButtonElement>("[data-service]")
            .forEach((b) =>
              b.setAttribute("aria-pressed", String(b === button)),
            );
          const email = document.querySelector<HTMLAnchorElement>(
            "[data-booking-email]",
          );
          const subject = `${button.dataset.service} enquiry for Dada`;
          const body = t(
            "Hello Dada,\n\nI’d love to discuss a project.\nEvent / project:\nDate:\nLocation:\nLanguage(s):\n\nThank you!",
            "สวัสดี Dada\n\nสนใจสอบถามการร่วมงาน\nงาน / โปรเจกต์:\nวันที่:\nสถานที่:\nภาษาที่ต้องการ:\n\nขอบคุณค่ะ/ครับ",
          );
          if (email)
            email.href = `mailto:wwkunwadee05@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        },
        { signal },
      ),
    );
  document.addEventListener(
    "click",
    (event) => {
      if (reduced.matches || !(event.target instanceof Element)) return;
      const control = event.target.closest<HTMLElement>(
        "button, .button, .social-links a, .back-top, .event-row, .video-poster, .work-image-link, .drawer-nav a",
      );
      if (
        !control ||
        control.classList.contains("dialog-close") ||
        control.classList.contains("theme-toggle")
      )
        return;
      control.animate(
        [{ scale: "1" }, { scale: ".94" }, { scale: "1.035" }, { scale: "1" }],
        { duration: 360, easing: "ease-out" },
      );
    },
    { signal },
  );
  const chapters = document.querySelectorAll<HTMLElement>(
    "main > section[id], main > .hero, .offstage",
  );
  const chapterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-in-view", entry.isIntersecting);
        if (entry.isIntersecting) {
          document
            .querySelectorAll<HTMLAnchorElement>(".main-nav a, .drawer-nav a")
            .forEach((a) => {
              if (a.hash === `#${entry.target.id}`)
                a.setAttribute("aria-current", "location");
              else a.removeAttribute("aria-current");
            });
        }
      });
    },
    { rootMargin: "-15% 0px -45% 0px", threshold: 0 },
  );
  chapters.forEach((chapter) => chapterObserver.observe(chapter));

  teardown = () => {
    controller.abort();
    chapterObserver.disconnect();
    document.querySelectorAll("video").forEach((v) => v.pause());
  };
}
document.addEventListener("astro:page-load", initializePage);
document.addEventListener("astro:before-swap", () => teardown?.());
