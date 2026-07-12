"use client";

import { useState } from "react";

export default function ChipInput({ name, label, initialValues = [] }) {
  const [values, setValues] = useState(initialValues || []);
  const [draft, setDraft] = useState("");

  function addChip() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) {
      setDraft("");
      return;
    }
    setValues([...values, trimmed]);
    setDraft("");
  }

  function removeChip(chip) {
    setValues(values.filter((v) => v !== chip));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip();
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
        {label}
      </label>
      <input type="hidden" name={name} value={JSON.stringify(values)} readOnly />

      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#D6DFEC] p-2">
        {values.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#e8eef8] px-3 py-1 text-[12px] font-semibold text-[#042352]"
          >
            {chip}
            <button
              type="button"
              onClick={() => removeChip(chip)}
              className="text-[#727F94] hover:text-red-600"
              aria-label={`${chip} kaldır`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addChip}
          placeholder="Yazıp Enter'a basın"
          className="min-w-[120px] flex-1 border-none px-1 py-1 text-[13px] outline-none"
        />
      </div>
    </div>
  );
}
