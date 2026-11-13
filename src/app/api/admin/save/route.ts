import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ajay1234";
const GITHUB_REPO = process.env.GITHUB_REPO || "ajaypadilam/ajay-portfolio-";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, data } = body;

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid admin password" },
        { status: 401 }
      );
    }

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid data payload" },
        { status: 400 }
      );
    }

    const formattedJson = JSON.stringify(data, null, 2);

    // 1. Try local filesystem write (for local development)
    let localSaved = false;
    try {
      const filePath = path.join(process.cwd(), "src/lib/portfolio-data.json");
      fs.writeFileSync(filePath, formattedJson, "utf8");
      localSaved = true;
    } catch (fsErr) {
      console.warn("Local filesystem write skipped/failed:", fsErr);
    }

    // 2. If GITHUB_TOKEN is present, commit directly to GitHub repository (works in Vercel production)
    let githubSaved = false;
    let githubError: string | null = null;

    if (GITHUB_TOKEN) {
      try {
        const branches = ["main", "dev"];
        for (const branch of branches) {
          // Fetch current file SHA
          const getUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/src/lib/portfolio-data.json?ref=${branch}`;
          const getRes = await fetch(getUrl, {
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "portfolio-admin",
            },
          });

          let sha: string | undefined;
          if (getRes.ok) {
            const fileData = await getRes.json();
            sha = fileData.sha;
          }

          // Commit updated file
          const putUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/src/lib/portfolio-data.json`;
          const putRes = await fetch(putUrl, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
              "User-Agent": "portfolio-admin",
            },
            body: JSON.stringify({
              message: "chore: update portfolio-data.json via admin panel",
              content: Buffer.from(formattedJson).toString("base64"),
              sha,
              branch,
            }),
          });

          if (putRes.ok) {
            githubSaved = true;
          } else {
            const errData = await putRes.json();
            githubError = errData.message || "Failed to commit to GitHub";
          }
        }
      } catch (ghErr: any) {
        githubError = ghErr?.message || "GitHub API error";
      }
    }

    return NextResponse.json({
      success: true,
      localSaved,
      githubSaved,
      githubError,
      message: githubSaved
        ? "Successfully saved & committed to GitHub! Vercel is deploying your updates live."
        : localSaved
        ? "Saved locally to portfolio-data.json."
        : "Data updated.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
