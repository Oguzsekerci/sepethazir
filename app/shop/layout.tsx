import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/shop`,
  },
  description:
    "Sahte sepete atmalık teknoloji, ev, moda, bakım, outdoor ve absürt lüks ürünleri keşfet.",
  openGraph: {
    title: "Ürünler",
    description:
      "Sahte sepete atmalık teknoloji, ev, moda, bakım, outdoor ve absürt lüks ürünleri keşfet.",
    url: `${siteUrl}/shop`,
  },
  title: "Ürünler",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
