"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
    router.push(search.get("redirect") || "/account/orders");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4">
      {mode === "register" && (
        <label className="block text-sm">
          <span className="text-slate-300">Name</span>
          <input name="name" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
      )}
      <label className="block text-sm">
        <span className="text-slate-300">Email</span>
        <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
      </label>
      <label className="block text-sm">
        <span className="text-slate-300">Password</span>
        <input name="password" type="password" required minLength={8} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
      </label>
      <button type="submit" className="w-full rounded-lg bg-cyan-600 py-3 text-white hover:bg-cyan-500">
        {mode === "login" ? "Login" : "Create Account"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}
