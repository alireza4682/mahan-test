"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

import { FieldError } from "./field-error";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-placeholder h-10 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

type InputFieldProps = React.ComponentProps<typeof Input> & {
  label: React.ReactNode;
  error?: React.ReactNode;
  icon?: React.ReactNode;
  containerClassName?: string;
};

function InputField({
  label,
  error,
  icon,
  id,
  className,
  containerClassName,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: InputFieldProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const describedBy =
    [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      <label htmlFor={inputId} className="text-lg font-normal text-foreground">
        {label}
      </label>

      <div className="relative">
        {icon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-s-2.5 top-1/2 flex -translate-y-1/2 items-center text-foreground [&_svg]:size-5"
          >
            <div className="border-l border-border pl-1">{icon}</div>
          </span>
        ) : null}

        <Input
          id={inputId}
          aria-describedby={describedBy}
          aria-invalid={error ? true : ariaInvalid}
          className={cn(icon && "rounded-sm ps-10", className)}
          {...props}
        />
      </div>

      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

export { Input, InputField };
export type { InputFieldProps };
