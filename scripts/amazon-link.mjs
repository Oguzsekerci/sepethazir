const defaultAmazonTag = "sepethazir-21";
const asinPattern = /^[A-Z0-9]{10}$/i;

function getAmazonTag() {
  return process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG ?? defaultAmazonTag;
}

function extractAsin(value) {
  const trimmed = value.trim();

  if (asinPattern.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  try {
    const url = new URL(trimmed);
    const match = url.pathname.match(
      /\/(?:dp|gp\/product|exec\/obidos\/ASIN)\/([A-Z0-9]{10})(?:[/?]|$)/i
    );

    return match?.[1]?.toUpperCase();
  } catch {
    return undefined;
  }
}

const inputs = process.argv.slice(2);

if (inputs.length === 0) {
  console.error("Usage: node scripts/amazon-link.mjs <amazon-url-or-asin> [...]");
  process.exit(1);
}

for (const input of inputs) {
  const asin = extractAsin(input);

  if (!asin) {
    console.error(`Could not extract ASIN: ${input}`);
    process.exitCode = 1;
    continue;
  }

  const params = new URLSearchParams({
    tag: getAmazonTag(),
  });

  console.log(`https://www.amazon.com.tr/dp/${asin}?${params.toString()}`);
}
