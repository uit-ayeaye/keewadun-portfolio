"use strict";
const portfolioURL =
  "https://drive.google.com/file/d/1jvUtFgMHGjMw3YsM0ot72_wx1Mcp1B2C/view";
const categories = {
  festival: { en: "Festivals & culture", th: "เทศกาลและวัฒนธรรม" },
  campus: { en: "University & community", th: "มหาวิทยาลัยและชุมชน" },
  business: { en: "Business & sport", th: "ธุรกิจและกีฬา" },
};
// All credits are transcribed from the public portfolio linked by @keewadun.
// English renderings of Thai event names are editorial translations, not official titles.
const events = [
  {
    id: "four-lands",
    en: "Four Lands Food Festival",
    th: "มหกรรมอาหารสี่แผ่นดิน เหนือสุดถิ่นสยาม",
    year: "—",
    category: "festival",
    image: "food-festival.jpg",
    page: 4,
    description: {
      en: "Hosting at มหกรรมอาหารสี่แผ่นดิน เหนือสุดถิ่นสยาม, a food festival in Chiang Rai.",
      th: "ทำหน้าที่พิธีกรในงานมหกรรมอาหารสี่แผ่นดิน เหนือสุดถิ่นสยาม จังหวัดเชียงราย",
    },
  },
  {
    id: "safe-food",
    en: "Chiang Rai Safe Food Festival · 5th edition",
    th: "ข่วงอาหารปลอดภัยเมืองเชียงราย ครั้งที่ 5",
    year: "—",
    category: "festival",
    image: "safe-food.jpg",
    page: 5,
    description: {
      en: "On-stage hosting for the fifth edition of Chiang Rai’s safe food event.",
      th: "ทำหน้าที่พิธีกรบนเวทีข่วงอาหารปลอดภัยเมืองเชียงราย ครั้งที่ 5",
    },
  },
  {
    id: "balloon",
    en: "International Balloon Fiesta",
    th: "International Balloon Fiesta",
    year: "2025, 2026",
    category: "festival",
    page: 3,
  },
  {
    id: "thaifex",
    en: "THAIFEX–Anuga Asia",
    th: "THAIFEX–Anuga Asia",
    year: "2026",
    category: "business",
    page: 3,
  },
  {
    id: "grand-prix",
    en: "Grand Prix of Chiang Mai Compak Sporting",
    th: "Grand Prix of Chiang Mai Compak Sporting",
    year: "—",
    category: "business",
    page: 3,
  },
  {
    id: "tham-luang",
    en: "Tham Luang Rescue · 8th anniversary",
    th: "รำลึก 8 ปี กู้ภัยถ้ำหลวง รวมใจเป็นหนึ่งเดียว",
    year: "—",
    category: "campus",
    image: "tham-luang.jpg",
    page: 6,
    description: {
      en: "Hosting at the eighth-anniversary commemoration of the Tham Luang cave rescue.",
      th: "ร่วมดำเนินรายการในงานรำลึก 8 ปี กู้ภัยถ้ำหลวง รวมใจเป็นหนึ่งเดียว",
    },
  },
  {
    id: "gymkhana",
    en: "Gymkhana: Motor Sport Racing",
    th: "Gymkhana: Motor Sport Racing",
    year: "2025",
    category: "business",
    page: 3,
  },
  {
    id: "thai-china",
    en: "50 Years of Thailand–China Performing Arts & Music Festival",
    th: "เทศกาลศิลปะการแสดงและดนตรี 50 ปี ไทย–จีน",
    year: "—",
    category: "festival",
    image: "thailand-china.png",
    page: 13,
    description: {
      en: "A stage celebrating 50 years of Thailand–China relations through performing arts and music.",
      th: "เวทีเฉลิมฉลองความสัมพันธ์ไทย–จีน 50 ปี ผ่านศิลปะการแสดงและดนตรี",
    },
  },
  {
    id: "life-teen",
    en: "Life As A Teen",
    th: "Life As A Teen",
    year: "—",
    category: "campus",
    image: "life-as-a-teen.jpg",
    page: 7,
    description: {
      en: "A conversation on stage with special guest Ticha, featured in Dada’s hosting portfolio.",
      th: "ช่วงเวลาบนเวทีกับแขกรับเชิญพิเศษ ติช่า หนึ่งในผลงานพิธีกรของ Dada",
    },
  },
  {
    id: "innovation",
    en: "MFU Innovation Day",
    th: "MFU Innovation Day",
    year: "2026",
    category: "campus",
    page: 3,
  },
  {
    id: "job-fair",
    en: "MFU Internship and Job Fair",
    th: "MFU Internship and Job Fair",
    year: "2025",
    category: "campus",
    page: 3,
  },
  {
    id: "pride",
    en: "MFU Pride",
    th: "MFU Pride",
    year: "2025, 2026",
    category: "campus",
    image: "pride-2026.jpg",
    page: 8,
    description: {
      en: "Hosting at MFU Pride in 2025 and 2026. This photograph is from the 2026 stage.",
      th: "ทำหน้าที่พิธีกรในงาน MFU Pride ปี 2025 และ 2026 ภาพนี้เป็นบรรยากาศจากเวทีปี 2026",
    },
  },
  {
    id: "hllc",
    en: "HLLC Opening Ceremony",
    th: "พิธีเปิด HLLC",
    year: "2024, 2025",
    category: "campus",
    image: "hllc.png",
    page: 12,
    description: {
      en: "Opening-ceremony hosting, with 2024 and 2025 credits listed in her portfolio.",
      th: "ผลงานพิธีกรในพิธีเปิด HLLC โดยพอร์ตโฟลิโอระบุผลงานปี 2024 และ 2025",
    },
  },
  {
    id: "khan-toke",
    en: "Khan Toke Ceremony",
    th: "งานขันโตก",
    year: "2024–2026",
    category: "festival",
    image: "khan-toke.jpg",
    page: 11,
    description: {
      en: "A cultural celebration with hosting credits in 2024, 2025 and 2026. Photograph from the 2026 ceremony.",
      th: "งานวัฒนธรรมที่มีผลงานพิธีกรในปี 2024, 2025 และ 2026 ภาพจากงานขันโตกปี 2026",
    },
  },
  {
    id: "homage",
    en: "Graduation Homage Ceremony to HRH Princess Srinagarindra",
    th: "พิธีถวายสักการะสมเด็จพระศรีนครินทราบรมราชชนนี เนื่องในโอกาสสำเร็จการศึกษา",
    year: "2024, 2025",
    category: "campus",
    image: "homage.jpg",
    page: 10,
    description: {
      en: "Ceremonial hosting on the occasion of graduation, paying homage to Her Royal Highness Princess Srinagarindra.",
      th: "ผลงานพิธีกรในพิธีถวายสักการะสมเด็จพระศรีนครินทราบรมราชชนนี เนื่องในโอกาสสำเร็จการศึกษา",
    },
  },
  {
    id: "yoga",
    en: "11th International Day of Yoga",
    th: "วันโยคะสากล ครั้งที่ 11",
    year: "2025",
    category: "campus",
    page: 3,
  },
  {
    id: "incit",
    en: "International & National Conferences · InCIT / NCIT",
    th: "การประชุมวิชาการระดับนานาชาติและระดับชาติ InCIT / NCIT",
    year: "2023",
    category: "business",
    page: 3,
  },
];
const featured = [
  "life-teen",
  "pride",
  "four-lands",
  "khan-toke",
  "thai-china",
  "hllc",
];
let language = "en";
try {
  language = localStorage.getItem("dada-language") === "th" ? "th" : "en";
} catch (_) {
  /* Language still works without storage. */
}
let filter = "all";
let activeEvent = null;
const dialog = document.querySelector("#work-dialog");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#navigation");
const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ],
  );
