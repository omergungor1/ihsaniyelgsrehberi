"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError("E-posta veya şifre hatalı.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#042352] px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#042352] text-lg font-bold text-white">
            İ
          </span>
          <h1 className="text-[19px] font-bold text-[#042352]">İhsaniye Admin Panel</h1>
          <p className="mt-1 text-[13px] text-[#727F94]">
            Yönetim paneline giriş yapın
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              E-posta
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#D6DFEC] px-3.5 py-2.5 text-[14px] text-[#042352] outline-none focus:border-[#2B6FD6] focus:ring-2 focus:ring-[#2B6FD6]/20"
              placeholder="ornek@ihsaniyeyurdu.com"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Şifre
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#D6DFEC] px-3.5 py-2.5 text-[14px] text-[#042352] outline-none focus:border-[#2B6FD6] focus:ring-2 focus:ring-[#2B6FD6]/20"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-[13px] font-medium text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#042352] px-4 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#124DA6] disabled:opacity-60"
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
