import { createHmac, timingSafeEqual } from "crypto";

export const statsSessionCookieName = "sepethazir_stats_session";

const sessionMaxAgeSeconds = 60 * 60 * 12;

function getConfiguredStatsKey() {
  return process.env.STATS_ACCESS_KEY;
}

function getSigningSecret() {
  return getConfiguredStatsKey() ?? "sepethazir-local-stats";
}

function sign(value: string) {
  return createHmac("sha256", getSigningSecret()).update(value).digest("hex");
}

function signaturesMatch(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function isStatsKeyValid(key: string) {
  const configuredKey = getConfiguredStatsKey();

  if (!configuredKey) {
    return process.env.NODE_ENV !== "production";
  }

  return key === configuredKey;
}

export function createStatsSessionToken() {
  const expiresAt = Date.now() + sessionMaxAgeSeconds * 1000;
  const payload = String(expiresAt);

  return `${payload}.${sign(payload)}`;
}

export function isStatsSessionValid(token?: string) {
  const configuredKey = getConfiguredStatsKey();

  if (!configuredKey) {
    return process.env.NODE_ENV !== "production";
  }

  if (!token) {
    return false;
  }

  const [expiresAt, signature] = token.split(".");
  const expiresAtMs = Number(expiresAt);

  if (!expiresAt || !signature || !Number.isFinite(expiresAtMs)) {
    return false;
  }

  if (expiresAtMs < Date.now()) {
    return false;
  }

  return signaturesMatch(signature, sign(expiresAt));
}

export function getStatsSessionMaxAge() {
  return sessionMaxAgeSeconds;
}
