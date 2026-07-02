import type { Metadata } from "next";
import { defaultAdSenseClientId } from "@/lib/adsense";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import Header from "./header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName,
    title: siteName,
    description: siteDescription,
    url: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${defaultAdSenseClientId}`}
        />
      </head>
      <body>
        <div className="app-shell">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
