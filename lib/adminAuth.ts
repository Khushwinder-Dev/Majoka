import crypto from "crypto";
import { cookies } from "next/headers";

export const COOKIE_NAME = "admin_visitor_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecretKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "taj_al_rahmah_visitor_admin_fallback_secret_97800"
  );
}

export function getExpectedPassword(): string {
  return process.env.ADMIN_DASHBOARD_PASS || "khsh@97800";
}

export function verifyAdminPassword(inputPass: string): boolean {
  if (!inputPass) return false;
  const expected = getExpectedPassword();
  // Safe comparison
  if (inputPass.length !== expected.length) return false;
  return crypto.timingSafeEqual(
    Buffer.from(inputPass, "utf-8"),
    Buffer.from(expected, "utf-8")
  );
}

export function createSessionToken(): string {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + SESSION_DURATION_MS;
  const payload = `admin:${issuedAt}:${expiresAt}`;
  const secret = getSecretKey();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const combined = `${payload}:${signature}`;
  return Buffer.from(combined, "utf-8").toString("base64url");
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  try {
    const raw = Buffer.from(token, "base64url").toString("utf-8");
    const parts = raw.split(":");
    if (parts.length !== 4) return false;

    const [role, issuedAtStr, expiresAtStr, signature] = parts;
    if (role !== "admin") return false;

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return false;
    }

    const payload = `${role}:${issuedAtStr}:${expiresAtStr}`;
    const secret = getSecretKey();
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (signature.length !== expectedSignature.length) return false;
    return crypto.timingSafeEqual(
      Buffer.from(signature, "utf-8"),
      Buffer.from(expectedSignature, "utf-8")
    );
  } catch {
    return false;
  }
}

export async function checkAdminSessionFromCookies(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}
