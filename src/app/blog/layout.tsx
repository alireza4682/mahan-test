import { HomeIcon } from "@/components/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full max-w-7xl space-y-6 px-4 py-8">
      <Breadcrumb>
        <BreadcrumbList className="text-base">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="inline-flex items-center gap-1.5">
              <HomeIcon className="size-5 -translate-y-px text-secondary" strokeWidth={1.5} />
              <span className="leading-5">خانه</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-muted-foreground">مجله</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {children}
    </main>
  );
}
