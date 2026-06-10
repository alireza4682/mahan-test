import { UserIcon } from "@/components/icons/person";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      سلام من یکان هستم
      <UserIcon width={40} className="text-icon" />
    </div>
  );
}
