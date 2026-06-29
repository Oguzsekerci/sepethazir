const productionMode = process.argv.includes("--production");

const requiredProductionVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "STATS_ACCESS_KEY",
  "NEXT_PUBLIC_AMAZON_AFFILIATE_TAG",
  "NEXT_PUBLIC_AMAZON_LINK_ID",
];

const optionalLocalVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "STATS_ACCESS_KEY",
  "NEXT_PUBLIC_AMAZON_AFFILIATE_TAG",
  "NEXT_PUBLIC_AMAZON_LINK_ID",
];

function isPlaceholder(value) {
  return (
    !value ||
    value.includes("xxx") ||
    value.includes("SENIN") ||
    value.includes("CHANGE_ME")
  );
}

function report(name, required) {
  const value = process.env[name];
  const ok = !isPlaceholder(value);
  const status = ok ? "ok" : required ? "missing" : "not set";

  console.log(`${status.padEnd(8)} ${name}`);

  return ok || !required;
}

const vars = productionMode ? requiredProductionVars : optionalLocalVars;
let valid = true;

for (const name of vars) {
  const required = productionMode;
  valid = report(name, required) && valid;
}

if (!valid) {
  console.error(
    productionMode
      ? "Production env check failed."
      : "Local env check failed for required defaults."
  );
  process.exit(1);
}

console.log(
  productionMode
    ? "Production env check passed."
    : "Local env check passed. Supabase and stats envs may be omitted locally."
);
