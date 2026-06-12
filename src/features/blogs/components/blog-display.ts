export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function formatPersianNumber(value: number) {
  return new Intl.NumberFormat("fa-IR", {
    useGrouping: false,
  }).format(value);
}

export function formatBlogContent(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
