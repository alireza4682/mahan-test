import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-zinc-50 dark:bg-black">
      <Link href="/blog" className={buttonVariants({ size: "lg" })}>
        مشاهده مجله
      </Link>
    </main>
  );
}
