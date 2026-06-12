import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";

import { SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { BlogCategoryWithCount } from "../types";
import { AddBlogDialog } from "./add-blog-dialog";
import { formatPersianNumber } from "./blog-display";

type BlogFiltersProps = {
  categories: BlogCategoryWithCount[];
  category?: number;
  initialSearch: string;
  isNavigating: boolean;
  onSearchClear: () => void;
  onSearchSubmit: (search: string) => void;
  onCategoryChange: (category?: number) => void;
};

export function BlogFilters({
  categories,
  category,
  initialSearch,
  isNavigating,
  onSearchClear,
  onSearchSubmit,
  onCategoryChange,
}: BlogFiltersProps) {
  const searchForm = useForm({
    defaultValues: {
      search: initialSearch,
    },
    onSubmit: ({ value }) => {
      onSearchSubmit(value.search);
    },
  });
  const selectedCategory = categories.find((item) => item.id === category);
  const selectedCategoryLabel = selectedCategory
    ? `${selectedCategory.title} (${formatPersianNumber(selectedCategory.blog_count)})`
    : "همه دسته‌بندی‌ها";

  return (
    <aside className="w-full space-y-8 md:sticky md:top-8 md:max-w-75.5 md:flex-[0_1_302px]">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void searchForm.handleSubmit();
        }}
      >
        <searchForm.Field name="search">
          {(field) => (
            <div className="space-y-2">
              <InputField
                id={field.name}
                name={field.name}
                type="search"
                label="جستجوی مجله"
                icon={<SearchIcon />}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="مثال: راهنمای خرید و فروش"
                disabled={isNavigating}
                className="text-base"
              />

              {initialSearch ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto px-1 py-1 text-sm text-muted-foreground hover:text-foreground"
                  disabled={isNavigating}
                  onClick={() => {
                    field.handleChange("");
                    onSearchClear();
                  }}
                >
                  <XIcon />
                  حذف فیلتر جستجو
                </Button>
              ) : null}
            </div>
          )}
        </searchForm.Field>
      </form>

      <div className="md:hidden">
        <label htmlFor="blog-category" className="mb-3 block text-xl text-secondary">
          دسته‌بندی‌ها
        </label>
        <Select
          value={String(category ?? "all")}
          onValueChange={(value) =>
            onCategoryChange(value && value !== "all" ? Number(value) : undefined)
          }
          disabled={isNavigating}
        >
          <SelectTrigger
            id="blog-category"
            className="w-full border-muted px-3 text-base text-muted-foreground data-[size=default]:h-13 [&_svg]:transition-transform [&_svg]:duration-200 data-popup-open:[&_svg]:rotate-180"
          >
            <SelectValue>{selectedCategoryLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent
            align="start"
            alignItemWithTrigger={false}
            sideOffset={8}
            className="rounded-xl border border-muted p-2 text-base shadow-lg duration-200"
          >
            <SelectItem value="all" className="min-h-11 rounded-lg px-3 pe-10 text-base">
              همه دسته‌بندی‌ها
            </SelectItem>
            {categories.map((item) => (
              <SelectItem
                key={item.id}
                value={String(item.id)}
                className="min-h-11 rounded-lg px-3 pe-10 text-base"
              >
                {item.title} ({formatPersianNumber(item.blog_count)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden rounded-2xl border border-border p-5 md:block">
        <h2 className="mb-4 text-xl text-secondary">دسته‌بندی‌ها</h2>
        <div className="space-y-3">
          {categories.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-3 text-lg text-muted-foreground"
            >
              <input
                type="checkbox"
                checked={category === item.id}
                onChange={() => onCategoryChange(item.id)}
                className="size-5 appearance-none rounded-md border border-secondary checked:bg-secondary checked:shadow-[inset_0_0_0_4px_var(--background)]"
              />
              <span>
                {item.title} ({formatPersianNumber(item.blog_count)})
              </span>
            </label>
          ))}
        </div>
      </div>

      <AddBlogDialog categories={categories} />
    </aside>
  );
}
