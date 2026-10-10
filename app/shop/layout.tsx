import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/shop`,
  },
  description:
    "Kurgusal ürün senaryolarıyla alışveriş dürtüsünü ve bütçe etkisini ödeme yapmadan değerlendirin.",
  openGraph: {
    title: "Ürünler",
    description:
      "Kurgusal ürün senaryolarıyla alışveriş dürtüsünü ve bütçe etkisini ödeme yapmadan değerlendirin.",
    url: `${siteUrl}/shop`,
  },
  robots: {
    index: false,
    follow: true,
  },
  title: "Ürünler",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
