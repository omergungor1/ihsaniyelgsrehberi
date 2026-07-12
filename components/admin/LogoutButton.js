"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton({ className = "" }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className={
        className ||
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
      }
    >
      <span className="text-base">🚪</span>
      {isLoading ? "Çıkış yapılıyor..." : "Çıkış"}
    </button>
  );
}
