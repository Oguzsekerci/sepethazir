import type { Metadata } from "next";
import Link from "next/link";
import { siteAuthorName, siteAuthorUrl, siteDescription, siteName, siteUrl } from "@/lib/site";
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
  authors: [{ name: siteAuthorName, url: siteAuthorUrl }],
  creator: siteAuthorName,
  publisher: siteName,
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
              <Link href="/hakkimizda">Hakkımızda</Link>
              <Link href="/yazar/oguz-sekerci">Yazar</Link>
              <Link href="/yayin-ilkeleri">Yayın İlkeleri</Link>
              <Link href="/privacy">Gizlilik Politikası</Link>
              <Link href="/cookies">Çerez Politikası</Link>
              <Link href="/contact">İletişim</Link>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
