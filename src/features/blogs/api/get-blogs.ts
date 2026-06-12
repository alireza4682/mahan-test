import type { BlogsApiResponse, BlogsFilters, BlogsPage } from "../types";

const BLOGS_ENDPOINT = "https://test.bajetala.com/blog/blogs/";
const API_PAGE_SIZE = 24;

type GetBlogsOptions = {
  filters: BlogsFilters;
  signal?: AbortSignal;
};

export async function getBlogs({
  filters,
  signal,
}: GetBlogsOptions): Promise<BlogsPage> {
  const offset = (filters.page - 1) * filters.pageSize;
  const firstApiPage = Math.floor(offset / API_PAGE_SIZE) + 1;
  const lastApiPage =
    Math.floor((offset + filters.pageSize - 1) / API_PAGE_SIZE) + 1;

  const firstResponse = await fetchApiPage(firstApiPage, filters, signal);
  const responses = [firstResponse];

  if (lastApiPage !== firstApiPage && firstResponse.next) {
    responses.push(await fetchApiPage(lastApiPage, filters, signal));
  }

  const firstResultOffset = offset - (firstApiPage - 1) * API_PAGE_SIZE;
  const results = responses
    .flatMap((response) => response.results)
    .slice(firstResultOffset, firstResultOffset + filters.pageSize);

  return {
    count: firstResponse.count,
    page: filters.page,
    pageSize: filters.pageSize,
    totalPages: Math.ceil(firstResponse.count / filters.pageSize),
    results,
  };
}

async function fetchApiPage(
  page: number,
  filters: BlogsFilters,
  signal?: AbortSignal,
): Promise<BlogsApiResponse> {
  const url = new URL(BLOGS_ENDPOINT);

  url.searchParams.set("page", String(page));

  if (filters.category !== undefined) {
    url.searchParams.set("category", String(filters.category));
  }

  if (filters.search) {
    url.searchParams.set("search", filters.search);
  }

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blogs (${response.status})`);
  }

  return response.json() as Promise<BlogsApiResponse>;
}
