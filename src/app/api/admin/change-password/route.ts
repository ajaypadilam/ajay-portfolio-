import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import portfolioData from "@/lib/portfolio-data.json";
import { getExpectedPassword } from "../save/route";

const GITHUB_REPO = process.env.GITHUB_REPO || "ajaypadilam/ajay-portfolio-";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentPassword, newPassword, githubToken: clientToken } = body;

    const expectedPassword = getExpectedPassword();

    if (!currentPassword || currentPassword !== expectedPassword) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    if (!newPassword || newPassword.trim().length < 4) {
      return NextResponse.json(
        { error: "New password must be at least 4 characters long" },
        { status: 400 }
      );
    }

    // Read current data
    let currentData = { ...portfolioData };
    try {
      const filePath = path.join(process.cwd(), "src/lib/portfolio-data.json");
      if (fs.existsSync(filePath)) {
        currentData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      }
    } catch (e) {
      // fallback to imported
    }

    // Update settings
    currentData.settings = {
      ...(currentData.settings || {}),
      adminPassword: newPassword.trim(),
    };

    const formattedJson = JSON.stringify(currentData, null, 2);
    const token = clientToken || process.env.GITHUB_TOKEN;

    // 1. Write locally
    let localSaved = false;
    try {
      const filePath = path.join(process.cwd(), "src/lib/portfolio-data.json");
      fs.writeFileSync(filePath, formattedJson, "utf8");
      localSaved = true;
    } catch (fsErr) {
      console.warn("Local filesystem write failed:", fsErr);
    }

    // 2. Commit to GitHub if token exists
    let githubSaved = false;
    let githubError: string | null = null;

    if (token) {
      try {
        const branches = ["main", "dev"];
        for (const branch of branches) {
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
              message: "chore: update admin password",
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
      message: githubSaved
        ? "Password changed and deployed live to GitHub & Vercel!"
        : "Password updated locally. Remember to commit or connect GitHub token for live deployment.",
      githubSaved,
      githubError,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to change password" },
      { status: 500 }
    );
  }
}
