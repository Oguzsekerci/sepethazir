import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/orders" },
  robots: { index: false, follow: false },
};

export default function OrdersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
