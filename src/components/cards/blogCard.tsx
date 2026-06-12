import React, { useId } from "react";
import Image from "next/image";
import Link from "next/link";

import { ClockIcon, EyeIcon, UserIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { BlogCardBorder } from "./blogCardBorder";

type BlogCardProps = {
  title: string;
  image?: string;
  date?: string;
  author?: string;
  tag?: string;
  href?: string;
  eager?: boolean;
};

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  image,
  date,
  author = "تیم تولید محتوا",
  tag,
  href = "#",
  eager = false,
}) => {
  const clipPathId = useId().replaceAll(":", "");

  return (
    <div
      className="group/blog-card relative h-63 w-40 transition-transform duration-500 ease-out before:pointer-events-none before:absolute before:inset-x-3 before:-top-1 before:-z-10 before:h-8 before:rounded-full before:bg-secondary/0 before:blur-xl before:transition-colors before:duration-500 md:h-82 md:w-full md:max-w-75.5 md:hover:-translate-y-1 md:hover:before:bg-secondary/20"
      style={{ "--blog-card-clip": `url(#${clipPathId})` } as React.CSSProperties}
    >
      <div className="blog-card-shadow relative h-full w-full">
        <Card className="blog-card-surface h-full w-full gap-0 overflow-hidden rounded-none py-0 ring-0">
          <div>
            {image && (
              <div className="p-2 md:p-3">
                <div className="relative h-25 w-36 overflow-hidden rounded-lg md:h-45 md:w-full">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1280px) 302px, (min-width: 768px) 50vw, 144px"
                    loading={eager ? "eager" : "lazy"}
                    unoptimized
                    className="object-cover transition-transform duration-500 ease-out md:group-hover/blog-card:scale-110"
                  />

                  {tag && (
                    <span className="absolute top-2 left-2 rounded-sm bg-secondary px-2 py-1 text-xs text-white md:top-3 md:left-3 md:px-3 md:py-2">
                      {tag}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="px-2 pb-2 md:px-3 md:pb-3">
              <div className="flex h-18 items-start justify-start md:h-12">
                <h2
                  className="blog-card-title min-w-0 flex-1 text-start text-sm leading-6 md:text-lg"
                  title={title}
                >
                  {title}
                </h2>
              </div>
            </div>
          </div>

          <div className="m-2 md:m-3">
            {(date || author) && (
              <div className="space-y-1">
                {date && (
                  <div className="flex min-h-5 items-center gap-2">
                    <ClockIcon
                      className="size-4 shrink-0 translate-y-px text-secondary md:size-5"
                      strokeWidth={1}
                    />
                    <span className="text-xs leading-5 text-text-secondary">{date}</span>
                  </div>
                )}

                {author && (
                  <div className="flex min-h-5 items-center gap-2">
                    <UserIcon
                      className="size-4 shrink-0 translate-y-px text-secondary md:size-5"
                      strokeWidth={1}
                    />
                    <span className="text-xs leading-5 text-text-secondary">{author}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        <BlogCardBorder clipPathId={clipPathId} />
      </div>

      <Link
        href={href}
        aria-label="مشاهده مقاله"
        className={cn(
          buttonVariants({ size: "icon", variant: "outline" }),
          "absolute bottom-0 left-0 z-20 size-11 rounded-lg border-natural-gray bg-card text-black md:size-14 md:rounded-xl",
        )}
      >
        <EyeIcon className="size-6 md:size-7" />
      </Link>
    </div>
  );
};

export default BlogCard;