function text(en, th) {
  return language === "th" ? th : en;
}
function eventDescription(event) {
  return (
    event.description?.[language] ||
    text(
      "Hosting credit listed in Dada’s published portfolio. See the original portfolio for the source listing.",
      "ผลงานพิธีกรที่ระบุในพอร์ตโฟลิโอของ Dada ดูข้อมูลต้นฉบับได้ในพอร์ตโฟลิโอฉบับเต็ม",
    )
  );
}
function portfolioLink(event) {
  return `${portfolioURL}#page=${event.page}`;
}
function renderWork() {
  document.querySelector("#work-grid").innerHTML = featured
    .map((id) => {
      const e = events.find((event) => event.id === id);
      return `<button type="button" class="work-card" data-event="${e.id}" aria-label="${escapeHTML(text("View event: ", "ดูผลงาน: ") + e[language])}"><div class="card-image"><img src="assets/${e.image}" alt="${escapeHTML(e[language])}" width="800" height="600" loading="lazy"><span class="card-arrow" aria-hidden="true">↗</span></div><div class="card-meta"><span>${categories[e.category][language]}</span><span>${e.year === "—" ? text("HOSTING", "พิธีกร") : e.year}</span></div><h3>${e[language]}</h3></button>`;
    })
    .join("");
  document
    .querySelectorAll("[data-event]")
    .forEach((button) =>
      button.addEventListener("click", () => openEvent(button.dataset.event)),
    );
}
function renderEvents() {
  const shown = events.filter((e) => filter === "all" || e.category === filter);
  document.querySelector("#event-list").innerHTML = shown
    .map(
      (e) =>
        `<details class="event-row"><summary><span class="event-number">${String(events.indexOf(e) + 1).padStart(2, "0")}</span><span class="event-title">${e[language]}</span><span class="event-year">${e.year}</span><span class="event-plus" aria-hidden="true">+</span></summary><div class="event-detail">${e.image ? `<img class="archive-photo" src="assets/${e.image}" alt="${escapeHTML(e[language])}" width="800" height="533" loading="lazy">` : ""}<p>${eventDescription(e)}</p><a class="text-link" href="${portfolioLink(e)}" target="_blank" rel="noopener noreferrer">${text("View source portfolio", "ดูพอร์ตโฟลิโอต้นฉบับ")} ↗</a></div></details>`,
    )
    .join("");
  document.querySelector("#event-status").textContent = text(
    `${shown.length} events shown`,
    `แสดง ${shown.length} ผลงาน`,
  );
}
function renderDialog() {
  const e = events.find((event) => event.id === activeEvent);
  if (!e) return;
  document.querySelector("#dialog-content").innerHTML =
    `<img class="dialog-photo" src="assets/${e.image}" alt="${escapeHTML(e[language])}"><div class="dialog-text"><p class="eyebrow">${categories[e.category][language]}${e.year === "—" ? "" : " · " + e.year}</p><h2 id="dialog-title">${e[language]}</h2><p>${eventDescription(e)}</p><a class="text-link" href="${portfolioLink(e)}" target="_blank" rel="noopener noreferrer">${text("More in the original portfolio", "ชมเพิ่มเติมในพอร์ตโฟลิโอต้นฉบับ")} ↗</a></div>`;
}
function openEvent(id) {
  activeEvent = id;
  renderDialog();
  dialog.showModal();
  document.body.classList.add("modal-open");
}
function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", text("Open navigation", "เปิดเมนู"));
}
function setLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  document
    .querySelectorAll("[data-en][data-th]")
    .forEach(
      (el) => (el.textContent = el.dataset[language].replace(/\\n/g, "\n")),
    );
  document
    .querySelectorAll("[data-lang]")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.lang === language),
      ),
    );
  document.title = text(
    "DADA — Kunwadee Phanompotivong | Bilingual MC",
    "DADA — Kunwadee Phanompotivong | พิธีกรไทย–อังกฤษ",
  );
  document.querySelector('meta[name="description"]').content = text(
    "Meet Dada, Kunwadee Phanompotivong. Thai–English MC, content creator and voice actor. Explore her hosting portfolio, events and cosmetic science background.",
    "รู้จัก Dada — Kunwadee Phanompotivong พิธีกรไทย–อังกฤษ คอนเทนต์ครีเอเตอร์ และนักพากย์เสียง พร้อมผลงานพิธีกรและเรื่องราวด้านวิทยาศาสตร์เครื่องสำอาง",
  );
  navigation.setAttribute("aria-label", text("Main navigation", "เมนูหลัก"));
  document
    .querySelector(".languages")
    .setAttribute("aria-label", text("Language", "ภาษา"));
  document
    .querySelector(".filters")
    .setAttribute("aria-label", text("Filter events", "กรองผลงาน"));
  document
    .querySelector(".dialog-close")
    .setAttribute(
      "aria-label",
      text("Close event details", "ปิดรายละเอียดผลงาน"),
    );
  document.querySelector(".portrait-frame img").alt = text(
    "Dada holding a microphone, wearing a burgundy evening dress",
    "Dada ถือไมโครโฟนในชุดราตรีสีเบอร์กันดี",
  );
  document.querySelector(".beyond-photo img").alt = text(
    "Dada and her co-host on the MFU Pride 2026 stage",
    "Dada และพิธีกรร่วมบนเวที MFU Pride 2026",
  );
  closeMenu();
  renderWork();
  renderEvents();
  renderDialog();
  try {
    localStorage.setItem("dada-language", language);
  } catch (_) {}
}
document
  .querySelectorAll("[data-lang]")
  .forEach((button) =>
    button.addEventListener("click", () => setLanguage(button.dataset.lang)),
  );
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    renderEvents();
  }),
);
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  navigation.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open
      ? text("Close navigation", "ปิดเมนู")
      : text("Open navigation", "เปิดเมนู"),
  );
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () =>
  document.body.classList.remove("modal-open"),
);
setLanguage(language);
