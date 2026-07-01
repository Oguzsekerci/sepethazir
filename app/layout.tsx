import type { Metadata } from "next";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import AdSenseScript from "./adsense";
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
      <body>
        <div className="app-shell">
          <Header />
          {children}
        </div>
        <AdSenseScript />
      </body>
    </html>
  );
}
