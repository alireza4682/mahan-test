import { apiEndpoints, createApiUrl } from "@/lib/api";

import type { BlogCategoryWithCount } from "../types";

export async function getBlogCategories(signal?: AbortSignal): Promise<BlogCategoryWithCount[]> {
  const response = await fetch(createApiUrl(apiEndpoints.blogCategories), {
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
