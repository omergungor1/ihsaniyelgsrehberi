export default function SchoolHeader({ school }) {
  return (
    <div>
      <h1 className="pr-12 text-2xl leading-tight font-bold text-white lg:text-[26px]">
        {school.name}
      </h1>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/85">
        <span>📍</span>
        <span>
          {school.district} / {school.city} · {school.type} Lisesi
        </span>
      </p>
    </div>
  );
}
