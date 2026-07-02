import Script from "next/script";
import { defaultAdSenseClientId } from "@/lib/adsense";

export default function AdSenseScript() {
  const clientId =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? defaultAdSenseClientId;

  if (!clientId) {
    return null;
  }

  return (
    <Script
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      strategy="afterInteractive"
    />
  );
}
