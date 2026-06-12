import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { BlogsView } from "@/features/blogs/components/blogs-view";
import { type BlogSearchParams, parseBlogsUrlFilters } from "@/features/blogs/search-params";
import { blogCategoriesQueryOptions, blogsQueryOptions } from "@/features/blogs/queries";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { siteConfig } from "@/lib/site";

type BlogPageProps = {
  searchParams: Promise<BlogSearchParams>;
};

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const filters = parseBlogsUrlFilters(await searchParams);
  const hasFilters = filters.category !== undefined || filters.search !== undefined;
  const pageLabel = filters.page > 1 ? ` - صفحه ${filters.page.toLocaleString("fa-IR")}` : "";
  const title = filters.search ? `نتایج جستجوی «${filters.search}»` : `مجله طلا${pageLabel}`;
  const description = filters.search
    ? `مقاله‌های مرتبط با «${filters.search}» در مجله ${siteConfig.name}.`
    : siteConfig.description;
  const canonicalParams = new URLSearchParams();

  if (filters.page > 1) {
    canonicalParams.set("page", String(filters.page));
  }

  const canonical = canonicalParams.size ? `/blog?${canonicalParams.toString()}` : "/blog";

  return {
    title,
    description,
    alternates: { canonical },
    robots: hasFilters ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

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
