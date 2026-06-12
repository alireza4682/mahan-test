import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { getBlogCategories } from "./api/get-blog-categories";
import { getBlogs } from "./api/get-blogs";
import type { BlogsFilters } from "./types";

export const blogKeys = {
  all: ["blogs"] as const,
  categories: () => [...blogKeys.all, "categories"] as const,
  list: (filters: BlogsFilters) => [...blogKeys.all, "list", filters] as const,
};

export function blogCategoriesQueryOptions() {
  return queryOptions({
    queryKey: blogKeys.categories(),
    queryFn: ({ signal }) => getBlogCategories(signal),
  });
}

export function blogsQueryOptions(filters: BlogsFilters) {
  return queryOptions({
    queryKey: blogKeys.list(filters),
    queryFn: ({ signal }) => getBlogs({ filters, signal }),
    placeholderData: keepPreviousData,
  });
}
