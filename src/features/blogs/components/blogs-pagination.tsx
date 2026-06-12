import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { formatPersianNumber } from "./blog-display";

type BlogsPaginationProps = {
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
  onPageChange: (page: number) => void;
};

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

export function BlogsPagination({
  currentPage,
  totalPages,
  getPageHref,
  onPageChange,
}: BlogsPaginationProps) {
  return (
    <Pagination aria-label="صفحه‌بندی مقالات">
      <PaginationContent className="gap-2.25 transition-all duration-300">
        <PaginationItem>
          <PaginationPrevious
            href={getPageHref(Math.max(1, currentPage - 1))}
            text=""
            aria-disabled={currentPage <= 1}
            onClick={(event) => {
              event.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            className="size-10 border border-secondary bg-secondary p-0 text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/80 hover:text-white aria-disabled:pointer-events-none aria-disabled:border-muted aria-disabled:bg-muted aria-disabled:text-muted-foreground aria-disabled:shadow-none"
          />
        </PaginationItem>

        {getPaginationPages(currentPage, totalPages).map((page, index) =>
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
                    onPageChange(page);
                  }
                }}
                className="size-10 border border-secondary/40 p-0 text-base leading-none text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary/10 hover:text-secondary data-[active=true]:scale-110 data-[active=true]:border-secondary data-[active=true]:bg-secondary data-[active=true]:text-white data-[active=true]:shadow-md"
              >
                <span className="flex size-full translate-y-px items-center justify-center leading-none">
                  {formatPersianNumber(page)}
                </span>
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href={getPageHref(Math.min(totalPages, currentPage + 1))}
            text=""
            aria-disabled={currentPage >= totalPages}
            onClick={(event) => {
              event.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            className="size-10 border border-secondary bg-secondary p-0 text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/80 hover:text-white aria-disabled:pointer-events-none aria-disabled:border-muted aria-disabled:bg-muted aria-disabled:text-muted-foreground aria-disabled:shadow-none"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
