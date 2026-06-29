import fs from "node:fs";

const source = fs.readFileSync("data/products.ts", "utf8");
const productBlocks = source.match(/\{\n\s+id:[\s\S]*?\n\s+\}/g) ?? [];
const minimumCategorySize = 5;
const requiredFields = [
  "id",
  "name",
  "price",
  "oldPrice",
  "emoji",
  "image",
  "imageAlt",
  "blurb",
  "status",
  "meme",
  "rating",
  "reviewCount",
  "tags",
  "dopamineScore",
  "reasonToBuy",
  "query",
  "category",
];

const ids = [];
const categories = new Map();
const failures = [];

function getNumber(block, field) {
  const match = block.match(new RegExp(`\\b${field}:\\s*(\\d+(?:\\.\\d+)?)`));
  return match ? Number(match[1]) : null;
}

function getString(block, field) {
  const match = block.match(new RegExp(`\\b${field}:\\s*"([^"]*)"`));
  return match?.[1] ?? null;
}

for (const [index, block] of productBlocks.entries()) {
  const label = `product #${index + 1}`;
  const id = getNumber(block, "id");
  const category = getString(block, "category");
  const price = getNumber(block, "price");
  const oldPrice = getNumber(block, "oldPrice");
  const rating = getNumber(block, "rating");
  const dopamineScore = getNumber(block, "dopamineScore");

  for (const field of requiredFields) {
    if (!new RegExp(`\\b${field}:`).test(block)) {
      failures.push(`${label} is missing ${field}`);
    }
  }

  if (id === null) {
    failures.push(`${label} has no numeric id`);
  } else {
    ids.push(id);
  }

  if (!category) {
    failures.push(`${label} has no category`);
  } else {
    categories.set(category, (categories.get(category) ?? 0) + 1);
  }

  if (price !== null && oldPrice !== null && oldPrice <= price) {
    failures.push(`${label} oldPrice must be greater than price`);
  }

  if (rating !== null && (rating < 1 || rating > 5)) {
    failures.push(`${label} rating must be between 1 and 5`);
  }

  if (dopamineScore !== null && (dopamineScore < 0 || dopamineScore > 100)) {
    failures.push(`${label} dopamineScore must be between 0 and 100`);
  }
}

const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
for (const id of new Set(duplicateIds)) {
  failures.push(`duplicate product id: ${id}`);
}

const sortedIds = [...ids].sort((a, b) => a - b);
for (let index = 0; index < sortedIds.length; index += 1) {
  const expected = index + 1;
  if (sortedIds[index] !== expected) {
    failures.push(`product ids must be sequential; expected ${expected}`);
    break;
  }
}

for (const [category, count] of categories.entries()) {
  if (count < minimumCategorySize) {
    failures.push(
      `${category} category has ${count} products; minimum is ${minimumCategorySize}`
    );
  }
}

if (failures.length > 0) {
  console.error("Product validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Product validation passed: ${ids.length} products, ${categories.size} categories.`
);
