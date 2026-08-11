"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm rounded-xl border border-line bg-paper-raised p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-maroon">CAI Admin</p>
        <h1 className="mt-1 font-serif text-2xl font-semibold text-ink">Sign in</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-semibold text-ink-soft">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="min-h-[44px] w-full rounded-lg border border-line bg-paper px-3 py-2 text-ink"
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-semibold text-ink-soft">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-[44px] w-full rounded-lg border border-line bg-paper px-3 py-2 text-ink"
            />
          </div>
          {error && <p className="text-sm font-semibold text-maroon">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="min-h-[44px] w-full rounded-lg bg-lawn px-4 py-2.5 font-semibold text-paper-raised hover:bg-lawn-deep disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
