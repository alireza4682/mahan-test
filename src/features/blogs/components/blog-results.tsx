import BlogCard from "@/components/cards/blogCard";
import BlogCardSkeleton from "@/components/cards/blogCardSkeleton";
import NewestBlogCard from "@/components/cards/newestBlogCard";
import NewestBlogCardSkeleton from "@/components/cards/newestBlogCardSkeleton";
import { Button } from "@/components/ui/button";

import type { BlogsPage } from "../types";
import { formatBlogContent, formatBlogDate } from "./blog-display";
import { BlogsPagination } from "./blogs-pagination";

type BlogResultsProps = {
  data?: BlogsPage;
  isError: boolean;
  isLoading: boolean;
  pageSize: 11 | 16;
  currentPage: number;
  onRetry: () => void;
  getPageHref: (page: number) => string;
  onPageChange: (page: number) => void;
};

export function BlogResults({
  data,
  isError,
  isLoading,
  pageSize,
  currentPage,
  onRetry,
  getPageHref,
  onPageChange,
}: BlogResultsProps) {
  if (isError) {
    return (
      <div className="space-y-3 rounded-lg border p-6 text-center">
        <p>دریافت مقالات با خطا مواجه شد.</p>
        <Button variant="outline" onClick={onRetry}>
          تلاش دوباره
        </Button>
      </div>
    );
  }

  if (!isLoading && !data?.results.length) {
    return <p className="rounded-lg border p-6 text-center">مقاله‌ای با این فیلترها پیدا نشد.</p>;
  }

  const featuredBlog = data?.results[0];
  const remainingBlogs = data?.results.slice(1) ?? [];

  return (
    <>
      <div className="space-y-4" aria-busy={isLoading} aria-live="polite">
        {isLoading ? (
          <NewestBlogCardSkeleton />
        ) : featuredBlog ? (
          <NewestBlogCard
            title={featuredBlog.title}
            description={formatBlogContent(featuredBlog.content)}
            image={featuredBlog.image ?? undefined}
            author="تیم تولید محتوا"
            tag={featuredBlog.category.title}
            href={`/blog/${featuredBlog.id}`}
          />
        ) : null}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] justify-items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: Math.max(0, pageSize - 1) }, (_, index) => (
                <BlogCardSkeleton key={index} />
              ))
            : remainingBlogs.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  title={blog.title}
                  image={blog.image ?? undefined}
                  date={formatBlogDate(blog.created_datetime)}
                  author="تیم تولید محتوا"
                  tag={blog.category.title}
                  eager={index < 3}
                />
              ))}
        </div>
      </div>

      {data?.results.length ? (
        <BlogsPagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          getPageHref={getPageHref}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  );
}
