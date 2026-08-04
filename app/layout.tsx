import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
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
      <body>
        <div className="app-shell">
          <Header />
          {children}
          <footer className="site-footer">
            <span>© 2026 SepetHazır</span>
            <nav aria-label="Yasal bağlantılar">
              <Link href="/privacy">Gizlilik Politikası</Link>
              <Link href="/cookies">Çerez Politikası</Link>
              <Link href="/contact">İletişim</Link>
            </nav>
          </footer>
        </div>
        <Script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7130753532276336"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
