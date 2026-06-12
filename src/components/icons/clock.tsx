import { SVGProps } from "react";

export function ClockIcon({
  strokeWidth = 1,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.99959 18.3337C14.602 18.3337 18.3329 14.6027 18.3329 10.0003C18.3329 5.39795 14.602 1.66699 9.99959 1.66699C5.39722 1.66699 1.66626 5.39795 1.66626 10.0003C1.66626 14.6027 5.39722 18.3337 9.99959 18.3337Z"
        stroke="currentColor"
      />
      <path
        d="M7.91687 7.91699L10.8335 10.8333M13.3335 6.66699L9.16687 10.8337"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
