import AdSenseScript from "../adsense-script";

export default function GuideLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdSenseScript />
      {children}
    </>
  );
}
