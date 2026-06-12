import type { BlogsFilters } from "./types";

export type BlogSearchParams = Record<string, string | string[] | undefined>;

export type BlogsUrlFilters = Omit<BlogsFilters, "pageSize">;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePositiveInteger(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : undefined;
}

export function parseBlogsUrlFilters(searchParams: BlogSearchParams): BlogsUrlFilters {
  const search = firstValue(searchParams.search)?.trim();

  return {
    category: parsePositiveInteger(firstValue(searchParams.category)),
    page: parsePositiveInteger(firstValue(searchParams.page)) ?? 1,
    search: search || undefined,
  };
}
