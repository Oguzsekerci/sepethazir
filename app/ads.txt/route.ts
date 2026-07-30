export function GET() {
  // No Google-served ads are currently published. Do not claim an authorized
  // AdSense seller until advertising is deliberately reintroduced.
  return new Response("", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
