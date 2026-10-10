import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/stats" },
  robots: { index: false, follow: false },
};

export default function StatsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
