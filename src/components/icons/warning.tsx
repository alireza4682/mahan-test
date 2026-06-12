import { SVGProps } from "react";

export function WarningIcon({ strokeWidth = 1, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.28263 14H6.71623C3.62927 14 2.0858 14 1.51701 12.9959C0.948213 11.9919 1.73767 10.6609 3.31659 7.999L4.59981 5.83555C6.11649 3.27852 6.87483 2 7.99943 2C9.12403 2 9.88237 3.27851 11.399 5.83555L12.6823 7.999C14.2612 10.6609 15.0506 11.9919 14.4818 12.9959C13.913 14 12.3696 14 9.28263 14Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 6V9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8 11.3281V11.3348"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
