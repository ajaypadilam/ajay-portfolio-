import { NextResponse } from "next/server";
import portfolioData from "@/lib/portfolio-data.json";

export async function GET() {
  return NextResponse.json(portfolioData, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
