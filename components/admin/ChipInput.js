"use client";

import { useState } from "react";

function normalizeChips(initialValues, format) {
  const list = Array.isArray(initialValues) ? initialValues : [];
  return list
    .map((item, index) => {
      if (item == null) return null;
      if (typeof item === "string") {
        const label = item.trim();
        if (!label) return null;
        return { id: `s-${index}-${label}`, label, tone: "green", icon: "" };
      }
      if (typeof item === "object") {
        const label = String(item.label || item.text || "").trim();
        if (!label) return null;
        return {
          id: String(item.id || `o-${index}-${label}`),
          label,
          tone: item.tone || "green",
          icon: item.icon || "",
        };
      }
      return null;
    })
    .filter(Boolean);
}

function toPayload(values, format) {
  if (format === "tags") {
    return values.map((v) => ({
      label: v.label,
      tone: v.tone || "green",
    }));
  }
  if (format === "badges") {
    return values.map((v) => ({
      label: v.label,
      ...(v.icon ? { icon: v.icon } : {}),
    }));
  }
  return values.map((v) => v.label);
}

export default function ChipInput({
  name,
  label,
  initialValues = [],
  format = "string",
}) {
  const [values, setValues] = useState(() =>
    normalizeChips(initialValues, format)
  );
  const [draft, setDraft] = useState("");

  function addChip() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (values.some((v) => v.label.toLocaleLowerCase("tr") === trimmed.toLocaleLowerCase("tr"))) {
      setDraft("");
      return;
    }
    setValues([
      ...values,
      {
        id: `new-${Date.now()}-${trimmed}`,
        label: trimmed,
        tone: "green",
        icon: "",
      },
    ]);
    setDraft("");
  }

  function removeChip(id) {
    setValues(values.filter((v) => v.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip();
    }
  }

  const payload = toPayload(values, format);

  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
        {label}
      </label>
      <input type="hidden" name={name} value={JSON.stringify(payload)} readOnly />

      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#D6DFEC] p-2">
        {values.map((chip) => (
          <span
            key={chip.id}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#e8eef8] px-3 py-1 text-[12px] font-semibold text-[#042352]"
          >
            {chip.icon ? <span>{chip.icon}</span> : null}
            {chip.label}
            <button
              type="button"
              onClick={() => removeChip(chip.id)}
              className="text-[#727F94] hover:text-red-600"
              aria-label={`${chip.label} kaldır`}
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
