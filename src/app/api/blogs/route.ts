import { NextResponse } from "next/server";

import type { CreateBlogInput } from "@/features/blogs/types";
import { apiEndpoints, createApiUrl } from "@/lib/api";

export async function POST(request: Request) {
  const body = (await request.json()) as CreateBlogInput;
  const response = await fetch(createApiUrl(apiEndpoints.createBlog), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseBody = await response.text();

  if (!response.ok) {
    return new NextResponse(responseBody || "Failed to create blog", {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "text/plain; charset=utf-8",
      },
    });
  }

  return new NextResponse(responseBody, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json",
    },
  });
}
