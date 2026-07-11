export default function SchoolTransport({ transport }) {
  const pills = [
    { icon: "🚌", text: transport.bus || `${transport.duration} dk. · her ${transport.frequency} dakikada bir` },
    { icon: "🚶", text: transport.walk || "—" },
    { icon: "🚊", text: transport.tram || "—" },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1b6e3f]">
        <span>🚌</span> Ulaşım
      </h2>

      <div className="mb-4 flex flex-wrap gap-2">
        {pills.map((pill) => (
          <div
            key={pill.text}
            className="inline-flex items-center gap-2 rounded-xl border border-[#cfe8da] bg-[#f3faf6] px-3 py-2"
          >
            <span className="text-sm">{pill.icon}</span>
            <span className="text-xs font-semibold text-[#1b6e3f]">{pill.text}</span>
          </div>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-gray-600">{transport.description}</p>
    </div>
  );
}
