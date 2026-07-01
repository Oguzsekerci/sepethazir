export function GET() {
  const accountId = process.env.ADSENSE_ACCOUNT_ID;
  const body = accountId
    ? `google.com, ${accountId}, DIRECT, f08c47fec0942fa0\n`
    : "";

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
