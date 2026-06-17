type TrackableAffiliateProduct = {
  id: number;
  name: string;
  category: string;
  query: string;
  affiliateUrl?: string;
};

const defaultAmazonTag = "sepethazir-21";
const defaultAmazonLinkId = "17183d8abbb6f1a60f791b706e1756a1";

function getAmazonTag() {
  const explicitTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG;

  if (explicitTag) {
    return explicitTag;
  }

  const suffix = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_SUFFIX;

  if (!suffix) {
    return defaultAmazonTag;
  }

  const params = new URLSearchParams(suffix.replace(/^[?&]/, ""));

  return params.get("tag") ?? defaultAmazonTag;
}

export function buildAffiliateUrl(query: string, affiliateUrl?: string) {
  if (affiliateUrl) {
    return affiliateUrl;
  }

  if (query.startsWith("http://") || query.startsWith("https://")) {
    return query;
  }

  const params = new URLSearchParams({
    k: query,
    linkCode: "ll2",
    tag: getAmazonTag(),
    linkId:
      process.env.NEXT_PUBLIC_AMAZON_LINK_ID ?? defaultAmazonLinkId,
    ref_: "as_li_ss_tl",
  });

  return `https://www.amazon.com.tr/s?${params.toString()}`;
}

export function buildTrackedAffiliateUrl(
  product: TrackableAffiliateProduct,
  source: string
) {
  const target = buildAffiliateUrl(product.query, product.affiliateUrl);
  const params = new URLSearchParams({
    target,
    productId: String(product.id),
    productName: product.name,
    category: product.category,
    source,
  });

  return `/out?${params.toString()}`;
}

export function getAffiliateLabel() {
  return "Amazon TR";
}
