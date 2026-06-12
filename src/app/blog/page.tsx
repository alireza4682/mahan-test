import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { BlogsView } from "@/features/blogs/components/blogs-view";
import { type BlogSearchParams, parseBlogsUrlFilters } from "@/features/blogs/search-params";
import { blogCategoriesQueryOptions, blogsQueryOptions } from "@/features/blogs/queries";
import { getQueryClient } from "@/lib/react-query/get-query-client";

type BlogPageProps = {
  searchParams: Promise<BlogSearchParams>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const filters = parseBlogsUrlFilters(await searchParams);
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(blogsQueryOptions({ ...filters, pageSize: 11 })),
    queryClient.prefetchQuery(blogsQueryOptions({ ...filters, pageSize: 16 })),
    queryClient.prefetchQuery(blogCategoriesQueryOptions()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogsView
        key={`${filters.category ?? "all"}:${filters.search ?? ""}`}
        initialFilters={filters}
      />
    </HydrationBoundary>
  );
}
