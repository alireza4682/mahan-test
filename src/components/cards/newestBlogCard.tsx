import Image from "next/image";
import Link from "next/link";

import { UserIcon } from "@/components/icons";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type NewestBlogCardProps = {
  title: string;
  description?: string;
  image?: string;
  author?: string;
  tag?: string;
  label?: string;
  href: string;
  className?: string;
};

export default function NewestBlogCard({
  title,
  description,
  image,
  author,
  tag,
  label = "جدیدترین",
  href,
  className,
}: NewestBlogCardProps) {
  return (
    <Link
      href={href}
      aria-label={`مشاهده مقاله ${title}`}
      className="block w-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card
        className={cn(
          "w-full flex-row-reverse gap-2 border border-border/60 px-2 py-[11.41px] shadow-none ring-0 transition-colors hover:border-secondary/40 md:h-81 md:gap-0 md:p-3",
          className,
        )}
      >
        {image && (
          <div className="relative h-28.25 w-42.5 shrink-0 overflow-hidden rounded-lg md:h-75 md:w-[46%]">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 768px) 46vw, 170px"
              loading="eager"
              unoptimized
              className="object-cover"
            />

            {tag && (
              <span className="absolute inset-s-2 top-2 rounded-md bg-secondary px-2 py-1 text-xs text-white md:inset-s-3 md:top-3 md:px-3 md:py-2 md:text-sm">
                {tag}
              </span>
            )}
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-2 text-start md:gap-4 md:pe-3">
          <div className="rounded-md bg-muted px-3 py-2 text-center text-[12px] text-muted-foreground md:text-sm">
            {label}
          </div>

          <h2 className="line-clamp-3 text-[13px] leading-7 font-medium md:line-clamp-2 md:text-lg md:leading-8">
            {title}
          </h2>

          {description && (
            <p className="line-clamp-4 hidden leading-7 text-muted-foreground md:block md:text-base">
              {description}
            </p>
          )}

          {author && (
            <div className="mt-auto flex min-h-[19.85px] items-center gap-2 text-muted-foreground md:min-h-12">
              <UserIcon
                className="size-[19.85px] shrink-0 text-secondary md:size-12"
                strokeWidth={1}
              />
              <span className="text-xs leading-5 md:text-sm md:leading-6">{author}</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

export type { NewestBlogCardProps };
