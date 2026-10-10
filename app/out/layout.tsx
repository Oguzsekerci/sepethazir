import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/out" },
  robots: { index: false, follow: false },
};

export default function OutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
