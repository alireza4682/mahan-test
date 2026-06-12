"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserSquareIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputField } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { createBlog } from "../api/create-blog";
import { blogKeys } from "../queries";
import type { BlogCategoryWithCount } from "../types";

type AddBlogDialogProps = {
  categories: BlogCategoryWithCount[];
};

const MAX_BLOG_CONTENT_LENGTH = 500;

export type NewBlogValues = {
  title: string;
  categoryId: string;
  content: string;
};

export function AddBlogDialog({ categories }: AddBlogDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: blogKeys.all,
      });
    },
  });
  const form = useForm({
    defaultValues: {
      title: "",
      categoryId: "",
      content: "",
    } satisfies NewBlogValues,
    onSubmit: async ({ value }) => {
      try {
        await createBlogMutation.mutateAsync({
          category: Number(value.categoryId),
          title: value.title.trim(),
          content: value.content.trim(),
        });
        setOpen(false);
        form.reset();
      } catch {
        // The mutation state renders the submission error in the dialog.
      }
    },
  });

  return (
    <section className="space-y-3">
      <h2 className="text-xl text-secondary">اضافه کردن بلاگ</h2>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);

          if (!nextOpen) {
            form.reset();
            createBlogMutation.reset();
          }
        }}
      >
        <DialogTrigger
          render={
            <Button
              type="button"
              className="h-13 w-full rounded-xl bg-primary text-base text-primary-foreground"
            />
          }
        >
          نوشتن بلاگ جدید
        </DialogTrigger>

        <DialogContent dir="rtl" className="max-w-[328px] md:max-w-[720px]">
          <DialogHeader className="mb-6">
            <DialogTitle>اضافه کردن بلاگ جدید</DialogTitle>
          </DialogHeader>

          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <form.Field
              name="title"
              validators={{
                onSubmit: ({ value }) => {
                  const title = value.trim();

                  if (!title) {
                    return "عنوان بلاگ را وارد کنید.";
                  }

                  if (/[سفق]/u.test(title)) {
                    return "عنوان بلاگ نمی‌تواند شامل حروف س، ف یا ق باشد.";
                  }

                  return undefined;
                },
              }}
            >
              {(field) => (
                <InputField
                  id={field.name}
                  name={field.name}
                  type="text"
                  label="عنوان بلاگ"
                  icon={<UserSquareIcon />}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="مثال: راهنمای کامل خرید و سرمایه‌گذاری در..."
                  error={field.state.meta.errors[0]}
                  className="h-13 text-base"
                />
              )}
            </form.Field>

            <form.Field
              name="categoryId"
              validators={{
                onSubmit: ({ value }) => (value ? undefined : "یک دسته‌بندی انتخاب کنید."),
              }}
            >
              {(field) => {
                const selectedCategory = categories.find(
                  (category) => String(category.id) === field.state.value,
                );

                return (
                  <div className="flex flex-col gap-1">
                    <label htmlFor="new-blog-category" className="text-lg text-foreground">
                      دسته‌بندی
                    </label>
                    <Select
                      value={field.state.value || null}
                      onValueChange={(value) => {
                        field.handleChange(value ?? "");
                        field.handleBlur();
                      }}
                    >
                      <SelectTrigger
                        id="new-blog-category"
                        onBlur={field.handleBlur}
                        aria-invalid={field.state.meta.errors.length > 0}
                        className="w-full px-3 text-base data-[size=default]:h-13"
                      >
                        <SelectValue placeholder="مثال: آموزشی">
                          {selectedCategory?.title}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent
                        align="start"
                        alignItemWithTrigger={false}
                        sideOffset={8}
                        className="rounded-xl border border-muted p-2 text-base shadow-lg"
                      >
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                            className="min-h-11 rounded-lg px-3 pe-10 text-base"
                          >
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.state.meta.errors[0] ? (
                      <p role="alert" className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    ) : null}
                  </div>
                );
              }}
            </form.Field>

            <form.Field
              name="content"
              validators={{
                onSubmit: ({ value }) => {
                  const content = value.trim();

                  if (!content) {
                    return "بدنه بلاگ را وارد کنید.";
                  }

                  if (content.length > MAX_BLOG_CONTENT_LENGTH) {
                    return `بدنه بلاگ نمی‌تواند بیشتر از ${MAX_BLOG_CONTENT_LENGTH} نویسه باشد.`;
                  }

                  if (/[سف]/u.test(content)) {
                    return "بدنه بلاگ نمی‌تواند شامل حروف س یا ف باشد.";
                  }

                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1">
                  <label htmlFor={field.name} className="text-lg text-foreground">
                    بدنه بلاگ
                  </label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="متن بدنه بلاگ خود را بنویسید"
                    maxLength={MAX_BLOG_CONTENT_LENGTH}
                    aria-invalid={field.state.meta.errors.length > 0}
                    className="min-h-40 text-base sm:min-h-44"
                  />
                  <span className="text-end text-xs text-muted-foreground">
                    {field.state.value.length} / {MAX_BLOG_CONTENT_LENGTH}
                  </span>
                  {field.state.meta.errors[0] ? (
                    <p role="alert" className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <DialogFooter className="pt-1">
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="h-13 flex-1 rounded-xl bg-primary text-base text-primary-foreground"
                  >
                    {isSubmitting ? "در حال ثبت..." : "ثبت و انتشار بلاگ"}
                  </Button>
                )}
              </form.Subscribe>
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="h-13 flex-1 rounded-xl border-primary text-base"
                  />
                }
              >
                انصراف
              </DialogClose>
            </DialogFooter>

            {createBlogMutation.isError ? (
              <p role="alert" className="text-center text-sm text-destructive">
                {createBlogMutation.error.message}
              </p>
            ) : null}
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
