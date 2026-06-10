import { SVGProps } from "react";

export function UserSquareIcon({
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
        d="M9.58407 2.08334L10.4174 2.08335C13.9529 2.08339 15.7207 2.08341 16.819 3.18176C17.9173 4.2801 17.9173 6.04785 17.9173 9.58334V10.4168C17.9173 13.9523 17.9173 15.7201 16.819 16.8184C15.7207 17.9168 13.9528 17.9168 10.4173 17.9168H9.58398C6.04845 17.9168 4.28068 17.9168 3.18233 16.8184C2.08398 15.7201 2.08398 13.9523 2.08398 10.4168V9.58334C2.08398 6.04778 2.08398 4.27999 3.18235 3.18164C4.28071 2.08329 6.04849 2.0833 9.58407 2.08334Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0007 6.16217C11.6115 6.16217 12.9173 7.468 12.9173 9.07882C12.9173 10.6897 11.6115 11.9955 10.0007 11.9955C8.38983 11.9955 7.08398 10.6897 7.08398 9.07882C7.08398 7.468 8.38983 6.16217 10.0007 6.16217Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8193 17.4122C15.6056 14.385 13.0822 11.9955 10.0006 11.9955C6.919 11.9955 4.39553 14.385 4.18188 17.4122"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
