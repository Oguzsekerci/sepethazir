import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/tracking" },
  robots: { index: false, follow: false },
};

export default function TrackingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
