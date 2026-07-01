import { createHash, createHmac } from "crypto";
import { existsSync, readFileSync } from "fs";

const endpoint = "webservices.amazon.com.tr";
const region = "eu-west-1";
const service = "ProductAdvertisingAPI";
const requestPath = "/paapi5/searchitems";
const target = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems";

const requiredEnv = [
  "AMAZON_PAAPI_ACCESS_KEY",
  "AMAZON_PAAPI_SECRET_KEY",
  "AMAZON_PAAPI_PARTNER_TAG",
];
const prioritySearches = [
  { id: 5, keyword: "kahve makinesi" },
  { id: 6, keyword: "deri sırt çantası" },
  { id: 3, keyword: "mekanik klavye" },
  { id: 2, keyword: "spor ayakkabı" },
  { id: 1, keyword: "kablosuz kulaklık" },
  { id: 41, keyword: "kahve terazisi" },
  { id: 40, keyword: "kumandalı led şerit ışık" },
  { id: 22, keyword: "oyuncu koltuğu" },
  { id: 20, keyword: "usb c hub dock" },
  { id: 45, keyword: "alüminyum laptop standı" },
];

function loadEnvFile(file) {
  if (!existsSync(file)) {
    return;
  }

  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const name = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    if (name && process.env[name] === undefined) {
      process.env[name] = value;
    }
  }
}

function getEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

function hmac(key, value, encoding) {
  return createHmac("sha256", key).update(value).digest(encoding);
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function getSignatureKey(secretKey, dateStamp) {
  const dateKey = hmac(`AWS4${secretKey}`, dateStamp);
  const regionKey = hmac(dateKey, region);
  const serviceKey = hmac(regionKey, service);

  return hmac(serviceKey, "aws4_request");
}

function toAmzDate(date) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, "");
}

function normalizeWhitespace(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function getOptionValue(args, optionName, fallback) {
  const optionIndex = args.indexOf(optionName);

  if (optionIndex === -1) {
    return fallback;
  }

  return args[optionIndex + 1] ?? fallback;
}

function getKeywordArgs(args) {
  const keywordArgs = [];

  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--count") {
      index += 1;
      continue;
    }

    keywordArgs.push(args[index]);
  }

  return keywordArgs;
}

async function searchAmazon(keyword, itemCount = 5) {
  const accessKey = getEnv("AMAZON_PAAPI_ACCESS_KEY");
  const secretKey = getEnv("AMAZON_PAAPI_SECRET_KEY");
  const partnerTag = getEnv("AMAZON_PAAPI_PARTNER_TAG");
  const now = new Date();
  const amzDate = toAmzDate(now);
  const dateStamp = amzDate.slice(0, 8);
  const payload = JSON.stringify({
    ItemCount: itemCount,
    Keywords: keyword,
    Marketplace: "www.amazon.com.tr",
    PartnerTag: partnerTag,
    PartnerType: "Associates",
    Resources: [
      "Images.Primary.Medium",
      "ItemInfo.Title",
      "Offers.Listings.Price",
    ],
    SearchIndex: "All",
  });

  const headers = {
    "content-encoding": "amz-1.0",
    "content-type": "application/json; charset=utf-8",
    host: endpoint,
    "x-amz-date": amzDate,
    "x-amz-target": target,
  };
  const signedHeaders = Object.keys(headers).sort().join(";");
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map((name) => `${name}:${headers[name]}\n`)
    .join("");
  const canonicalRequest = [
    "POST",
    requestPath,
    "",
    canonicalHeaders,
    signedHeaders,
    hash(payload),
  ].join("\n");
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    hash(canonicalRequest),
  ].join("\n");
  const signature = hmac(
    getSignatureKey(secretKey, dateStamp),
    stringToSign,
    "hex"
  );
  const authorization = [
    `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}`,
    `SignedHeaders=${signedHeaders}`,
    `Signature=${signature}`,
  ].join(", ");

  const response = await fetch(`https://${endpoint}${requestPath}`, {
    body: payload,
    headers: {
      ...headers,
      authorization,
    },
    method: "POST",
  });
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Amazon PA-API ${response.status}: ${text}`);
  }

  return JSON.parse(text);
}

loadEnvFile(".env.local");
loadEnvFile(".env");

for (const name of requiredEnv) {
  if (!process.env[name]) {
    console.error(`${name} is missing`);
  }
}

if (requiredEnv.some((name) => !process.env[name])) {
  process.exit(1);
}

const args = process.argv.slice(2);
const count = Number.parseInt(getOptionValue(args, "--count", "3"), 10);

if (args.includes("--batch")) {
  for (const search of prioritySearches) {
    const data = await searchAmazon(search.keyword, count);
    const items = data.SearchResult?.Items ?? [];

    console.log(`\n# productId=${search.id}\tquery=${search.keyword}`);

    if (items.length === 0) {
      console.log("No items found");
      continue;
    }

    for (const item of items) {
      const title = normalizeWhitespace(
        item.ItemInfo?.Title?.DisplayValue ?? "-"
      );
      const price = item.Offers?.Listings?.[0]?.Price?.DisplayAmount ?? "-";

      console.log(`${item.ASIN}\t${price}\t${title}`);
      console.log(item.DetailPageURL);
    }
  }

  process.exit(0);
}

const keyword = getKeywordArgs(args).join(" ").trim();

if (!keyword) {
  console.error(
    "Usage: node scripts/amazon-paapi-search.mjs <keyword> [--count 3]"
  );
  console.error("   or: node scripts/amazon-paapi-search.mjs --batch");
  process.exit(1);
}

const data = await searchAmazon(keyword, count);
const items = data.SearchResult?.Items ?? [];

if (items.length === 0) {
  console.log("No items found");
  process.exit(0);
}

for (const item of items) {
  const title = normalizeWhitespace(item.ItemInfo?.Title?.DisplayValue ?? "-");
  const price = item.Offers?.Listings?.[0]?.Price?.DisplayAmount ?? "-";

  console.log(`${item.ASIN}\t${price}\t${title}`);
  console.log(item.DetailPageURL);
}
