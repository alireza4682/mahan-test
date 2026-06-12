import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewestBlogCardSkeleton() {
  return (
    <Card
      aria-hidden="true"
      className="w-full flex-row-reverse gap-2 border border-border/60 px-2 py-[11.41px] shadow-none ring-0 md:h-81 md:gap-0 md:p-3"
    >
      <Skeleton className="h-28.25 w-42.5 shrink-0 rounded-lg md:h-75 md:w-[46%]" />

      <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-3 md:pe-3 lg:gap-4">
        <Skeleton className="h-9 w-full rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-full md:h-6" />
          <Skeleton className="h-5 w-4/5 md:h-6" />
        </div>
        <div className="hidden space-y-3 md:block">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="mt-auto flex items-center gap-2">
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </Card>
  );
}
