"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useOptimistic,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";

import BlogCard from "@/components/cards/blogCard";
import BlogCardSkeleton from "@/components/cards/blogCardSkeleton";
import { SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { blogCategoriesQueryOptions, blogsQueryOptions } from "../queries";
import type { BlogsUrlFilters } from "../search-params";

type BlogsViewProps = {
  initialFilters: BlogsUrlFilters;
};

const THREE_COLUMN_MEDIA_QUERY = "(min-width: 1280px)";

function subscribeToThreeColumnBreakpoint(callback: () => void) {
  const mediaQuery = window.matchMedia(THREE_COLUMN_MEDIA_QUERY);

  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getThreeColumnSnapshot() {
  return window.matchMedia(THREE_COLUMN_MEDIA_QUERY).matches;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function getPaginationPages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const startPage = Math.max(2, Math.min(currentPage - 1, totalPages - 4));
  const endPage = Math.min(totalPages - 1, Math.max(currentPage + 1, 5));
  const middlePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return [
    1,
    ...(startPage > 2 ? (["ellipsis"] as const) : []),
    ...middlePages,
    ...(endPage < totalPages - 1 ? (["ellipsis"] as const) : []),
    totalPages,
  ];
}

export function BlogsView({ initialFilters }: BlogsViewProps) {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const [search, setSearch] = useState(initialFilters.search ?? "");
  const [currentPage, setCurrentPage] = useOptimistic(initialFilters.page);
  const hasThreeColumns = useSyncExternalStore(
    subscribeToThreeColumnBreakpoint,
    getThreeColumnSnapshot,
    () => false,
  );
  const filters = {
    ...initialFilters,
    page: currentPage,
    pageSize: hasThreeColumns ? (15 as const) : (10 as const),
  };
  const { data, isFetching, isError, refetch } = useQuery(
    blogsQueryOptions(filters),
  );
  const { data: categories = [] } = useQuery(blogCategoriesQueryOptions());
  const selectedCategory = categories.find(
    (category) => category.id === initialFilters.category,
  );
  const selectedCategoryLabel = selectedCategory
    ? `${selectedCategory.title} (${selectedCategory.blog_count})`
    : "همه دسته‌بندی‌ها";
  const isCardsLoading = isFetching;

  function navigate(searchParams: URLSearchParams, scroll = true) {
    const query = searchParams.toString();

    startTransition(() => {
      router.replace(query ? `/blog?${query}` : "/blog", { scroll });
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchParams = new URLSearchParams();
    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      searchParams.set("search", trimmedSearch);
    }

    if (initialFilters.category !== undefined) {
      searchParams.set("category", String(initialFilters.category));
    }

    navigate(searchParams);
  }

  function selectCategory(category?: number) {
    const searchParams = new URLSearchParams();

    if (initialFilters.search) {
      searchParams.set("search", initialFilters.search);
    }

    if (category !== undefined && initialFilters.category !== category) {
      searchParams.set("category", String(category));
    }

    navigate(searchParams, false);
  }

  function goToPage(page: number) {
    const searchParams = getPageSearchParams(page);
    const query = searchParams.toString();

    startTransition(() => {
      setCurrentPage(page);
      router.replace(query ? `/blog?${query}` : "/blog", { scroll: false });
    });
  }

  function getPageSearchParams(page: number) {
    const searchParams = new URLSearchParams();

    if (initialFilters.search) {
      searchParams.set("search", initialFilters.search);
    }

    if (initialFilters.category !== undefined) {
      searchParams.set("category", String(initialFilters.category));
    }

    searchParams.set("page", String(page));
    return searchParams;
  }

  function getPageHref(page: number) {
    return `/blog?${getPageSearchParams(page).toString()}`;
  }

  return (
    <main className="flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:flex-row md:items-start">
      <aside className="w-full space-y-8 md:sticky md:top-8 md:max-w-75.5 md:flex-[0_1_302px]">
        <form onSubmit={handleSubmit}>
          <InputField
            id="blog-search"
            name="search"
            type="search"
            label="جستجوی مجله"
            icon={<SearchIcon />}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="مثال: راهنمای خرید و فروش"
            disabled={isNavigating}
            className="text-base"
          />
        </form>

        <div className="md:hidden">
          <label
            htmlFor="blog-category"
            className="mb-3 block text-xl text-secondary"
          >
            دسته‌بندی‌ها
          </label>
          <Select
            value={String(initialFilters.category ?? "all")}
            onValueChange={(value) =>
              selectCategory(
                value && value !== "all" ? Number(value) : undefined,
              )
            }
            disabled={isNavigating}
          >
            <SelectTrigger
              id="blog-category"
              className="w-full border-muted px-3 text-base text-muted-foreground data-[size=default]:h-13 data-popup-open:[&_svg]:rotate-180 [&_svg]:transition-transform [&_svg]:duration-200"
            >
              <SelectValue>{selectedCategoryLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent
              align="start"
              alignItemWithTrigger={false}
              sideOffset={8}
              className="rounded-xl border border-muted p-2 text-base shadow-lg duration-200"
            >
              <SelectItem
                value="all"
                className="min-h-11 rounded-lg px-3 pe-10 text-base"
              >
                همه دسته‌بندی‌ها
              </SelectItem>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={String(category.id)}
                  className="min-h-11 rounded-lg px-3 pe-10 text-base"
                >
                  {category.title} ({category.blog_count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden rounded-2xl border border-border p-5 md:block">
          <h2 className="mb-4 text-xl text-secondary">دسته‌بندی‌ها</h2>
          <div className="space-y-3">
            {categories.map((category) => {
              const isSelected = initialFilters.category === category.id;

              return (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-center gap-3 text-lg text-muted-foreground"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => selectCategory(category.id)}
                    className="size-5 appearance-none rounded-md border border-secondary checked:bg-secondary checked:shadow-[inset_0_0_0_4px_var(--background)]"
                  />
                  <span>
                    {category.title} ({category.blog_count})
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </aside>

      <section className="min-w-0 flex-1 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">بلاگ</h1>
          <p className="text-muted-foreground">
            {data?.count ?? 0} مقاله پیدا شد
          </p>
        </div>

        {isError ? (
          <div className="space-y-3 rounded-lg border p-6 text-center">
            <p>دریافت مقالات با خطا مواجه شد.</p>
            <Button variant="outline" onClick={() => refetch()}>
              تلاش دوباره
            </Button>
          </div>
        ) : isCardsLoading || data?.results.length ? (
          <>
            <div
              className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] justify-items-center gap-4 md:grid-cols-2 xl:grid-cols-3"
              aria-busy={isCardsLoading}
              aria-live="polite"
            >
              {isCardsLoading
                ? Array.from({ length: filters.pageSize }, (_, index) => (
                    <BlogCardSkeleton key={index} />
                  ))
                : data?.results.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      title={blog.title}
                      image={blog.image ?? undefined}
                      date={formatDate(blog.created_datetime)}
                      author="تیم تولید محتوا"
                      tag={blog.category.title}
                    />
                  ))}
            </div>

            {data?.results.length ? (
              <Pagination aria-label="صفحه‌بندی مقالات">
                <PaginationContent className="gap-[9px] transition-all duration-300">
                  <PaginationItem>
                    <PaginationPrevious
                      href={getPageHref(Math.max(1, currentPage - 1))}
                      text=""
                      aria-disabled={currentPage <= 1}
                      onClick={(event) => {
                        event.preventDefault();
                        if (currentPage > 1) {
                          goToPage(currentPage - 1);
                        }
                      }}
                      className="size-10 border border-secondary bg-secondary p-0 text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/80 hover:text-white aria-disabled:pointer-events-none aria-disabled:border-muted aria-disabled:bg-muted aria-disabled:text-muted-foreground aria-disabled:shadow-none"
                    />
                  </PaginationItem>

                  {getPaginationPages(
                    currentPage,
                    data.totalPages,
                  ).map((page, index) =>
                    page === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis className="size-10 text-secondary" />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href={getPageHref(page)}
                          isActive={page === currentPage}
                          aria-label={`صفحه ${page}`}
                          onClick={(event) => {
                            event.preventDefault();
                            if (page !== currentPage) {
                              goToPage(page);
                            }
                          }}
                          className="size-10 border border-secondary/40 text-base text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary/10 hover:text-secondary data-[active=true]:scale-110 data-[active=true]:border-secondary data-[active=true]:bg-secondary data-[active=true]:text-white data-[active=true]:shadow-md"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href={getPageHref(
                        Math.min(data.totalPages, currentPage + 1),
                      )}
                      text=""
                      aria-disabled={currentPage >= data.totalPages}
                      onClick={(event) => {
                        event.preventDefault();
                        if (currentPage < data.totalPages) {
                          goToPage(currentPage + 1);
                        }
                      }}
                      className="size-10 border border-secondary bg-secondary p-0 text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/80 hover:text-white aria-disabled:pointer-events-none aria-disabled:border-muted aria-disabled:bg-muted aria-disabled:text-muted-foreground aria-disabled:shadow-none"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : null}
          </>
        ) : (
          <p className="rounded-lg border p-6 text-center">
            مقاله‌ای با این فیلترها پیدا نشد.
          </p>
        )}
      </section>
    </main>
  );
}
