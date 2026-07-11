"use client";

export default function SchoolContactBar({ whatsappNumber, phoneNumber }) {
  return (
    <div className="absolute right-0 bottom-0 left-0 flex gap-3 border-t border-gray-200 bg-white px-5 py-4 shadow-[var(--shadow-contact-bar)]">
      <button
        type="button"
        onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f59e0b] py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d97706]"
      >
        <span>💬</span>
        WhatsApp&apos;tan Sor
      </button>

      <button
        type="button"
        onClick={() => { window.location.href = `tel:${phoneNumber}`; }}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-800 transition-colors hover:border-gray-300 hover:bg-gray-50"
      >
        <span>📞</span>
        Hemen Ara
      </button>
    </div>
  );
}
