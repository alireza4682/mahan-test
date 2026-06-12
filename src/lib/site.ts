const fallbackSiteUrl = "https://bajetala.com";

export const siteConfig = {
  name: "باجه طلا",
  shortName: "باجه طلا",
  description: "مجله باجه طلا؛ تازه‌ترین مقاله‌ها، راهنماها و مطالب کاربردی درباره طلا و بازار آن.",
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl),
  locale: "fa_IR",
};
