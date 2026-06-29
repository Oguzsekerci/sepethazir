import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { statsSessionCookieName } from "@/lib/stats-auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(statsSessionCookieName);

  redirect("/stats");
}
