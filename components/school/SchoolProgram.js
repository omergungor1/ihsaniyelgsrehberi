export default function SchoolProgram({ program }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-[#1b6e3f]">
        <span>🌍</span> {program.title || "Program Bilgisi"}
      </h2>

      <div className="rounded-r-xl border-l-4 border-[#2d8e6c] bg-[#f3faf6] py-3 pl-4">
        <p className="text-sm leading-relaxed text-gray-600">{program.description}</p>
      </div>
    </div>
  );
}
