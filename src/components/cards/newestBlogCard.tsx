import Image from "next/image";

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
  className?: string;
};

export default function NewestBlogCard({
  title,
  description,
  image,
  author,
  tag,
  label = "جدیدترین",
  className,
}: NewestBlogCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-238.5 flex-row-reverse gap-2 border border-natural-gray px-2 py-[11.41px] md:h-81 md:gap-0 md:p-3",
        className,
      )}
    >
      {image && (
        <div className="relative h-28.25 w-42.5 shrink-0 overflow-hidden rounded-lg md:h-75 md:w-111">
          <Image
            src={image}
            alt={title}
            width={444}
            height={300}
            unoptimized
            className="h-full w-full object-cover"
          />

          {tag && (
            <span className="absolute inset-s-2 top-2 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground md:inset-s-3 md:top-3 md:px-3 md:py-2 md:text-sm">
              {tag}
            </span>
          )}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-2 text-start md:gap-4 md:pe-3">
        <div className="rounded-md bg-muted px-3 py-2 text-center text-[12px] text-muted-foreground md:text-sm">
          {label}
        </div>

        <h2 className="line-clamp-3 text-[13px] leading-7 font-medium md:line-clamp-2 md:text-[18px] md:leading-8">
          {title}
        </h2>

        {description && (
          <p className="hidden line-clamp-4 leading-7 text-muted-foreground md:block md:text-[16px]">
            {description}
          </p>
        )}

        {author && (
          <div className="mt-auto flex items-center gap-2 text-[6.95px] text-muted-foreground md:text-[14px]">
            <UserIcon className="size-8 shrink-0 text-secondary" />
            <span>{author}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

export type { NewestBlogCardProps };
