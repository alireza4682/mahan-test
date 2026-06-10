import { SVGProps } from "react";

export function HomeIcon({
  strokeWidth = 1.5,
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
        d="M1.66602 8.33334L9.25568 2.34153C9.46743 2.1743 9.72943 2.08334 9.99935 2.08334C10.2693 2.08334 10.5313 2.1743 10.743 2.34153L13.7493 4.71492V3.33334C13.7493 2.87311 14.1224 2.50001 14.5827 2.50001H15.416C15.8763 2.50001 16.2493 2.8731 16.2493 3.33334V6.68861L18.3327 8.33334"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6673 9.58334V12.9167C16.6673 15.2737 16.6673 16.4522 15.9351 17.1844C15.2028 17.9167 14.0243 17.9167 11.6673 17.9167H8.33398C5.97696 17.9167 4.79845 17.9167 4.06622 17.1844C3.33398 16.4522 3.33398 15.2737 3.33398 12.9167V9.58334"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 12.9167C11.8337 13.4353 10.9585 13.75 10 13.75C9.0415 13.75 8.16627 13.4353 7.5 12.9167"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
