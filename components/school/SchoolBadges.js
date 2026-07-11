export default function SchoolBadges({ badges }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-sm"
        >
          {badge.icon && <span>{badge.icon}</span>}
          {badge.label}
        </span>
      ))}
    </div>
  );
}
