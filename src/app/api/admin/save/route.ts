import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ajay1234";
const GITHUB_REPO = process.env.GITHUB_REPO || "ajaypadilam/ajay-portfolio-";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, data, githubToken: clientToken } = body;

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
    const token = clientToken || process.env.GITHUB_TOKEN;

    // 1. Try local filesystem write (works in local development)
    let localSaved = false;
    try {
      const filePath = path.join(process.cwd(), "src/lib/portfolio-data.json");
      fs.writeFileSync(filePath, formattedJson, "utf8");
      localSaved = true;
    } catch (fsErr) {
      console.warn("Local filesystem write skipped/failed:", fsErr);
    }

    // 2. If token is present, commit directly to GitHub repository (works on Vercel production)
    let githubSaved = false;
    let githubError: string | null = null;

    if (token) {
      try {
        const branches = ["main", "dev"];
        for (const branch of branches) {
          // Fetch current file SHA
          const getUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/src/lib/portfolio-data.json?ref=${branch}`;
          const getRes = await fetch(getUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
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
              Authorization: `Bearer ${token}`,
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

    let message = "";
    if (githubSaved) {
      message = "🎉 Successfully saved & committed to GitHub! Vercel is currently deploying your updates live (ready in ~1 minute).";
    } else if (localSaved && !token) {
      message = "Saved locally on your machine. To deploy to your live website, enter your GitHub Token in Admin Settings.";
    } else if (githubError) {
      message = `GitHub Commit Error: ${githubError}`;
    } else {
      message = "⚠️ Could not commit to GitHub. Please provide a GitHub Personal Access Token to enable live Vercel deployments.";
    }

    return NextResponse.json({
      success: githubSaved || localSaved,
      localSaved,
      githubSaved,
      githubError,
      message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
