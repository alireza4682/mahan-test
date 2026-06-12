import type { CreateBlogInput } from "../types";

type ApiValidationErrors = Record<string, string[] | string>;

function getErrorMessage(body: string, status: number) {
  if (!body) {
    return `ثبت بلاگ با خطا مواجه شد (${status}).`;
  }

  try {
    const errors = JSON.parse(body) as ApiValidationErrors;
    const messages = Object.values(errors).flatMap((error) =>
      Array.isArray(error) ? error : [error],
    );

    return messages.join(" ");
  } catch {
    return body;
  }
}

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
    throw new Error(getErrorMessage(await response.text(), response.status));
  }

  await response.text();
}
