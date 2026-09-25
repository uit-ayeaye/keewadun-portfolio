import { base, type Category, type Lang } from "./portfolio";
export interface VideoClip {
  id: string;
  event: string | null;
  category: Category;
  en: string;
  th: string;
  description: Record<Lang, string>;
  seconds: number;
  source: string;
}
// Supplied work samples; filenames and visible stage/booth signage cross-checked against the portfolio.
export const videos: VideoClip[] = [
  {
    id: "hllc-opening",
    event: "hllc",
    category: "campus",
    en: "HLLC · Opening moment",
    th: "HLLC · ช่วงเปิดงาน",
    description: {
      en: "Opening-ceremony hosting, from the audience’s view.",
      th: "บรรยากาศพิธีกรช่วงเปิดงานจากมุมผู้ชม",
    },
    seconds: 17.34,
    source: "Hllc.mov",
  },
  {
    id: "hllc-stage",
    event: "hllc",
    category: "campus",
    en: "HLLC · On stage",
    th: "HLLC · บนเวที",
    description: {
      en: "A second moment from the HLLC stage.",
      th: "อีกช่วงเวลาของการดำเนินรายการบนเวที HLLC",
    },
    seconds: 26.07,
    source: "Hllc.mp4",
  },
  {
    id: "jbl-mahajak",
    event: null,
    category: "business",
    en: "JBL · Mahajak Mega Deal",
    th: "JBL · Mahajak Mega Deal",
    description: {
      en: "Product presentation on the retail floor.",
      th: "การนำเสนอสินค้าภายในพื้นที่จัดแสดง",
    },
    seconds: 104.21,
    source: "JBL Mahajak Mega Deal.MP4",
  },
  {
    id: "compak-sporting",
    event: "grand-prix",
    category: "business",
    en: "Compak Sporting · Opening ceremony",
    th: "Compak Sporting · พิธีเปิด",
    description: {
      en: "Opening-ceremony hosting at the Chiang Mai sporting event.",
      th: "บรรยากาศการดำเนินพิธีเปิดการแข่งขันที่เชียงใหม่",
    },
    seconds: 41.22,
    source: "MFU Compax Sporting.mov",
  },
  {
    id: "four-lands-stage",
    event: "four-lands",
    category: "festival",
    en: "Four Lands · The festival stage",
    th: "มหกรรมอาหารสี่แผ่นดิน · บนเวที",
    description: {
      en: "A view from the crowd at the food festival.",
      th: "บรรยากาศจากมุมผู้ชมในงานมหกรรมอาหารสี่แผ่นดิน",
    },
    seconds: 17.88,
    source: "มหกรรมอาหารสี่แผ่นดิน 2.MOV",
  },
  {
    id: "innovation-day",
    event: "innovation",
    category: "campus",
    en: "MFU · Innovation Day",
    th: "MFU · Innovation Day",
    description: {
      en: "A moment on the Innovation Day stage.",
      th: "ช่วงเวลาบนเวทีงาน Innovation Day",
    },
    seconds: 28.07,
    source: "Innovation day.mov",
  },
  {
    id: "thaifex-thai-union",
    event: "thaifex",
    category: "business",
    en: "THAIFEX · Thai Union",
    th: "THAIFEX · Thai Union",
    description: {
      en: "Presenting at the Thai Union exhibition booth.",
      th: "การนำเสนอภายในบูธ Thai Union",
    },
    seconds: 12.08,
    source: "Thaifex Thai Union.mov",
  },
  {
    id: "pride-in-you",
    event: "pride",
    category: "campus",
    en: "MFU · Pride in You",
    th: "MFU · Pride in You",
    description: {
      en: "Sharing the stage at MFU Pride in You.",
      th: "บรรยากาศการดำเนินรายการบนเวที MFU Pride in You",
    },
    seconds: 36.2,
    source: "Pride in you.MOV",
  },
  {
    id: "graduation-day",
    event: "homage",
    category: "campus",
    en: "Graduation · A ceremonial moment",
    th: "วันสำเร็จการศึกษา · ช่วงพิธีการ",
    description: {
      en: "Ceremonial hosting with a co-host on graduation day.",
      th: "การดำเนินพิธีร่วมกับพิธีกรคู่ในวันสำเร็จการศึกษา",
    },
    seconds: 23.87,
    source: "Graduation Day.MOV",
  },
  {
    id: "four-lands-hosting",
    event: "four-lands",
    category: "festival",
    en: "Four Lands · On the mic",
    th: "มหกรรมอาหารสี่แผ่นดิน · ช่วงดำเนินรายการ",
    description: {
      en: "A closer look at Dada hosting the food festival.",
      th: "ชมการดำเนินรายการของ Dada ในงานมหกรรมอาหารสี่แผ่นดิน",
    },
    seconds: 56.57,
    source: "มหกรรมอาหารสี่แผ่นดิน.MOV",
  },
  {
    id: "balloon-fiesta",
    event: "balloon",
    category: "festival",
    en: "International Balloon Fiesta",
    th: "International Balloon Fiesta",
    description: {
      en: "An on-stage conversation at the festival.",
      th: "บรรยากาศการพูดคุยบนเวทีในงานเทศกาลบอลลูน",
    },
    seconds: 33.24,
    source: "International balloon fiesta.MOV",
  },
  {
    id: "khan-toke",
    event: "khan-toke",
    category: "festival",
    en: "Khan Toke · A cultural celebration",
    th: "งานขันโตก · การเฉลิมฉลองวัฒนธรรม",
    description: {
      en: "Hosting a cultural evening on the Khan Toke stage.",
      th: "การดำเนินรายการในค่ำคืนแห่งวัฒนธรรมบนเวทีขันโตก",
    },
    seconds: 84.67,
    source: "KhanToke.MOV",
  },
];
export const videosFor = (id: string) => videos.filter((v) => v.event === id);
export const videoURL = (v: VideoClip) => `${base}/media/${v.id}.mp4`;
export const posterURL = (v: VideoClip) => `${base}/media/${v.id}.jpg`;
export const duration = (v: VideoClip) =>
  `${Math.floor(v.seconds / 60)}:${String(Math.floor(v.seconds % 60)).padStart(2, "0")}`;
