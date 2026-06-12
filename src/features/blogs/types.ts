export type BlogCategory = {
  id: number;
  title: string;
};

export type BlogCategoryWithCount = BlogCategory & {
  blog_count: number;
};

export type Blog = {
  id: number;
  category: BlogCategory;
  image: string | null;
  title: string;
  content: string;
  created_datetime: string;
};

export type BlogsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Blog[];
};

export type BlogsPage = {
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  results: Blog[];
};

export type BlogsFilters = {
  category?: number;
  page: number;
  pageSize: 10 | 15;
  search?: string;
};
