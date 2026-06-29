import { NextResponse } from "next/server";
import { products } from "@/data/products";

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      productCount: products.length,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
