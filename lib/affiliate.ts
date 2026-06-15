const amazonSearchUrl = "https://www.amazon.com.tr/s?k=";
const amazonAffiliateSuffix =
  process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_SUFFIX ?? "&tag=sepethazir-21";

export function buildAffiliateUrl(query: string) {
  return `${amazonSearchUrl}${encodeURIComponent(query)}${amazonAffiliateSuffix}`;
}

export function getAffiliateLabel() {
  return "Amazon TR";
}
