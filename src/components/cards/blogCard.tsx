import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ClockIcon, EyeIcon, UserIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  return (
    <Card className="group/blog-card relative h-66 w-40 gap-0 overflow-visible py-0 transition-transform duration-500 ease-out before:pointer-events-none before:absolute before:inset-x-3 before:-top-1 before:-z-10 before:h-8 before:rounded-full before:bg-secondary/0 before:blur-xl before:transition-colors before:duration-500 md:h-84 md:w-full md:max-w-75.5 md:hover:-translate-y-1 md:hover:before:bg-secondary/20">
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

        <div className="px-2 pb-3 md:px-3 md:pb-4">
          <div className="flex h-21 items-start justify-start md:h-14">
            <h2 className="line-clamp-3 text-start text-sm leading-7 md:line-clamp-2 md:text-lg">
              {title}
            </h2>
          </div>
        </div>
      </div>

      <div className="m-2">
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

      <div
        aria-hidden="true"
        className="absolute -bottom-px -left-px z-10 h-13 w-13 rounded-tr-lg border-t border-r border-natural-gray bg-background md:h-16 md:w-16 md:rounded-tr-xl"
      />

      <Link
        href={href}
        aria-label="مشاهده مقاله"
        className={cn(
          buttonVariants({ size: "icon", variant: "outline" }),
          "absolute bottom-0 left-0 z-20 size-11 rounded-lg bg-card text-black md:size-14",
        )}
      >
        <EyeIcon className="size-6 md:size-7" />
      </Link>
    </Card>
  );
};

export default BlogCard;
