const baseUrl = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";

const checks = [];

function addCheck(name, run) {
  checks.push({ name, run });
}

async function getText(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    redirect: "follow",
  });
  const text = await response.text();

  return { response, text };
}

async function postJson(path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const text = await response.text();

  return {
    response,
    text,
    json: text ? JSON.parse(text) : null,
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

addCheck("shop renders product catalog", async () => {
  const { response, text } = await getText("/shop");

  assert(response.ok, `/shop returned ${response.status}`);
  assert(text.includes("Ürünler"), "shop page title not found");
  assert(text.includes("Sepet"), "cart navigation not found");
});

addCheck("checkout renders anonymous delivery area", async () => {
  const { response, text } = await getText("/checkout");

  assert(response.ok, `/checkout returned ${response.status}`);
  assert(
    text.includes("Anonim teslimat bölgesi"),
    "anonymous delivery area not found"
  );
});

addCheck("stats renders locked or local stats screen", async () => {
  const { response, text } = await getText("/stats");

  assert(response.ok, `/stats returned ${response.status}`);
  assert(
    text.includes("Stats erişimi kapalı") || text.includes("<h1>Stats</h1>"),
    "stats screen not found"
  );
});

addCheck("out blocks unsafe target", async () => {
  const target = encodeURIComponent("https://evil.example/");
  const { response, text } = await getText(
    `/out?target=${target}&productId=1&productName=Test&category=Teknoloji&source=smoke`
  );

  assert(response.ok, `/out unsafe target returned ${response.status}`);
  assert(text.includes("Link doğrulanamadı"), "unsafe outbound link was not blocked");
});

addCheck("order API rejects empty payload", async () => {
  const { response } = await postJson("/api/orders", {});

  assert(response.status === 400, `empty order payload returned ${response.status}`);
});

addCheck("affiliate API rejects empty payload", async () => {
  const { response } = await postJson("/api/affiliate-clicks", {});

  assert(
    response.status === 400,
    `empty affiliate payload returned ${response.status}`
  );
});

addCheck("order API accepts valid payload when remote sync is disabled", async () => {
  const { response, json } = await postJson("/api/orders", {
    fantasyNote: "smoke",
    order: {
      id: "SH-SMOKE",
      items: [
        {
          id: 1,
          name: "Smoke Ürün",
          price: 100,
          oldPrice: 150,
          emoji: "T",
          query: "smoke",
          category: "Teknoloji",
          qty: 1,
        },
      ],
      subtotal: 100,
      discount: 8,
      shipping: 39,
      total: 131,
      address: "İstanbul / Kadıköy civarı",
      status: "courier",
      createdAt: "2026-06-29T08:00:00.000Z",
      courier: {
        name: "Smoke Kurye",
        vehicle: "Motor",
        plate: "34 SMK",
        etaMinutes: 10,
      },
    },
  });

  assert(response.ok, `valid order payload returned ${response.status}`);
  assert(
    json.status === "disabled" || json.status === "synced",
    `unexpected order sync status: ${json.status}`
  );
});

addCheck("affiliate API accepts valid Amazon target", async () => {
  const { response, json } = await postJson("/api/affiliate-clicks", {
    click: {
      id: "CLK-SMOKE",
      productId: 1,
      productName: "Smoke Ürün",
      category: "Teknoloji",
      href: "https://www.amazon.com.tr/s?k=smoke",
      source: "smoke",
      createdAt: "2026-06-29T08:00:00.000Z",
    },
  });

  assert(response.ok, `valid affiliate payload returned ${response.status}`);
  assert(
    json.status === "disabled" || json.status === "synced",
    `unexpected affiliate sync status: ${json.status}`
  );
});

addCheck("security headers are present", async () => {
  const response = await fetch(`${baseUrl}/shop`, { method: "HEAD" });

  assert(response.ok, `HEAD /shop returned ${response.status}`);
  assert(
    response.headers.has("content-security-policy"),
    "content-security-policy header missing"
  );
  assert(
    response.headers.has("strict-transport-security"),
    "strict-transport-security header missing"
  );
  assert(!response.headers.has("x-powered-by"), "x-powered-by header is exposed");
});

addCheck("health endpoint reports product count", async () => {
  const response = await fetch(`${baseUrl}/api/health`, {
    cache: "no-store",
  });
  const json = await response.json();

  assert(response.ok, `/api/health returned ${response.status}`);
  assert(json.ok === true, "health endpoint did not report ok");
  assert(json.productCount === 60, `unexpected product count: ${json.productCount}`);
});

let failures = 0;

for (const check of checks) {
  try {
    await check.run();
    console.log(`✓ ${check.name}`);
  } catch (error) {
    failures += 1;
    console.error(`✗ ${check.name}`);
    console.error(error instanceof Error ? error.message : error);
  }
}

if (failures > 0) {
  console.error(`${failures} smoke check(s) failed against ${baseUrl}`);
  process.exit(1);
}

console.log(`All ${checks.length} smoke checks passed against ${baseUrl}`);
