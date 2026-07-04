import { getSecurityTxt, securityTxtHeaders } from "@/lib/security-txt";

export function GET() {
  return new Response(getSecurityTxt(), {
    headers: securityTxtHeaders,
  });
}
