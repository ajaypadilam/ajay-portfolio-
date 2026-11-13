import { NextResponse } from "next/server";
import portfolioData from "@/lib/portfolio-data.json";

export async function GET() {
  const hasServerToken = Boolean(process.env.GITHUB_TOKEN);

  return NextResponse.json(
    {
      ...portfolioData,
      hasServerToken,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
