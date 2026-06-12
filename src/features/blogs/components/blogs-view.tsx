"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useOptimistic, useSyncExternalStore, useTransition } from "react";

import { blogCategoriesQueryOptions, blogsQueryOptions } from "../queries";
import type { BlogsUrlFilters } from "../search-params";
import { BlogFilters } from "./blog-filters";
import { BlogResults } from "./blog-results";

type BlogsViewProps = {
  initialFilters: BlogsUrlFilters;
};

const THREE_COLUMN_MEDIA_QUERY = "(min-width: 1280px)";

function subscribeToThreeColumnLayout(callback: () => void) {
  const mediaQuery = window.matchMedia(THREE_COLUMN_MEDIA_QUERY);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getThreeColumnLayoutSnapshot() {
  return window.matchMedia(THREE_COLUMN_MEDIA_QUERY).matches;
}

function getThreeColumnLayoutServerSnapshot() {
  return false;
}

export function BlogsView({ initialFilters }: BlogsViewProps) {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useOptimistic(initialFilters.page);
  const hasThreeColumns = useSyncExternalStore(
    subscribeToThreeColumnLayout,
    getThreeColumnLayoutSnapshot,
    getThreeColumnLayoutServerSnapshot,
  );
  const filters = {
    ...initialFilters,
    page: currentPage,
    pageSize: hasThreeColumns ? (16 as const) : (11 as const),
  };
  const { data, isFetching, isError, refetch } = useQuery(blogsQueryOptions(filters));
  const { data: categories = [] } = useQuery(blogCategoriesQueryOptions());

  function navigate(searchParams: URLSearchParams, scroll = true) {
    const query = searchParams.toString();

    startTransition(() => {
      router.replace(query ? `/blog?${query}` : "/blog", { scroll });
    });
  }

  function submitSearch(search: string) {
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

  function clearSearch() {
    const searchParams = new URLSearchParams();

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
    <div className="flex flex-col gap-8 md:flex-row md:items-start">
      <BlogFilters
        categories={categories}
        category={initialFilters.category}
        initialSearch={initialFilters.search ?? ""}
        isNavigating={isNavigating}
        onSearchClear={clearSearch}
        onSearchSubmit={submitSearch}
        onCategoryChange={selectCategory}
      />

      <section className="min-w-0 flex-1 space-y-8">
        <BlogResults
          data={data}
          isError={isError}
          isLoading={isFetching}
          pageSize={filters.pageSize}
          currentPage={currentPage}
          onRetry={() => {
            void refetch();
          }}
          getPageHref={getPageHref}
          onPageChange={goToPage}
        />
      </section>
    </div>
  );
}
