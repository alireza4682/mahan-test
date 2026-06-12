"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { DirectionProvider } from "@/components/ui/direction";
import { getQueryClient } from "@/lib/react-query/get-query-client";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DirectionProvider direction="rtl">{children}</DirectionProvider>
    </QueryClientProvider>
  );
}
