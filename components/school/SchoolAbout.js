export default function SchoolAbout({ description }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-[#1b6e3f]">
        <span>🏫</span> Okul ile Alakalı Diğer Bilgiler
      </h2>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}
