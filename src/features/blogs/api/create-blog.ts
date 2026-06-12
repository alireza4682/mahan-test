import type { CreateBlogInput } from "../types";

type ApiValidationErrors = Record<string, string[] | string>;

export class CreateBlogError extends Error {
  constructor(
    message: string,
    readonly fieldErrors: ApiValidationErrors = {},
  ) {
    super(message);
    this.name = "CreateBlogError";
  }
}

function parseError(body: string, status: number) {
  if (!body) {
    return new CreateBlogError(`ثبت بلاگ با خطا مواجه شد (${status}).`);
  }

  try {
    const errors = JSON.parse(body) as ApiValidationErrors;
    const messages = Object.values(errors).flatMap((error) =>
      Array.isArray(error) ? error : [error],
    );

    return new CreateBlogError(messages.join(" "), errors);
  } catch {
    return new CreateBlogError(body);
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
    throw parseError(await response.text(), response.status);
  }

  await response.text();
}
