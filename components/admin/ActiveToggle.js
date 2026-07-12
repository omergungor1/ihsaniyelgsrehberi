"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ActiveToggle({ id, initialActive, action }) {
  const [active, setActive] = useState(Boolean(initialActive));
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleChange(e) {
    const next = e.target.checked;
    setActive(next);
    startTransition(async () => {
      try {
        await action(id, next);
        router.refresh();
      } catch (err) {
        setActive(!next);
        alert(err?.message || "İşlem başarısız oldu.");
      }
    });
  }

  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <span
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
          active ? "bg-[#2B6FD6]" : "bg-[#D6DFEC]"
        } ${isPending ? "opacity-60" : ""}`}
      >
        <input
          type="checkbox"
          checked={active}
          disabled={isPending}
          onChange={handleChange}
          className="peer absolute h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`inline-block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform ${
            active ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
      <span className="text-[13px] font-semibold text-[#465367]">
        {active ? "Aktif" : "Pasif"}
      </span>
    </label>
  );
}
