import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogCardSkeleton() {
  return (
    <Card
      aria-hidden="true"
      className="relative h-66 w-40 gap-0 overflow-visible py-0 md:h-84 md:w-full md:max-w-75.5"
    >
      <div className="p-2 md:p-3">
        <Skeleton className="h-25 w-36 rounded-lg md:h-45 md:w-full" />
      </div>

      <div className="px-2 pb-3 md:px-3 md:pb-4">
        <div className="h-21 space-y-3 md:h-14">
          <Skeleton className="h-4 w-full md:h-5" />
          <Skeleton className="h-4 w-4/5 md:h-5" />
        </div>
      </div>

      <div className="m-2 space-y-1">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 shrink-0 rounded-full md:size-5" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 shrink-0 rounded-full md:size-5" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <div className="absolute -bottom-px -left-px z-10 h-13 w-13 rounded-tr-lg border-t border-r border-natural-gray bg-background md:h-16 md:w-16 md:rounded-tr-xl" />
      <Skeleton className="absolute bottom-0 left-0 z-20 size-11 rounded-lg border border-border bg-muted md:size-14" />
    </Card>
  );
}
