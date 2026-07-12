export default function SchoolTransport({ transport }) {
  if (!transport) return null;

  const pills = [
    transport.bus
      ? { icon: "🚌", text: transport.bus }
      : transport.duration != null
        ? {
            icon: "🚌",
            text: `${transport.duration} dk.${
              transport.frequency != null
                ? ` · her ${transport.frequency} dakikada bir`
                : ""
            }`,
          }
        : null,
    transport.walk ? { icon: "🚶", text: transport.walk } : null,
    transport.tram ? { icon: "🚊", text: transport.tram } : null,
    transport.car ? { icon: "🚗", text: transport.car } : null,
  ].filter(Boolean);

  if (!pills.length && !transport.description) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#042352]">
        <span>🚌</span> Ulaşım
      </h2>

      {pills.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {pills.map((pill) => (
            <div
              key={pill.text}
              className="inline-flex items-center gap-2 rounded-xl border border-[#D6DFEC] bg-[#e8eef8] px-3 py-2"
            >
              <span className="text-sm">{pill.icon}</span>
              <span className="text-xs font-semibold text-[#042352]">
                {pill.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {transport.description ? (
        <p className="text-sm leading-relaxed text-gray-600">
          {transport.description}
        </p>
      ) : null}
    </div>
  );
}
