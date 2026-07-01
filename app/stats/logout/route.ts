import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { statsSessionCookieName } from "@/lib/stats-auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(statsSessionCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/stats",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/stats");
}
