import { SVGProps } from "react";

export function UserIcon({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.9173 8.74992C12.9173 7.13909 11.6115 5.83325 10.0007 5.83325C8.38982 5.83325 7.08398 7.13909 7.08398 8.74992C7.08398 10.3608 8.38982 11.6666 10.0007 11.6666C11.6115 11.6666 12.9173 10.3608 12.9173 8.74992Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3327 10.0001C18.3327 5.39771 14.6017 1.66675 9.99935 1.66675C5.39697 1.66675 1.66602 5.39771 1.66602 10.0001C1.66602 14.6024 5.39697 18.3334 9.99935 18.3334C14.6017 18.3334 18.3327 14.6024 18.3327 10.0001Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 16.6667C15 13.9053 12.7614 11.6667 10 11.6667C7.23857 11.6667 5 13.9053 5 16.6667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
