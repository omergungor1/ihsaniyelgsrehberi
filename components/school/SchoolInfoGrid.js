export default function SchoolInfoGrid({ info }) {
  const pairs = [];
  const addressItem = info.find((i) => i.label === "Adres");
  const otherItems = info.filter((i) => i.label !== "Adres");

  for (let i = 0; i < otherItems.length; i += 2) {
    pairs.push(otherItems.slice(i, i + 2));
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
      {pairs.map((pair, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid grid-cols-1 sm:grid-cols-2 ${rowIndex > 0 ? "border-t border-gray-100" : ""}`}
        >
          {pair.map((item, colIndex) => (
            <div
              key={item.label}
              className={`flex items-center justify-between gap-3 px-5 py-3.5 ${
                rowIndex % 2 === 0 ? "bg-[#f7f9f8]" : "bg-white"
              } ${colIndex === 1 ? "sm:border-l sm:border-gray-100" : ""}`}
            >
              <span className="text-xs text-gray-500">{item.label}</span>
              <span className="text-right text-sm font-bold text-[#1b6e3f]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      ))}

      {addressItem && (
        <div className="flex items-start justify-between gap-4 border-t border-gray-100 bg-[#f7f9f8] px-5 py-3.5">
          <span className="text-xs text-gray-500">{addressItem.label}</span>
          <span className="max-w-[75%] text-right text-sm font-bold text-[#1b6e3f]">
            {addressItem.value}
          </span>
        </div>
      )}
    </div>
  );
}
