import localFont from "next/font/local";

const Yekan = localFont({
  src: [
    {
      path: "./files/YekanBakh-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./files/YekanBakh-Hairline.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./files/YekanBakh-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./files/YekanBakh-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./files/YekanBakh-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./files/YekanBakh-Heavy.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./files/YekanBakh-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./files/YekanBakh-Fat.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  preload: false,
  variable: "--font-yekan",
});

export default Yekan;
