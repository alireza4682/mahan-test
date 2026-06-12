import type { CreateBlogInput } from "../types";

export async function createBlog(input: CreateBlogInput): Promise<void> {
  const response = await fetch("/api/blogs", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || `Failed to create blog (${response.status})`);
  }

  await response.text();
}
