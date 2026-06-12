import { SVGProps } from "react";

export function SearchIcon({ strokeWidth = 1, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.916 12.9167L14.166 14.1667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5271 16.2711C14.0457 15.7896 14.0457 15.0091 14.5271 14.5278C15.0084 14.0464 15.7889 14.0464 16.2703 14.5278L17.9716 16.2291C18.453 16.7105 18.453 17.491 17.9716 17.9723C17.4902 18.4537 16.7097 18.4537 16.2283 17.9723L14.5271 16.2711Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1667 8.33333C14.1667 5.11168 11.555 2.5 8.33333 2.5C5.11168 2.5 2.5 5.11168 2.5 8.33333C2.5 11.555 5.11168 14.1667 8.33333 14.1667C11.555 14.1667 14.1667 11.555 14.1667 8.33333Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
