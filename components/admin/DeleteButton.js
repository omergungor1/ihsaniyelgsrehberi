"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
  action,
  confirmText = "Bu kaydı silmek istediğinize emin misiniz?",
  className = "",
  children = "Sil",
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!window.confirm(confirmText)) return;
    startTransition(async () => {
      try {
        await action(id);
        router.refresh();
      } catch (err) {
        alert(err?.message || "Silme işlemi başarısız oldu.");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={
        className ||
        "rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[13px] font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
      }
    >
      {isPending ? "Siliniyor..." : children}
    </button>
  );
}
