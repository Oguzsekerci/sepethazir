import { securityContactEmail, siteUrl } from "@/lib/site";

export function getSecurityTxt() {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  return [
    `Contact: mailto:${securityContactEmail}`,
    `Expires: ${expires.toISOString()}`,
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    "Preferred-Languages: tr, en",
    "",
  ].join("\n");
}

export const securityTxtHeaders = {
  "content-type": "text/plain; charset=utf-8",
  "cache-control": "public, max-age=3600",
};
