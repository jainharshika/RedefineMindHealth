import { useState } from "react";
import type { SiteContent } from "../../content/types";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

/**
 * Sends the full updated content object to the Netlify Function which
 * verifies the password (held in a Netlify env var) and commits the
 * JSON to GitHub via a GitHub App (no token expiry).
 */
export function useSave() {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function save(content: SiteContent) {
    setStatus("saving");
    setErrorMsg("");
    const password = sessionStorage.getItem("rmh_admin_token") ?? "";
    try {
      const res = await fetch("/.netlify/functions/admin-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", password, content }),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg((body as { error?: string }).error ?? "Save failed.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Check your connection.");
      setStatus("error");
    }
  }

  return { save, status, errorMsg };
}
