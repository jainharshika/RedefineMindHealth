import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const DEV_PASSWORD = "rmh@admin2024";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // In local dev the Netlify function isn't running — check password client-side.
    if (import.meta.env.DEV) {
      await new Promise((r) => setTimeout(r, 400)); // feel natural
      if (password === DEV_PASSWORD) {
        sessionStorage.setItem("rmh_admin_token", password);
        onSuccess();
      } else {
        setError("Incorrect password. Try again.");
      }
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/.netlify/functions/admin-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "auth", password }),
      });
      if (res.ok) {
        sessionStorage.setItem("rmh_admin_token", password);
        onSuccess();
      } else {
        setError("Incorrect password. Try again.");
      }
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-gutter">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 max-w-md w-full shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
      >
        <div className="text-center mb-8">
          <div className="font-headline-md text-headline-md text-on-background tracking-tight mb-2">
            RedefineMindHealth
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-label-sm text-label-sm text-on-background mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface border border-outline-variant rounded-DEFAULT px-4 py-3 pr-12 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {error && (
            <p className="font-body-md text-body-md text-error text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-container text-on-primary-container font-label-sm text-label-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
