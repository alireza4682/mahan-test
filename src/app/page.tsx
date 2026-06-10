import {
  ClockIcon,
  EyeIcon,
  UserIcon,
  HomeIcon,
  SearchIcon,
  UserSquareIcon,
} from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      سلام من یکان هستم
      <UserIcon width={40} className="text-icon" />
      <EyeIcon width={40} className="text-icon" />
      <ClockIcon width={40} className="text-icon" />
      <HomeIcon width={40} className="text-icon" />
      <SearchIcon width={40} className="text-icon" />
      <UserSquareIcon width={40} className="text-icon" />
    </div>
  );
}
