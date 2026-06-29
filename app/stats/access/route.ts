import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createStatsSessionToken,
  getStatsSessionMaxAge,
  isStatsKeyValid,
  statsSessionCookieName,
} from "@/lib/stats-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const key = String(formData.get("key") ?? "");

  if (!isStatsKeyValid(key)) {
    redirect("/stats?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(statsSessionCookieName, createStatsSessionToken(), {
    httpOnly: true,
    maxAge: getStatsSessionMaxAge(),
    path: "/stats",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/stats");
}
