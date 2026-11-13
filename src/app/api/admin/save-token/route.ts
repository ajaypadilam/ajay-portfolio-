import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import portfolioData from "@/lib/portfolio-data.json";
import { getExpectedPassword } from "../save/route";
import { encryptToken } from "@/lib/crypto";

const GITHUB_REPO = process.env.GITHUB_REPO || "ajaypadilam/ajay-portfolio-";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, token } = body;

    const expectedPassword = getExpectedPassword();

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Invalid admin password" },
        { status: 401 }
      );
    }

    if (!token || !token.trim().startsWith("ghp_")) {
      return NextResponse.json(
        { error: "Invalid GitHub token. It should start with ghp_" },
        { status: 400 }
      );
    }

    const cleanToken = token.trim();
    const encrypted = encryptToken(cleanToken, expectedPassword);

    // Read current data
    let currentData: any = { ...portfolioData };
    try {
      const filePath = path.join(process.cwd(), "src/lib/portfolio-data.json");
      if (fs.existsSync(filePath)) {
        currentData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      }
    } catch (e) {
      // fallback
    }

    currentData.settings = {
      ...(currentData.settings || {}),
      encryptedGithubToken: encrypted,
    };

    const formattedJson = JSON.stringify(currentData, null, 2);

    // 1. Write locally
    try {
      const filePath = path.join(process.cwd(), "src/lib/portfolio-data.json");
      fs.writeFileSync(filePath, formattedJson, "utf8");
    } catch (fsErr) {
      console.warn("Local filesystem write skipped:", fsErr);
    }

    // 2. Commit directly to GitHub using this token
    let githubSaved = false;
    let githubError: string | null = null;

    try {
      const branches = ["main", "dev"];
      for (const branch of branches) {
        const getUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/src/lib/portfolio-data.json?ref=${branch}`;
        const getRes = await fetch(getUrl, {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
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
            Authorization: `Bearer ${cleanToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "portfolio-admin",
          },
          body: JSON.stringify({
            message: "chore: permanently link GitHub token in settings",
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

    if (!githubSaved && githubError) {
      return NextResponse.json(
        { error: `Could not verify token with GitHub: ${githubError}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "🎉 Token permanently saved! It will now work across all computers, phones, and incognito windows.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to save token" },
      { status: 500 }
    );
  }
}
