import type { ReactNode } from "react";

import { WarningIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type FieldErrorProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function FieldError({ children, id, className }: FieldErrorProps) {
  return (
    <p
      id={id}
      role="alert"
      className={cn("flex items-center gap-1.5 text-sm text-destructive", className)}
    >
      <WarningIcon aria-hidden="true" className="size-4 shrink-0 -translate-y-px" />
      <span className="leading-4">{children}</span>
    </p>
  );
}
