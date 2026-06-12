import {
  ClockIcon,
  EyeIcon,
  UserIcon,
  HomeIcon,
  SearchIcon,
  UserSquareIcon,
  WarningIcon,
} from "@/components/icons";
import { InputField } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      سلام من یکان هستم
      <UserIcon width={40} className="text-tag" />
      <EyeIcon width={40} className="text-tag" />
      <ClockIcon width={40} className="text-tag" />
      <HomeIcon width={40} className="text-tag" />
      <SearchIcon width={40} className="text-tag" />
      <UserSquareIcon width={40} className="text-tag" />
      <WarningIcon width={40} className="text-destructive" />
      <InputField label="جستجو" icon={<SearchIcon />} placeholder="جستجو..." />
    </div>
  );
}
