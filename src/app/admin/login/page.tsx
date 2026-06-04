"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        password: fd.get("password"),
        admin: true,
      }),
    });
    if (!res.ok) {
      setError("Invalid admin credentials");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <h1 className="text-2xl font-bold text-white">Admin Login</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        <button type="submit" className="w-full rounded-lg bg-cyan-600 py-2 text-white">Login</button>
      </form>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
