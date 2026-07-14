export default function SectionHeading({
  index,
  label,
  title,
  sub,
}: {
  index: string;
  label: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {index} — {label}
      </p>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-sm text-mute sm:text-base">{sub}</p>}
    </div>
  );
}
