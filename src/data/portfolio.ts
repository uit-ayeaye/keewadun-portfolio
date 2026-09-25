export type Lang = "en" | "th";
export type Category = "festival" | "campus" | "business";
export interface EventCredit {
  id: string;
  en: string;
  th: string;
  year: string;
  category: Category;
  image?: string;
  imageSource?: "video";
  page: number;
  gallery?: string[];
  description?: Record<Lang, string>;
}
export const portfolioURL =
  "https://drive.google.com/file/d/1jvUtFgMHGjMw3YsM0ot72_wx1Mcp1B2C/view";
export const categories: Record<Category, Record<Lang, string>> = {
  festival: { en: "Festivals & culture", th: "เทศกาลและวัฒนธรรม" },
  campus: { en: "University & community", th: "มหาวิทยาลัยและชุมชน" },
  business: { en: "Business & sport", th: "ธุรกิจและกีฬา" },
};
// All credits are transcribed from the public portfolio linked by @keewadun.
// English renderings of Thai event names are editorial translations, not official titles.
export const events: EventCredit[] = [
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
    gallery: ["safe-food-stage.png"],
    page: 5,
    description: {
      en: "On-stage hosting for the fifth edition of Chiang Rai’s safe food event.",
      th: "ทำหน้าที่พิธีกรบนเวทีข่วงอาหารปลอดภัยเมืองเชียงราย ครั้งที่ 5",
    },
  },
  {
    id: "balloon",
    image: "balloon-fiesta.jpg",
    imageSource: "video",
    en: "International Balloon Fiesta",
    th: "International Balloon Fiesta",
    year: "2025, 2026",
    category: "festival",
    page: 3,
  },
  {
    id: "thaifex",
    image: "thaifex-thai-union.jpg",
    imageSource: "video",
    en: "THAIFEX–Anuga Asia",
    th: "THAIFEX–Anuga Asia",
    year: "2026",
    category: "business",
    page: 3,
  },
  {
    id: "grand-prix",
    image: "compak-sporting.jpg",
    imageSource: "video",
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
    gallery: ["life-teen-talk.jpg"],
    page: 7,
    description: {
      en: "A conversation on stage with special guest Ticha, featured in Dada’s hosting portfolio.",
      th: "ช่วงเวลาบนเวทีกับแขกรับเชิญพิเศษ ติช่า หนึ่งในผลงานพิธีกรของ Dada",
    },
  },
  {
    id: "innovation",
    image: "innovation-day.png",
    en: "MFU Innovation Day",
    th: "MFU Innovation Day",
    year: "2026",
    category: "campus",
    page: 15,
  },
  {
    id: "job-fair",
    image: "job-fair.png",
    en: "MFU Internship and Job Fair",
    th: "MFU Internship and Job Fair",
    year: "2025",
    category: "campus",
    page: 15,
  },
  {
    id: "pride",
    en: "MFU Pride",
    th: "MFU Pride",
    year: "2025, 2026",
    category: "campus",
    image: "pride-2026.jpg",
    gallery: ["pride-2025.jpg"],
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
    gallery: ["hllc-stage.png"],
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
    gallery: ["homage-stage.jpg"],
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

export const featured = [
  "life-teen",
  "pride",
  "four-lands",
  "khan-toke",
  "thai-china",
  "hllc",
];
export const base = "/keewadun-portfolio";
export const origin = "https://thomasdlynn.dev";
export const home = (lang: Lang) => `${base}/${lang === "th" ? "th/" : ""}`;
export const eventPath = (lang: Lang, id: string) => `${home(lang)}work/${id}/`;
export const t = (lang: Lang, en: string, th: string) =>
  lang === "th" ? th : en;
export const description = (e: EventCredit, lang: Lang) =>
  e.description?.[lang] ||
  t(
    lang,
    `${e.en}${e.year === "—" ? "" : ` (${e.year})`} is one of Dada’s published hosting credits. Explore the original portfolio for her full experience.`,
    `${e.th}${e.year === "—" ? "" : ` (${e.year})`} เป็นหนึ่งในผลงานพิธีกรที่ระบุในพอร์ตโฟลิโอของ Dada ดูประสบการณ์เพิ่มเติมได้ในพอร์ตโฟลิโอฉบับเต็ม`,
  );

export const socials = [
  {
    label: "Instagram",
    handle: "@keewadun",
    url: "https://www.instagram.com/keewadun/",
  },
  {
    label: "TikTok",
    handle: "@keewadun",
    url: "https://www.tiktok.com/@keewadun",
  },
  {
    label: "Facebook",
    handle: "Dady Kunwadee",
    url: "https://www.facebook.com/KunwadeeD",
  },
  {
    label: "LINE",
    handle: "Let’s talk",
    url: "https://line.me/ti/p/iLlNAWNNnR",
  },
];
export const resumeURL =
  "https://drive.google.com/file/d/1Ul89mVOEIkb7XQD8qq0aTuRZPu94k14Z/view";
