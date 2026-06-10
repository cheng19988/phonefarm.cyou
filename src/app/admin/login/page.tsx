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
      <h1 className="page-title">Admin Login</h1>
      <form onSubmit={onSubmit} className="card-premium mt-8 space-y-4 p-6">
        <label className="form-field">
          <span className="form-label">Email</span>
          <input name="email" type="email" required placeholder="Email" className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">Password</span>
          <input name="password" type="password" required placeholder="Password" className="form-input" />
        </label>
        <button type="submit" className="btn-primary w-full">
          Login
        </button>
      </form>
      {error && <p className="form-error mt-2">{error}</p>}
    </div>
  );
}
