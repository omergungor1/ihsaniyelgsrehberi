export default function SchoolAchievements({ achievements }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#042352]">
        <span>🏆</span> Okul Başarıları
      </h2>

      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-start gap-3 rounded-xl bg-[#e8eef8] px-4 py-3"
          >
            <span className="mt-0.5 flex-shrink-0 text-lg">
              {achievement.icon || "🏆"}
            </span>
            <p className="flex-1 text-sm leading-relaxed text-gray-600">
              {achievement.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
