/**
 * Netlify Function: admin-save
 *
 * Handles two actions from the admin page:
 *   { action: "auth", password }        → verify password, return 200 or 401
 *   { action: "save", password, content } → verify password, commit site.json
 *
 * Required Netlify environment variables (set in her Netlify dashboard):
 *   ADMIN_PASSWORD        — the admin password Harshika uses
 *   GITHUB_APP_ID         — GitHub App ID (from the App settings page)
 *   GITHUB_PRIVATE_KEY    — GitHub App private key PEM (base64-encoded)
 *   GITHUB_INSTALLATION_ID— Installation ID for the repo
 *   GITHUB_OWNER          — GitHub username / org (e.g. "harshikajain")
 *   GITHUB_REPO           — Repo name (e.g. "redefinemindhealth-site")
 *   CONTENT_FILE_PATH     — path in repo (e.g. "public/content/site.json")
 */

import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { action, password, content } = body;

  // 1. Verify password (constant-time comparison not available without crypto,
  //    but for a static-site admin this is sufficient — token is never in the browser).
  // Fallback password for dev/staging. Override with ADMIN_PASSWORD env var in Netlify before go-live.
  const validPassword = process.env.ADMIN_PASSWORD ?? "rmh@admin2024";
  if (!password || password !== validPassword) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  // Auth-only check (login step)
  if (action === "auth") {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  // Save action
  if (action !== "save") {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Unknown action" }) };
  }

  if (!content) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing content" }) };
  }

  try {
    // Decode the base64-encoded private key stored in env
    const privateKey = Buffer.from(
      process.env.GITHUB_PRIVATE_KEY ?? "",
      "base64"
    ).toString("utf-8");

    const auth = createAppAuth({
      appId: process.env.GITHUB_APP_ID,
      privateKey,
      installationId: process.env.GITHUB_INSTALLATION_ID,
    });

    const { token } = await auth({ type: "installation" });
    const octokit = new Octokit({ auth: token });

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const path = process.env.CONTENT_FILE_PATH ?? "public/content/site.json";

    // Get current file SHA (needed for updates)
    let sha;
    try {
      const { data } = await octokit.repos.getContent({ owner, repo, path });
      sha = Array.isArray(data) ? undefined : data.sha;
    } catch {
      // File doesn't exist yet — will be created
    }

    const newContent = Buffer.from(
      JSON.stringify(content, null, 2),
      "utf-8"
    ).toString("base64");

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "chore: update site content via admin",
      content: newContent,
      sha,
    });

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("admin-save error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to save. Check Netlify function logs." }),
    };
  }
};
