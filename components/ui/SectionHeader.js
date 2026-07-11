export default function SectionHeader({
  tag,
  title,
  highlight,
  description,
  dark = false,
}) {
  return (
    <div className="section-header">
      {tag && (
        <span
          className={`section-tag ${dark
              ? "border border-primary-700 bg-primary-900/50 text-primary-300"
              : ""
            }`}
        >
          {tag}
        </span>
      )}
      <h2
        className={`font-heading mb-4 text-3xl font-bold md:text-4xl ${dark ? "text-white" : "text-gray-900"
          }`}
      >
        {title}
        {highlight && (
          <span
            className={`block ${dark ? "text-primary-300" : "text-primary-600"}`}
          >
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p
          className={`mx-auto max-w-2xl text-base leading-relaxed ${dark ? "text-white/60" : "text-gray-500"
            }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
