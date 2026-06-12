import type { BlogCategoryWithCount } from "../types";

const BLOG_CATEGORIES_ENDPOINT =
  "https://test.bajetala.com/blog/blog-categories/";

export async function getBlogCategories(
  signal?: AbortSignal,
): Promise<BlogCategoryWithCount[]> {
  const response = await fetch(BLOG_CATEGORIES_ENDPOINT, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog categories (${response.status})`);
  }

  return response.json() as Promise<BlogCategoryWithCount[]>;
}
