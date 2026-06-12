import type { Metadata } from "next";
import "./globals.css";

import Yekan from "@/fonts/yekan";
import { siteConfig } from "@/lib/site";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  title: {
    default: `${siteConfig.name} | مجله طلا`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | مجله طلا`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | مجله طلا`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${Yekan.variable} ${Yekan.className} relative flex flex-col items-center antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
