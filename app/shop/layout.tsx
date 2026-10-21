import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/shop`,
  },
  description:
    "Alışveriş kararlarını düşünmek için kurgusal ürün kartları ve bütçe örnekleri içeren SepetHazır mağazası.",
  openGraph: {
    title: "Mağaza | SepetHazır",
    description:
      "Kurgusal ürün kartlarıyla alışveriş kararlarını ve bütçe etkisini düşünün. Gerçek ürün satışı veya ödeme yapılmaz.",
    url: `${siteUrl}/shop`,
  },
  robots: {
    index: false,
    follow: true,
  },
  title: "Mağaza | SepetHazır",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
