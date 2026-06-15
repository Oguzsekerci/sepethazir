import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SepetHazır",
  description:
    "Para harcamadan sahte sepet, sahte sipariş ve kurye takip deneyimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <div className="app-shell">
          <header className="topbar">
            <Link className="brand" href="/">
              <span className="brand-mark">SH</span>
              <span>SepetHazır</span>
            </Link>
            <nav className="nav" aria-label="Ana navigasyon">
              <Link href="/shop">Ürünler</Link>
              <Link href="/cart">Sepet</Link>
              <Link href="/orders">Siparişler</Link>
              <Link href="/tracking">Kurye</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
