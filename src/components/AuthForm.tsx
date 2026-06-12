"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { safeInternalPath } from "@/lib/safe-redirect";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const search = useSearchParams();
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const body = {
      email: fd.get("email"),
      password: fd.get("password"),
      name: fd.get("name"),
    };
    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "Failed");
      return;
    }
    router.push(safeInternalPath(search.get("redirect"), "/account/orders"));
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card-premium mx-auto max-w-md space-y-4 p-6">
      {mode === "register" && (
        <label className="form-field">
          <span className="form-label">Name</span>
          <input name="name" className="form-input" />
        </label>
      )}
      <label className="form-field">
        <span className="form-label">Email</span>
        <input name="email" type="email" required className="form-input" autoComplete="email" />
      </label>
      <label className="form-field">
        <span className="form-label">Password</span>
        <input name="password" type="password" required minLength={8} className="form-input" autoComplete="current-password" />
      </label>
      <button type="submit" className="btn-primary w-full py-3">
        {mode === "login" ? "Login" : "Create Account"}
      </button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
