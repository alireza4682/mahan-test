const fallbackApiBaseUrl = "https://test.bajetala.com";

export const apiEndpoints = {
  blogs: "/blog/blogs/",
  blogCategories: "/blog/blog-categories/",
  createBlog: "/blog/blog/",
} as const;

export function createApiUrl(
  endpoint: (typeof apiEndpoints)[keyof typeof apiEndpoints],
  searchParams?: Record<string, string | number | undefined>,
) {
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_API_BASE_URL ?? fallbackApiBaseUrl);

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}
